// app/api/pay-btc/route.js
import { NextResponse } from 'next/server';
import { runCors } from '../../../lib/cors'; // adjust if path is different

export async function POST(req) {
  // Manually create a dummy response to pass to runCors (Next.js doesn't expose res object directly)
  const res = new NextResponse();

  // Run CORS
  await runCors(req, res, () => {});

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
    const invoiceRes = await fetch(`${apiUrl}/stores/${storeId}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!invoiceRes.ok) {
      const errorData = await invoiceRes.json();
      return new NextResponse(JSON.stringify({ error: errorData }), {
        status: invoiceRes.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const data = await invoiceRes.json();
    return new NextResponse(JSON.stringify({
      id: data.id,
      status: data.status,
      checkoutLink: data.checkoutLink,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
