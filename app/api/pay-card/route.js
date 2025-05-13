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
    } = body;

    // Auth key and secret key from SecurePayZone
    const AUTH_KEY = process.env.PAYMENT_AUTH_KEY;
    const SECRET_KEY = process.env.PAYMENT_SECRET_KEY;

    // Create request_payload
    const requestPayload = {
      request_authkey: AUTH_KEY,
      request_flow: 'direct',
      request_payment_method: 'CARD',
      request_signature: '', // to be generated below

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
        address,
        city,
        state,
        country: country || 'US',
        postal_code,
        ip_address,
      },

      payment_payload: {
        payment_ref_id,
        request_amount,
        currency: 'USD',
        notification_url: 'https://yourdomain.com/api/payment/notify', // Replace with your URL
      },

      risk_payload: {
        category_class: 'NonVIP',
        device_fingerprint: 'random_device_token_123', // Optional: you can implement this via JS fingerprinting
      },
    };

    // Convert payload to string and sign
    const payloadString = JSON.stringify(requestPayload);
    const signature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(payloadString)
      .digest('hex');

    requestPayload.request_signature = signature;

    const finalPayload = {
      request_mode: 'payin',
      request_payload: requestPayload,
    };

    // Send request to SecurePayZone
    const response = await fetch('https://api.securepayzone.com/api/request/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalPayload),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('PAYIN error:', error);
    return NextResponse.json({ error: true, message: error.message }, { status: 500 });
  }
}
