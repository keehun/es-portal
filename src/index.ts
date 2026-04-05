import { Hono } from "hono";
import { getConnInfo } from "hono/cloudflare-workers";
import { ipRestriction } from "hono/ip-restriction";
import { Client as Client9 } from "es9";
import { basicAuth } from "hono/basic-auth";
import { env } from "hono/adapter";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(
  "/api/*"
);

app.get("/", (c) => {
  return c.text("200");
});

app.post("/api/search", async (c) => {
  const text = await c.req.text();
  const info = getConnInfo(c);
  console.log("search req from", info.remote.address, info.remote.port, text);
  const body = await c.req.json();
  const query = body["query"];
  const url = body["url"];
  const key = body["key"];

  const client = new Client9({
    node: url,
    auth: {
      apiKey: key,
    },
    serverMode: "serverless",
  });

  const res = await client.search(query);

  return c.json(res);
});

app.post("/api/msearch", async (c) => {
  const text = await c.req.text();
  const info = getConnInfo(c);
  console.log("msearch req from", info.remote.address, info.remote.port, text);
  const body = await c.req.json();
  const query = body["query"];
  const url = body["url"];
  const key = body["key"];

  const client = new Client9({
    node: url,
    auth: {
      apiKey: key,
    },
    serverMode: "serverless",
  });

  const res = await client.msearch(query);

  return c.json(res);
});

app.post("/api/get", async (c) => {
  const body = await c.req.json();
  const query = body["query"];
  const url = body["url"];
  const key = body["key"];

  const client = new Client9({
    node: url,
    auth: {
      apiKey: key,
    },
  });

  console.log("past client", JSON.stringify(query));
  const res = await client.get(query);
  // console.log("res", res);
  // return c.json(res);
  return c.json({});
});

app.post("/api/count", async (c) => {
  const text = await c.req.text();

  const body = await c.req.json();
  const info = getConnInfo(c);
  console.log("count req from", info.remote.address, info.remote.port, text);

  const query = body["query"];
  const url = body["url"];
  const key = body["key"];

  const client = new Client9({
    node: url,
    auth: {
      apiKey: key,
    },
    serverMode: "serverless",
  });

  const res = await client.count(query);

  return c.json(res);
});

export default app;
