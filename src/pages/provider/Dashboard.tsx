import React from 'react';
import { Users, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import DashboardCard from '../../components/DashboardCard';

export default function ProviderDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Today's Appointments">
          <div className="text-center">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800">8</p>
            <p className="text-sm text-gray-500">Scheduled Today</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Unread Messages">
          <div className="text-center">
            <MessageSquare className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800">12</p>
            <p className="text-sm text-gray-500">New Messages</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Pending Refills">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800">5</p>
            <p className="text-sm text-gray-500">Require Review</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Active Patients">
          <div className="text-center">
            <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800">247</p>
            <p className="text-sm text-gray-500">Total Patients</p>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Recent Patient Messages">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500 truncate">Question about medication side effects</p>
                  <p className="text-xs text-gray-400">10 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Pending Refill Requests">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <p className="font-medium">Michael Brown</p>
                    <p className="text-sm text-gray-500">Lisinopril 10mg</p>
                    <p className="text-xs text-gray-400">Requested: March 10, 2024</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200">
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}