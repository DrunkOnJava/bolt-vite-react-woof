import React from 'react';
import { Home, Calendar, MessageSquare, Pill, Receipt } from 'lucide-react';
import { SidebarLink } from './SidebarLink';

export function PatientSidebar() {
  return (
    <div className="space-y-4">
      <SidebarLink to="/dashboard" icon={<Home />} label="Dashboard" />
      <SidebarLink to="/appointments" icon={<Calendar />} label="Appointments" />
      <SidebarLink to="/messages" icon={<MessageSquare />} label="Messages" />
      <SidebarLink to="/medications" icon={<Pill />} label="Medications" />
      <SidebarLink to="/receipts" icon={<Receipt />} label="Receipts" />
    </div>
  );
}