import { useState, useCallback } from 'react';
import { useNotifications } from '../context/NotificationContext';

export interface RefillRequest {
  id: string;
  medicationId: string;
  patientId: string;
  requestDate: string;
  preferredDate: string;
  status: 'pending' | 'approved' | 'denied';
  notes?: string;
}

export function useRefillRequests() {
  const [requests, setRequests] = useState<RefillRequest[]>([]);
  const { addNotification } = useNotifications();

  const createRequest = useCallback((data: Omit<RefillRequest, 'id' | 'requestDate' | 'status'>) => {
    const newRequest: RefillRequest = {
      ...data,
      id: `request-${Date.now()}`,
      requestDate: new Date().toISOString(),
      status: 'pending',
    };

    setRequests(prev => [...prev, newRequest]);
    addNotification('success', 'Refill request submitted successfully');
    return newRequest;
  }, [addNotification]);

  const updateRequestStatus = useCallback((requestId: string, status: RefillRequest['status']) => {
    setRequests(prev => prev.map(request =>
      request.id === requestId ? { ...request, status } : request
    ));
    
    const action = status === 'approved' ? 'approved' : 'denied';
    addNotification('success', `Refill request ${action} successfully`);
  }, [addNotification]);

  const getPendingRequestsCount = useCallback(() => {
    return requests.filter(request => request.status === 'pending').length;
  }, [requests]);

  return {
    requests,
    createRequest,
    updateRequestStatus,
    getPendingRequestsCount,
  };
}