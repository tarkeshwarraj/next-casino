// pages/api/proxy.js

import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { URL } from 'url';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    res.status(400).send("Missing 'url' query parameter.");
    return;
  }

  try {
    const decodedUrl = decodeURIComponent(targetUrl);
    const url = new URL(decodedUrl);

    return createProxyMiddleware({
      target: `${url.protocol}//${url.host}`,
      changeOrigin: true,
      secure: false,
      pathRewrite: (path) => url.pathname + url.search,
    })(req, res, (result) => {
      if (result instanceof Error) throw result;
      return result;
    });
  } catch (err) {
    res.status(400).send("Invalid URL");
  }
}
