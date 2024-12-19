import React from 'react';
import { Activity, Calendar, MessageSquare, Pill } from 'lucide-react';

interface PatientStats {
  totalVisits: number;
  upcomingAppointments: number;
  activeMessages: number;
  activePrescriptions: number;
}

interface PatientStatsProps {
  stats: PatientStats;
}

export function PatientStats({ stats }: PatientStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Visits</p>
            <p className="text-2xl font-semibold">{stats.totalVisits}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <Activity className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Upcoming</p>
            <p className="text-2xl font-semibold">{stats.upcomingAppointments}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <MessageSquare className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Messages</p>
            <p className="text-2xl font-semibold">{stats.activeMessages}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Pill className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Prescriptions</p>
            <p className="text-2xl font-semibold">{stats.activePrescriptions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}