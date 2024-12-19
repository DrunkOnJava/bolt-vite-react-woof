import React from 'react';
import { Pill, RefreshCw, AlertCircle } from 'lucide-react';
import type { Prescription } from '../../types';

interface PrescriptionListProps {
  prescriptions: Prescription[];
  onRequestRefill: (prescription: Prescription) => void;
}

export default function PrescriptionList({
  prescriptions,
  onRequestRefill,
}: PrescriptionListProps) {
  return (
    <div className="space-y-4">
      {prescriptions.map((prescription) => (
        <div
          key={prescription.id}
          className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
        >
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-lg ${
              prescription.status === 'active' ? 'bg-green-50' : 
              prescription.status === 'pending' ? 'bg-yellow-50' : 'bg-red-50'
            }`}>
              <Pill className={`h-6 w-6 ${
                prescription.status === 'active' ? 'text-green-500' :
                prescription.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
              }`} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{prescription.name}</h3>
              <p className="text-sm text-gray-500">{prescription.dosage}</p>
              <p className="text-sm text-gray-500">{prescription.frequency}</p>
              <div className="mt-1 flex items-center space-x-2">
                <span className="text-xs text-gray-400">
                  Last filled: {new Date(prescription.lastFilled).toLocaleDateString()}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">
                  Refills remaining: {prescription.refillsRemaining}
                </span>
              </div>
            </div>
          </div>
          {prescription.status === 'active' && prescription.refillsRemaining > 0 && (
            <button
              onClick={() => onRequestRefill(prescription)}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Request Refill</span>
            </button>
          )}
          {prescription.status === 'pending' && (
            <div className="flex items-center space-x-2 text-yellow-600">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">Refill Pending</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}