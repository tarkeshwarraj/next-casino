'use client';

import { useState } from 'react';

export default function CardPaymentPage() {
  const [formData, setFormData] = useState({
    card_holder_name: '',
    card_type: 'debit',
    card_number: '',
    expiry_month: '',
    expiry_year: '',
    cvv: '',
    first_name: 'test',
    last_name: 'last',
    email: 'test@gmail.com',
    mobile: '1111111111',
    address: 'test',
    city: 'test',
    state: 'test',
    postal_code: '12345',
    country: 'US',
    ip_address: '1.1.1.1',
    request_amount: '',
    payment_ref_id: '1234',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateRandomRefId = () => {
    return 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      console.log(ipData);

      const res = await fetch('/api/pay-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ip_address: ipData.ip,
          payment_ref_id: formData.payment_ref_id || generateRandomRefId(),
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessage(`❌ Error: ${data.message}`);
      } else {
        setMessage(`✅ Payment Initiated! Response: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ Unexpected error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Card Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Card Holder Name</label>
          <input name="card_holder_name" onChange={handleChange} required className="input" />
        </div>
        {/* <div>
          <label>Card Type (credit/debit)</label>
          <input name="card_type" onChange={handleChange} required className="input" />
        </div> */}
        <div>
          <label>Card Number</label>
          <input name="card_number" onChange={handleChange} required className="input" />
        </div>
        <div className="flex gap-4">
          <div>
            <label>Expiry Month</label>
            <input name="expiry_month" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label>Expiry Year</label>
            <input name="expiry_year" onChange={handleChange} required className="input" />
          </div>
        </div>
        <div>
          <label>CVV</label>
          <input name="cvv" type="password" onChange={handleChange} required className="input" />
        </div>
        <hr className="my-4" />
        {/* <h3 className="text-lg font-semibold">Customer Info</h3> */}
        {/* <div>
          <label>First Name</label>
          <input name="first_name" onChange={handleChange} required className="input" />
        </div>
        <div>
          <label>Last Name</label>
          <input name="last_name" onChange={handleChange} required className="input" />
        </div>
        <div>
          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} required className="input" />
        </div>
        <div>
          <label>Mobile</label>
          <input name="mobile" onChange={handleChange} required className="input" />
        </div>
        <div>
          <label>Address</label>
          <input name="address" onChange={handleChange} className="input" />
        </div>
        <div className="flex gap-4">
          <div>
            <label>City</label>
            <input name="city" onChange={handleChange} className="input" />
          </div>
          <div>
            <label>State</label>
            <input name="state" onChange={handleChange} className="input" />
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <label>Postal Code</label>
            <input name="postal_code" onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Country</label>
            <input name="country" defaultValue="IN" onChange={handleChange} className="input" />
          </div>
        </div> */}
        {/* <hr className="my-4" /> */}
        <div>
          <label>Amount (USD)</label>
          <input name="request_amount" onChange={handleChange} required className="input" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-4 rounded text-sm" style={{ whiteSpace: 'pre-wrap' }}>
          {message}
        </div>
      )}

      <style jsx>{`
        .input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
