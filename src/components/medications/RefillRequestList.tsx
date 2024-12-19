import React from 'react';
import { Calendar, Clock, User, Check, X } from 'lucide-react';
import type { RefillRequest } from '../../hooks/useRefillRequests';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/date';

interface RefillRequestListProps {
  requests: RefillRequest[];
  onApprove: (requestId: string) => void;
  onDeny: (requestId: string) => void;
}

export function RefillRequestList({ requests, onApprove, onDeny }: RefillRequestListProps) {
  const pendingRequests = requests.filter(request => request.status === 'pending');

  if (pendingRequests.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No pending requests</h3>
        <p className="text-gray-500">All refill requests have been processed</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pendingRequests.map(request => (
        <div key={request.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Patient ID: {request.patientId}</p>
                  <p className="text-sm text-gray-500">Medication ID: {request.medicationId}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Requested: {formatDate(request.requestDate)}</p>
                  <p className="text-sm text-gray-500">
                    Preferred delivery: {formatDate(request.preferredDate)}
                  </p>
                </div>
              </div>

              {request.notes && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">{request.notes}</p>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => onApprove(request.id)}
                variant="primary"
                icon={<Check className="h-4 w-4" />}
              >
                Approve
              </Button>
              <Button
                onClick={() => onDeny(request.id)}
                variant="danger"
                icon={<X className="h-4 w-4" />}
              >
                Deny
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}