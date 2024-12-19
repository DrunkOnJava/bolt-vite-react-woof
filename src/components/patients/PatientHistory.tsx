import React from 'react';
import { FileText, Calendar, Pill, Activity } from 'lucide-react';
import { formatDate } from '../../utils/date';

interface HistoryEntry {
  id: string;
  date: string;
  type: 'visit' | 'note' | 'prescription' | 'test';
  description: string;
  provider: string;
}

interface PatientHistoryProps {
  history: HistoryEntry[];
}

const typeIcons = {
  visit: Calendar,
  note: FileText,
  prescription: Pill,
  test: Activity,
};

const typeColors = {
  visit: 'text-blue-500 bg-blue-50',
  note: 'text-gray-500 bg-gray-50',
  prescription: 'text-purple-500 bg-purple-50',
  test: 'text-green-500 bg-green-50',
};

export function PatientHistory({ history }: PatientHistoryProps) {
  return (
    <div className="space-y-4">
      {history.map((entry) => {
        const Icon = typeIcons[entry.type];
        const colorClass = typeColors[entry.type];

        return (
          <div key={entry.id} className="flex items-start space-x-4">
            <div className={`p-2 rounded-lg ${colorClass}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">{entry.description}</p>
                <span className="text-sm text-gray-500">
                  {formatDate(entry.date)}
                </span>
              </div>
              <p className="text-sm text-gray-500">Provider: {entry.provider}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}