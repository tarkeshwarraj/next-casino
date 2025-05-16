import puppeteer from 'puppeteer';

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

    const browser = await puppeteer.launch({
      headless: true,
      // For some platforms (e.g. Linux servers), you may need extra args:
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(targetUrl, { waitUntil: 'networkidle2' });

    // Wait up to 10 seconds for element to appear
    await page.waitForSelector('#PayInWallet', { timeout: 10000 });

    // Extract the href attribute of the element
    const payLink = await page.$eval('#PayInWallet', (el) => el.getAttribute('href'));

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
