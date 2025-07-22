import { chromium } from 'playwright-core';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
      return new Response(JSON.stringify({ error: 'Missing URL query parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    //browserless.io hai jaha hmara browser run hoga
    const browser = await chromium.connect(
      `wss://production-sfo.browserless.io/chromium/playwright?token=${process.env.BROWSERLESS_TOKEN}`
    );

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(targetUrl, { waitUntil: 'networkidle' });

    // #PayInWallet element का wait और href निकालना
    await page.waitForSelector('#PayInWallet', { timeout: 10000 });
    await page.waitForSelector('.qr-container', { timeout: 10000 });

    // Extract the href from #PayInWallet
    const payLink = await page.$eval('#PayInWallet', el => el.getAttribute('href'));

    const qrContainerHtml = await page.$eval('.qr-container', el => el.outerHTML);
    const rawQrValue = await page.$eval('.qr-container', el => el.getAttribute('data-qr-value'));
    const qrValue = rawQrValue?.replace(/^lightning:/, ''); // Cleaned value


    await browser.close();

    return new Response(JSON.stringify({ payLink, qrValue, qrContainerHtml }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
