import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import type { ReceiptFilters as FilterType } from '../../types/receipt';

interface ReceiptFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
  onReset: () => void;
}

export function ReceiptFilters({ filters, onFilterChange, onReset }: ReceiptFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <h3 className="font-medium text-gray-900">Filters</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          icon={<X className="h-4 w-4" />}
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={filters.dateRange?.start || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                dateRange: {
                  ...filters.dateRange,
                  start: e.target.value,
                },
              })}
            />
            <Input
              type="date"
              value={filters.dateRange?.end || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                dateRange: {
                  ...filters.dateRange,
                  end: e.target.value,
                },
              })}
            />
          </div>
        </div>

        <Select
          label="Payment Method"
          value={filters.paymentMethod || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            paymentMethod: e.target.value,
          })}
          options={[
            { value: '', label: 'All Methods' },
            { value: 'credit', label: 'Credit Card' },
            { value: 'debit', label: 'Debit Card' },
            { value: 'cash', label: 'Cash' },
            { value: 'insurance', label: 'Insurance' },
          ]}
        />

        <Select
          label="Receipt Type"
          value={filters.type || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            type: e.target.value,
          })}
          options={[
            { value: '', label: 'All Types' },
            { value: 'auto-generated', label: 'Auto Generated' },
            { value: 'manual', label: 'Manually Uploaded' },
          ]}
        />
      </div>
    </div>
  );
}