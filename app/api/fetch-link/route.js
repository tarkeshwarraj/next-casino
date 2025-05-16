
export async function GET(req) {
  
  const { chromium } = await import('playwright');

  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
      return new Response(JSON.stringify({ error: 'Missing URL query parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Linux सर्वर के लिए
    });
    const page = await browser.newPage();

    await page.goto(targetUrl, { waitUntil: 'networkidle' });

    // 10 सेकंड तक #PayInWallet selector का इंतजार करो
    await page.waitForSelector('#PayInWallet', { timeout: 10000 });

    // #PayInWallet से href attribute निकालो
    const payLink = await page.$eval('#PayInWallet', el => el.getAttribute('href'));

    await browser.close();

    return new Response(
      JSON.stringify({ payLink }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
