"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Subscribe to real-time order status changes for the current user.
 * Calls `onUpdate` when any order belonging to the user changes.
 */
export function useRealtimeOrders(
  userId: string | undefined,
  onUpdate: (payload: {
    eventType: string;
    orderId: string;
    newStatus: string;
    oldRecord: Record<string, unknown> | null;
    newRecord: Record<string, unknown>;
  }) => void,
) {
  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();

    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newRecord = payload.new as Record<string, unknown>;
          const oldRecord = (payload.old as Record<string, unknown>) || null;
          onUpdate({
            eventType: payload.eventType,
            orderId: (newRecord.id as string) || "",
            newStatus: (newRecord.status as string) || "",
            oldRecord,
            newRecord,
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onUpdate]);
}
