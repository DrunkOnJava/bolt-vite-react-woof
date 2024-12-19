import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';

interface MedicalRecord {
  id: string;
  type: string;
  date: string;
  provider: string;
  description: string;
}

interface RecordsListProps {
  records: MedicalRecord[];
  onViewRecord: (record: MedicalRecord) => void;
  onDownloadRecord: (record: MedicalRecord) => void;
}

export default function RecordsList({
  records,
  onViewRecord,
  onDownloadRecord,
}: RecordsListProps) {
  return (
    <div className="space-y-4">
      {records.map((record) => (
        <div
          key={record.id}
          className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
        >
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{record.type}</h3>
              <p className="text-sm text-gray-500">{record.provider}</p>
              <p className="text-sm text-gray-400">{new Date(record.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onViewRecord(record)}
              className="p-2 text-gray-400 hover:text-blue-500"
              title="View Record"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDownloadRecord(record)}
              className="p-2 text-gray-400 hover:text-blue-500"
              title="Download Record"
            >
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}