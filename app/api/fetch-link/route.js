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

    const TOKEN = 'YOUR_BROWSERLESS_TOKEN'; // 🔐 Replace this with your actual token

    const browser = await chromium.connect(
      `wss://production-sfo.browserless.io/chromium/playwright?token=2SKFGScKsveYbjp48c8f09230dd1a25c554690ed0b5cfa1d1`
    );

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(targetUrl, { waitUntil: 'networkidle' });

    // #PayInWallet element का wait और href निकालना
    await page.waitForSelector('#PayInWallet', { timeout: 10000 });

    const payLink = await page.$eval('#PayInWallet', el => el.getAttribute('href'));

    await browser.close();

    return new Response(JSON.stringify({ payLink }), {
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
