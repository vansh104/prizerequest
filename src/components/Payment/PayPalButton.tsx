import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-hot-toast';
import { paymentAPI } from '../../services/api';

interface PayPalButtonProps {
  contestId: string;
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ contestId, amount, onSuccess, onError }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const createOrder = async () => {
    try {
      const response = await paymentAPI.createOrder(contestId, amount);
      return response.data.orderId;
    } catch (error) {
      console.error('Error creating order:', error);
      onError('Failed to create payment order');
      throw error;
    }
  };

  const onApprove = async (data: any) => {
    try {
      const response = await paymentAPI.capturePayment(data.orderID, data.paymentID);
      if (response.data.success) {
        onSuccess(data.paymentID);
        toast.success('Payment successful!');
      } else {
        onError('Payment capture failed');
        toast.error('Payment failed');
      }
    } catch (error) {
      console.error('Error capturing payment:', error);
      onError('Payment capture failed');
      toast.error('Payment failed');
    }
  };

  const onErrorHandler = (error: any) => {
    console.error('PayPal error:', error);
    onError('Payment failed');
    toast.error('Payment failed');
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onErrorHandler}
      style={{
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
      }}
    />
  );
};

export default PayPalButton;