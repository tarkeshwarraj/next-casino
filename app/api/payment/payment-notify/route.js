import crypto from 'crypto';

const SECRET_KEY = 'bf8a70bad67ec1f2d27b44c7a04d6f4d';

function generateSignature(params, secretKey) {
  const data = { ...params };
  delete data.sign;
  delete data.sign_type;

  const sortedKeys = Object.keys(data).sort();

  const str = sortedKeys
    .filter(k => data[k] !== undefined && data[k] !== null && data[k] !== '')
    .map(k => `${k}=${data[k]}`)
    .join('&');

  const stringToSign = `${str}&key=${secretKey}`;

  return crypto.createHash('md5').update(stringToSign).digest('hex').toLowerCase();
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const payload = {};
    for (const [key, value] of formData.entries()) {
      payload[key] = value;
    }

    console.log('🔔 Webhook Payload:', payload);

    const expectedSign = generateSignature(payload, SECRET_KEY);

    if (payload.sign !== expectedSign) {
      console.warn('❌ Invalid signature from payment gateway');
      return new Response('Invalid signature', { status: 400 });
    }

    if (payload.status === '1') {
      // ✅ Payment successful
      // TODO: Update your DB (order paid) using payload.mch_order_no

      console.log('✅ Payment successful for order:', payload.mch_order_no);

      // Send "success" to stop further notifications
      return new Response('success', { status: 200 });
    } else {
      console.warn('⚠️ Payment not successful:', payload.status);
      return new Response('Payment not successful', { status: 400 });
    }
  } catch (error) {
    console.error('❌ Webhook Error:', error);
    return new Response('Error', { status: 500 });
  }
}
