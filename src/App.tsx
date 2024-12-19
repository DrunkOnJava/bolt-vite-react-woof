import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { NotificationList } from './components/notifications/NotificationList';
import { AuthGuard } from './components/auth/AuthGuard';
import Layout from './components/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import PatientDashboard from './pages/patient/Dashboard';
import ProviderDashboard from './pages/provider/Dashboard';
import PatientsDirectoryPage from './pages/patients/PatientsDirectoryPage';
import PatientProfilePage from './pages/patients/PatientProfilePage';
import MessagesPage from './pages/messages/MessagesPage';
import AppointmentsPage from './pages/appointments/AppointmentsPage';
import ReceiptsPage from './pages/receipts/ReceiptsPage';
import PrescriptionsPage from './pages/prescriptions/PrescriptionsPage';
import RefillRequestsPage from './pages/provider/RefillRequestsPage';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <UserProvider>
              <Router>
                <Routes>
                  {/* Auth Routes */}
                  <Route path="/auth">
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />
                  </Route>

                  {/* Protected Routes */}
                  <Route element={<AuthGuard><Layout /></AuthGuard>}>
                    {/* Patient Routes */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<PatientDashboard />} />
                    <Route path="/messages" element={<MessagesPage />} />
                    <Route path="/appointments" element={<AppointmentsPage />} />
                    <Route path="/receipts" element={<ReceiptsPage />} />
                    <Route path="/medications" element={<PrescriptionsPage />} />
                    
                    {/* Provider Routes */}
                    <Route path="/provider" element={<Navigate to="/provider/dashboard" replace />} />
                    <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                    <Route path="/provider/patients" element={<PatientsDirectoryPage />} />
                    <Route path="/provider/patients/:patientId" element={<PatientProfilePage />} />
                    <Route path="/provider/messages" element={<MessagesPage />} />
                    <Route path="/provider/refills" element={<RefillRequestsPage />} />
                  </Route>
                </Routes>
                <NotificationList />
              </Router>
            </UserProvider>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}