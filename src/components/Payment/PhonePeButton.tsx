import React from 'react';
import { toast } from 'react-hot-toast';

interface PhonePeButtonProps {
  contestId: string;
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

const PhonePeButton: React.FC<PhonePeButtonProps> = ({
  contestId,
  amount,
  onSuccess,
  onError,
}) => {
  const clientId = import.meta.env.VITE_PHONEPE_CLIENT_ID;

  const handleClick = () => {
    if (!clientId) {
      toast.error('PhonePe Client ID is missing. Cannot process payment.');
      onError('Missing PhonePe Client ID');
      return;
    }

    // Simulate payment flow (mock until real integration)
    setTimeout(() => {
      const mockPaymentId = `MOCK_PAYMENT_${Date.now()}`;
      toast.success('Mock payment successful!');
      onSuccess(mockPaymentId);
    }, 1000);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
    >
      Pay with PhonePe (Mock)
    </button>
  );
};

export default PhonePeButton;
