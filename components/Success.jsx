

'use client'
import {useRouter } from 'next/navigation';


export default function Success({ paymentRef, amount, paymentMethod, onClose }) {

  const router = useRouter();


  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-green-50 border border-green-400 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Payment Successful!</h2>
      <p className="text-green-800 mb-2">
        🎉 Your payment has been processed successfully.
      </p>
      <p className="mb-1">
        <strong>Payment Reference ID:</strong> {paymentRef}
      </p>
      <p className="mb-1">
        <strong>Amount Paid:</strong> ${amount}
      </p>
      <p className="mb-4">
        <strong>Payment Method:</strong> {paymentMethod}
      </p>
      <button
        onClick={()=> router.push("/trust-pay")}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Close
      </button>
    </div>
  );
}
