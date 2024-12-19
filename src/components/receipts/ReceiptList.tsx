import React from 'react';
import { Receipt, FileText, Download } from 'lucide-react';
import type { Receipt as ReceiptType } from '../../types/receipt';
import { formatDate, formatCurrency } from '../../utils/format';

interface ReceiptListProps {
  receipts: ReceiptType[];
  onDownload: (receipt: ReceiptType) => void;
}

export function ReceiptList({ receipts, onDownload }: ReceiptListProps) {
  return (
    <div className="space-y-4">
      {receipts.map(receipt => (
        <div
          key={receipt.id}
          className="bg-white rounded-lg shadow-sm p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${
                receipt.type === 'auto-generated' ? 'bg-blue-50' : 'bg-green-50'
              }`}>
                {receipt.type === 'auto-generated' ? (
                  <Receipt className="h-5 w-5 text-blue-500" />
                ) : (
                  <FileText className="h-5 w-5 text-green-500" />
                )}
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{receipt.description}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    receipt.type === 'auto-generated' 
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {receipt.type}
                  </span>
                </div>
                
                <div className="mt-1 text-sm text-gray-500">
                  <p>Transaction Date: {formatDate(receipt.transactionDate)}</p>
                  <p>Payment Method: {receipt.paymentMethod}</p>
                  <p>Next Refill Due: {formatDate(receipt.medication.nextRefillDate)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium text-gray-900">
                {formatCurrency(receipt.amount)}
              </span>
              <button
                onClick={() => onDownload(receipt)}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Download Receipt"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {receipts.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No receipts found</p>
        </div>
      )}
    </div>
  );
}