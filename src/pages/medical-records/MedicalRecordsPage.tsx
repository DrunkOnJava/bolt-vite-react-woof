import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import RecordsList from '../../components/medical-records/RecordsList';

const mockRecords = [
  {
    id: '1',
    type: 'Lab Results',
    date: '2024-03-01',
    provider: 'Dr. Sarah Wilson',
    description: 'Annual blood work results',
  },
  {
    id: '2',
    type: 'Imaging',
    date: '2024-02-15',
    provider: 'City Hospital Radiology',
    description: 'Chest X-ray',
  },
  // Add more mock records as needed
];

export default function MedicalRecordsPage() {
  const [records] = useState(mockRecords);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-white rounded-md border hover:bg-gray-50">
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <RecordsList
          records={records}
          onViewRecord={(record) => console.log('Viewing record:', record)}
          onDownloadRecord={(record) => console.log('Downloading record:', record)}
        />
      </div>
    </div>
  );
}