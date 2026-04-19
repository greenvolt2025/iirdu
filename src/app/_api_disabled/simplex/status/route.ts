import { NextResponse } from "next/server";
import { getSimplexBridge } from "@/services/simplex-bridge";

export async function GET() {
  try {
    const bridge = getSimplexBridge();

    // Try connecting if not already connected
    let connected = bridge.isConnected();
    if (!connected) {
      try {
        await bridge.connect();
        connected = bridge.isConnected();
      } catch {
        connected = false;
      }
    }

    // Try to get address if connected
    let address: string | null = null;
    if (connected) {
      try {
        address = await bridge.createAddress();
      } catch {
        // Address creation may fail if already exists — OK
      }
    }

    return NextResponse.json({
      connected,
      address,
      wsUrl: process.env.SIMPLEX_WS_URL || "ws://localhost:5225",
    });
  } catch (error) {
    console.error("[SimpleX Status] Error:", error);
    return NextResponse.json({
      connected: false,
      address: null,
      wsUrl: process.env.SIMPLEX_WS_URL || "ws://localhost:5225",
    });
  }
}
