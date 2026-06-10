import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Express } from "express";
import { createApp } from "../server/create-app";

let appPromise: Promise<Express> | null = null;

function getApp() {
  if (!appPromise) {
    appPromise = createApp({ static: false });
  }
  return appPromise;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await getApp();
  app(req, res);
}
