import crypto from 'crypto';

const SECRET_KEY = 'bf8a70bad67ec1f2d27b44c7a04d6f4d';
const BASE_URL = 'https://xyu10.top';

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
    const body = await request.json();
    console.log('Received body:', body);

    const requiredFields = [
  'mch_id',
  'mch_order_no',
  'notifyUrl',
  'page_url',
  'trade_amount',
  'currency',
  'pay_type',
  'payer_phone',
  'attach',
];

    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(
          JSON.stringify({ error: `Missing field: ${field}` }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Generate signature
    const sign = generateSignature(body, SECRET_KEY);

    // Prepare POST data with sign and sign_type
    const postData = {
      ...body,
      sign,
      sign_type: 'MD5',
    };

    const formBody = new URLSearchParams();
    Object.entries(postData).forEach(([k, v]) => formBody.append(k, String(v)));

    // Send request to the payment gateway
    const response = await fetch(`${BASE_URL}/api/payGate/payCollect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
