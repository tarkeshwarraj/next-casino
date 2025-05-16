import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      card_holder_name,
      card_type,
      card_number,
      expiry_month,
      expiry_year,
      cvv,
      first_name,
      last_name,
      email,
      mobile,
      address,
      city,
      state,
      postal_code,
      country,
      ip_address,
      payment_ref_id,
      request_amount,
      currency = 'USD',
    } = body;

    // Auth key and secret key from SecurePayZone (environment variables)
    const AUTH_KEY = process.env.PAYMENT_AUTH_KEY;
    const SECRET_KEY = process.env.PAYMENT_SECRET_KEY.toLowerCase();

    // Generate the signature string as per spec (CARD)
    const amountInPaise = Math.round(request_amount * 100); // multiply amount by 100, integer
    const signatureString = `${AUTH_KEY}||${payment_ref_id}||${currency}||${SECRET_KEY}`;

    // Generate SHA256 hash signature
    const request_signature = crypto.createHash('sha256').update(signatureString).digest('hex');

    // Build the request payload
    const requestPayload = {
      request_authkey: AUTH_KEY,
      request_flow: 'direct',
      request_payment_method: 'CARD',
      request_signature,

      payment_method_payload: {
        card_holder_name,
        card_type,
        card_number,
        expiry_month,
        expiry_year,
        cvv,
      },

      customer_payload: {
        first_name,
        last_name,
        email,
        mobile,
        address: address || '',
        city: city || '',
        state: state || '',
        country: country || 'US',
        postal_code: postal_code || '',
        ip_address: ip_address || '',
      },

      payment_payload: {
        payment_ref_id,
        request_amount,
        currency,
        notification_url: 'https://yourdomain.com/api/payment/notify', // Replace this with your actual URL
      },

      risk_payload: {
        category_class: 'NonVIP',
        device_fingerprint: 'random_device_token_123',
      },
    };

    const finalPayload = {
      request_mode: 'payin',
      request_payload: requestPayload,
    };

    // Send POST request to SecurePayZone
    const response = await fetch('https://api.securepayzone.com/api/request/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalPayload),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('PAYIN error:', error);
    return NextResponse.json({ error: true, message: error.message }, { status: 500 });
  }
}
