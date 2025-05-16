'use client'
import React from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+

const PaymentFail = () => {
  const router = useRouter();

  const handleRetry = () => {
    router.push("/trust-pay"); // or your payment page route
  };

  return (
    <div className="min-h-screen flex flex-col  items-center bg-red-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-gray-700 mb-6">
          Something went wrong while processing your payment. Please try again.
        </p>
        <button
          onClick={handleRetry}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFail;
