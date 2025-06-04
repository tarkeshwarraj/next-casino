'use client';

import { useState } from 'react';
import axios from 'axios';

export default function PaymentPage() {

  const [payerPhone, setPayerPhone] = useState('');
  const [tradeAmount, setTradeAmount] = useState('');
  const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  const payload = {
      mch_id: '84261115',
      mch_order_no: 'ORDER' + Date.now(),
      notifyUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/payment/payment-notify`,
      page_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-success`,
      trade_amount: tradeAmount,
      currency: 'INR',
      pay_type: 'INDIA_UPI',
      payer_phone: payerPhone,
      attach: 'daifu',
    };



    try {
      const response = await axios.post('/api/payment/create', payload);

      console.log('Gateway response:', response.data);

      if (response.data?.code === 0) {
        window.location.href = response.data.data.url || response.data.data.payment_url;
      } else {
        alert('Payment failed: ' + (response.data?.msg || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Error occurred: ' + (error.response?.data?.msg || error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto rounded-xl bg-white">
      <h1 className="text-xl font-bold mb-4 text-black">Payment Page</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1 text-black">Amount (Min-100 Rs)</label>
          <input
            type="number"
            value={tradeAmount}
            onChange={(e)=>setTradeAmount(e.target.value)}
            className="w-full border px-2 py-1 rounded border-gray-300 text-black"
            disabled={loading}
            required
            min={100}
          />
        </div>
        <div>
          <label className="block mb-1 text-black">Payer Phone</label>
          <input
            type="text"
            value={payerPhone}
            onChange={(e)=>setPayerPhone(e.target.value)}
            className="w-full border px-2 py-1 rounded border-gray-300 text-black"
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>
    </div>
  );
}
