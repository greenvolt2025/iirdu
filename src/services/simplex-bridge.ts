/**
 * SimpleX Bridge — server-side service for sending files via SimpleX protocol.
 *
 * Architecture:
 *   Web upload → API route → SimplexBridge → simplex-chat CLI (WebSocket) → XFTP relay → Mac receiver
 *
 * Prerequisites:
 *   1. simplex-chat CLI installed: curl -o- https://raw.githubusercontent.com/simplex-chat/simplex-chat/stable/install.sh | bash
 *   2. Running as WebSocket server: simplex-chat -p 5225 -d ~/.simplex/iirdu_bot
 *   3. User profile created (run interactively first time)
 *   4. Contact established with the receiver (one-time setup)
 */

import WebSocket from "ws";

interface SimplexConfig {
  wsUrl: string;
  receiverContact: string;
  autoAcceptFiles: boolean;
}

interface SimplexResponse {
  corrId: string;
  resp: {
    type: string;
    [key: string]: unknown;
  };
}

const DEFAULT_CONFIG: SimplexConfig = {
  wsUrl: process.env.SIMPLEX_WS_URL || "ws://localhost:5225",
  receiverContact: process.env.SIMPLEX_RECEIVER_CONTACT || "iirdu-receiver",
  autoAcceptFiles: true,
};

class SimplexBridge {
  private ws: WebSocket | null = null;
  private config: SimplexConfig;
  private pendingRequests = new Map<string, {
    resolve: (value: SimplexResponse) => void;
    reject: (reason: Error) => void;
  }>();
  private connected = false;

  constructor(config: Partial<SimplexConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  private generateId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  async connect(): Promise<void> {
    if (this.connected && this.ws?.readyState === WebSocket.OPEN) return;

    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.config.wsUrl);

      this.ws.on("open", () => {
        this.connected = true;
        console.log("[SimpleX Bridge] Connected to simplex-chat");
        resolve();
      });

      this.ws.on("message", (data: Buffer) => {
        try {
          const response: SimplexResponse = JSON.parse(data.toString());

          // Handle correlation-based responses
          if (response.corrId && this.pendingRequests.has(response.corrId)) {
            const pending = this.pendingRequests.get(response.corrId)!;
            this.pendingRequests.delete(response.corrId);
            pending.resolve(response);
          }

          // Handle async events (file completion, etc.)
          this.handleEvent(response);
        } catch (err) {
          console.error("[SimpleX Bridge] Parse error:", err);
        }
      });

      this.ws.on("close", () => {
        this.connected = false;
        console.log("[SimpleX Bridge] Disconnected");
      });

      this.ws.on("error", (err) => {
        this.connected = false;
        reject(err);
      });
    });
  }

  private handleEvent(response: SimplexResponse) {
    switch (response.resp?.type) {
      case "rcvFileComplete":
        console.log("[SimpleX Bridge] File transfer complete");
        break;
      case "sndFileComplete":
        console.log("[SimpleX Bridge] File sent successfully");
        break;
      case "chatCmdError":
        console.error("[SimpleX Bridge] Command error:", response.resp);
        break;
    }
  }

  private async sendCommand(cmd: string, timeout = 30000): Promise<SimplexResponse> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      await this.connect();
    }

    const corrId = this.generateId();

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pendingRequests.delete(corrId);
        reject(new Error(`SimpleX command timed out: ${cmd}`));
      }, timeout);

      this.pendingRequests.set(corrId, {
        resolve: (resp) => {
          clearTimeout(timer);
          resolve(resp);
        },
        reject: (err) => {
          clearTimeout(timer);
          reject(err);
        },
      });

      this.ws!.send(JSON.stringify({ corrId, cmd }));
    });
  }

  /**
   * Send a file to the configured receiver via SimpleX XFTP protocol.
   * The file must be saved to disk first (SimpleX sends from file path).
   */
  async sendFile(filePath: string, contact?: string): Promise<SimplexResponse> {
    const targetContact = contact || this.config.receiverContact;
    return this.sendCommand(`/f @${targetContact} ${filePath}`);
  }

  /**
   * Send a text notification to the receiver.
   */
  async sendNotification(message: string, contact?: string): Promise<SimplexResponse> {
    const targetContact = contact || this.config.receiverContact;
    return this.sendCommand(`@${targetContact} ${message}`);
  }

  /**
   * Create a new contact address (one-time setup).
   */
  async createAddress(): Promise<string> {
    const resp = await this.sendCommand("/ad");
    return JSON.stringify(resp.resp);
  }

  /**
   * Get connection status.
   */
  isConnected(): boolean {
    return this.connected && this.ws?.readyState === WebSocket.OPEN;
  }

  async disconnect(): Promise<void> {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.connected = false;
    }
  }
}

// Singleton instance
let bridge: SimplexBridge | null = null;

export function getSimplexBridge(): SimplexBridge {
  if (!bridge) {
    bridge = new SimplexBridge();
  }
  return bridge;
}

export { SimplexBridge, type SimplexConfig, type SimplexResponse };
