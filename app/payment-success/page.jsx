'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Success from '@/components/Success'

const page = () => {
    const searchParams = useSearchParams();
    
    const paymentRef = searchParams.get("paymentRef");
    const amount = searchParams.get('amount');
    const paymentMethod = searchParams.get("paymentMethod");

  return (
    <div>
        <Success paymentRef={paymentRef} amount={amount} paymentMethod={paymentMethod} />
    </div>
  )
}

export default page