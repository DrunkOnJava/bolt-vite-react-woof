import { useState, useCallback } from 'react';
import type { Message } from '../types';
import { useNotifications } from '../context/NotificationContext';
import { sortMessagesByDate, markMessageAsRead } from '../utils/messages';

export function useMessages(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { addNotification } = useNotifications();

  const handleMessageSelect = useCallback((message: Message) => {
    if (!message.read) {
      setMessages(prev => markMessageAsRead(prev, message.id));
    }
    setSelectedMessage(message);
  }, []);

  const handleMessageSend = useCallback((newMessage: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const message: Message = {
      ...newMessage,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    setMessages(prev => sortMessagesByDate([...prev, message]));
    addNotification('success', 'Message sent successfully');
  }, [addNotification]);

  const handleMessageDelete = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
    addNotification('success', 'Message deleted successfully');
  }, [selectedMessage, addNotification]);

  return {
    messages,
    selectedMessage,
    handleMessageSelect,
    handleMessageSend,
    handleMessageDelete,
  };
}