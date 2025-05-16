import puppeteer from 'puppeteer';

export async function GET() {
  try {
    const browserFetcher = puppeteer.createBrowserFetcher();
    const localRevisions = await browserFetcher.localRevisions();

    if (localRevisions.length === 0) {
      return new Response(JSON.stringify({ error: 'No local Chromium revision found' }), {
        status: 404,
      });
    }

    const info = await browserFetcher.revisionInfo(localRevisions[0]);

    return new Response(
      JSON.stringify({ chromiumPath: info.executablePath }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
