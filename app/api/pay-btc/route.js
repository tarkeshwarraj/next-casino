// app/api/pay-btc/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  const storeId = process.env.NEXT_PUBLIC_BTCPAY_STORE_ID;
  const apiKey = process.env.BTCPAY_API_KEY;
  const apiUrl = process.env.BTCPAY_API_URL;

  const payload = {
    amount: body.amount, // e.g., "5.00"
    currency: "USD",
    metadata: {
      orderId: `ORD-${Date.now()}`,
      itemDesc: body.name,
    },
    checkout: {
      speedPolicy: "HighSpeed",
      redirectAutomatically: true,
    },
  };

  try {
    const res = await fetch(`${apiUrl}/stores/${storeId}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({
      id: data.id,
      status: data.status,
      checkoutLink: data.checkoutLink,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
