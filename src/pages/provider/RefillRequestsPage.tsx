import React from 'react';
import { RefillRequestList } from '../../components/medications/RefillRequestList';
import { useRefillRequests } from '../../hooks/useRefillRequests';

export default function RefillRequestsPage() {
  const { requests, updateRequestStatus } = useRefillRequests();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Refill Requests</h1>
      <RefillRequestList
        requests={requests}
        onApprove={(id) => updateRequestStatus(id, 'approved')}
        onDeny={(id) => updateRequestStatus(id, 'denied')}
      />
    </div>
  );
}