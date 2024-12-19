import React, { useState } from 'react';
import { Upload, Download } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useReceipts } from '../../hooks/useReceipts';
import { Button } from '../../components/ui/Button';
import { ReceiptList } from '../../components/receipts/ReceiptList';
import { ReceiptFilters } from '../../components/receipts/ReceiptFilters';
import { UploadReceiptModal } from '../../components/receipts/UploadReceiptModal';
import type { Receipt, ReceiptFilters as FilterType } from '../../types/receipt';

export default function ReceiptsPage() {
  const { currentUser } = useUser();
  const { receipts, uploadReceipt, filterReceipts } = useReceipts(currentUser.patientId!);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filters, setFilters] = useState<FilterType>({});

  const handleDownload = (receipt: Receipt) => {
    // In a real app, this would generate and download a PDF
    const content = `Receipt for ${receipt.description}\nAmount: $${receipt.amount}\nDate: ${receipt.transactionDate}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receipt.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredReceipts = filterReceipts(filters);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Receipts</h1>
        <Button
          onClick={() => setShowUploadModal(true)}
          icon={<Upload className="h-5 w-5" />}
        >
          Upload Receipt
        </Button>
      </div>

      <ReceiptFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={() => setFilters({})}
      />

      <ReceiptList
        receipts={filteredReceipts}
        onDownload={handleDownload}
      />

      {showUploadModal && (
        <UploadReceiptModal
          onClose={() => setShowUploadModal(false)}
          onUpload={uploadReceipt}
        />
      )}
    </div>
  );
}