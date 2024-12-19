import type { Message } from '../types';

export function sortMessagesByDate(messages: Message[]): Message[] {
  return [...messages].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function getUnreadCount(messages: Message[]): number {
  return messages.filter(message => !message.read).length;
}

export function markMessageAsRead(messages: Message[], messageId: string): Message[] {
  return messages.map(message =>
    message.id === messageId ? { ...message, read: true } : message
  );
}