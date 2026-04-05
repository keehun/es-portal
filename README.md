# es-portal

Exercise `@elastic/elasticsearch` on Cloudflare Workers

To reproduce the issue:

1. `npm install`
2. `npm run dev`
3. Send an API request with the structure:
	```
    curl --request POST \
        --url http://localhost:8787/api/get \
        --header 'Content-Type: application/json' \
        --data '{
            "url": "<URL to elasticsearch instance>",
            "key": "<API key>",
            "query": {
                "id": "<Document ID>",
                "index": "<Index ID>"
            }
        }'
	```

You will get an error like:

```
[wrangler:info] Ready on http://127.0.0.1:8787
past client {"id":"528db904-e9b0-4b2d-b523-4aa94a79ca3b","index":"composer"}
✘ [ERROR] ConnectionError: The options.ALPNProtocols option is not implemented

      at SniffingTransport._request
  (node_modules/@elastic/transport/src/Transport.ts:682:17)
      at null.<anonymous> (async
  .wrangler/tmp/dev-SqmXzH/index.js:7845:26)
      at async SniffingTransport.request
  (node_modules/@elastic/transport/src/Transport.ts:744:14)
      at async _Client.GetApi [as get]
  (node_modules/src/api/api/get.ts:95:10)
      at async Array.<anonymous> (src/index.ts:76:15)
      at async jsonError
  (node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts:22:10)
      at async drainBody
  (node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts:5:10)
  {
    options: { redaction: { type: 'replace', additionalKeys: [] } },
    meta: {
      body: undefined,
      statusCode: 0,
      headers: {},
      meta: {
        context: null,
        request: [Object],
        name: 'elasticsearch-js',
        connection: [Object],
        attempts: 3,
        aborted: false
      },
      warnings: null
    }
  }
```