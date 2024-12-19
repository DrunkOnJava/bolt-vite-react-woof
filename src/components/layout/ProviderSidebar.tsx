import React from 'react';
import { Home, Users, MessageSquare, Pill } from 'lucide-react';
import { SidebarLink } from './SidebarLink';
import { useRefillRequests } from '../../hooks/useRefillRequests';
import { RefillRequestBadge } from '../medications/RefillRequestBadge';

export function ProviderSidebar() {
  const { getPendingRequestsCount } = useRefillRequests();
  const pendingCount = getPendingRequestsCount();

  return (
    <div className="space-y-4">
      <SidebarLink to="/provider/dashboard" icon={<Home />} label="Dashboard" />
      <SidebarLink to="/provider/patients" icon={<Users />} label="Patients" />
      <SidebarLink to="/provider/messages" icon={<MessageSquare />} label="Messages" />
      <div className="flex items-center justify-between">
        <SidebarLink to="/provider/refills" icon={<Pill />} label="Refill Requests" />
        <RefillRequestBadge count={pendingCount} />
      </div>
    </div>
  );
}