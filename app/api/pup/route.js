import puppeteer from 'puppeteer';

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const version = await browser.version();
    const executablePath = puppeteer.executablePath();

    await browser.close();

    return new Response(JSON.stringify({
      chromeVersion: version,
      executablePath
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
