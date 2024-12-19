import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import { verifyEmail } from '../../lib/auth/email-verification';
import { useNotifications } from '../../context/NotificationContext';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('Invalid verification link');
      setVerifying(false);
      return;
    }

    verifyEmail(token)
      .then(() => {
        setVerifying(false);
        addNotification('success', 'Email verified successfully');
        setTimeout(() => navigate('/auth/login'), 2000);
      })
      .catch((err) => {
        setError(err.message);
        setVerifying(false);
      });
  }, [searchParams, navigate, addNotification]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
        {verifying ? (
          <>
            <Mail className="mx-auto h-12 w-12 text-blue-500 animate-pulse" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Verifying your email...
            </h2>
          </>
        ) : error ? (
          <>
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Verification Failed
            </h2>
            <p className="mt-2 text-red-600">{error}</p>
          </>
        ) : (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Email Verified
            </h2>
            <p className="mt-2 text-gray-600">
              Redirecting to login...
            </p>
          </>
        )}
      </div>
    </div>
  );
}