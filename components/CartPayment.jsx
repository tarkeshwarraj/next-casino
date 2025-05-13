import { useState } from 'react';

export default function CardPayment() {
  const [form, setForm] = useState({
    card_holder_name: '',
    card_type: '',
    card_number: '',
    expiry_month: '',
    expiry_year: '',
    cvv: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    ip_address: '127.0.0.1', // You can fetch real IP using a third-party API
    request_amount: 100, // Example amount
    payment_ref_id: `REF${Date.now()}`
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/pay-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: true, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Card Payment</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="card_holder_name" placeholder="Card Holder Name" onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="card_type" placeholder="Card Type (e.g. VISA)" onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="card_number" placeholder="Card Number" onChange={handleChange} required className="w-full p-2 border" />
        <div className="flex gap-2">
          <input type="text" name="expiry_month" placeholder="MM" onChange={handleChange} required className="w-1/2 p-2 border" />
          <input type="text" name="expiry_year" placeholder="YYYY" onChange={handleChange} required className="w-1/2 p-2 border" />
        </div>
        <input type="text" name="cvv" placeholder="CVV" onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required className="w-full p-2 border" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border" />
        <input type="tel" name="mobile" placeholder="Mobile Number" onChange={handleChange} required className="w-full p-2 border" />

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 mt-4">
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-3 bg-gray-100 border text-sm">
          <strong>Response:</strong>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
