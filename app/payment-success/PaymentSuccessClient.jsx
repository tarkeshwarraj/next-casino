'use client';

import { useSearchParams } from 'next/navigation';
import Success from '@/components/Success';

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();

  const paymentRef = searchParams.get("paymentRef");
  const amount = searchParams.get("amount");
  const paymentMethod = searchParams.get("paymentMethod");

  return (
    <div>
      <Success 
        paymentRef={paymentRef} 
        amount={amount} 
        paymentMethod={paymentMethod} 
      />
    </div>
  );
}
