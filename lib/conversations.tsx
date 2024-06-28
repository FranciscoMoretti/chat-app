"use client";
import { Conversation } from "@/data/history";

export function sortConversationsByLastMessageDate(
  conversations: Conversation[]
): Conversation[] {
  const clone = conversations.slice();
  return clone.sort((a, b) => {
    const lastTimestampA = getConversationLastTimestamp(a);
    const lastTimestampB = getConversationLastTimestamp(b);
    // Handle the case where both conversations have no messages
    if (!lastTimestampA && !lastTimestampB) {
      return 0;
    }
    // Handle the case where only one conversation has no messages
    if (!lastTimestampA) {
      return 1;
    }
    if (!lastTimestampB) {
      return -1;
    }
    return lastTimestampB?.getTime() - lastTimestampA?.getTime();
  });
}
export function getConversationLastTimestamp(
  conversation: Conversation
): Date | undefined {
  return conversation.chat?.findLast((item) => item.message)?.timestamp;
}
