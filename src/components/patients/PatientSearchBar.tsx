import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Input';

interface PatientSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function PatientSearchBar({ value, onChange }: PatientSearchBarProps) {
  return (
    <div className="relative">
      <Input
        placeholder="Search patients by name or notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        icon={<Search className="h-5 w-5 text-gray-400" />}
        className="pl-10"
      />
    </div>
  );
}