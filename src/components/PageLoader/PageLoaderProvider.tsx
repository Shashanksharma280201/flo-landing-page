"use client";

import { useState } from "react";
import { PageLoader } from "./PageLoader";

/**
 * PageLoaderProvider
 *
 * A thin client wrapper that owns the `loaderDone` state.
 * Placed in layout.tsx (Server Component) — only this wrapper runs on the client.
 * Once the loader completes, it unmounts itself cleanly via conditional render.
 */
export function PageLoaderProvider() {
  const [loaderDone, setLoaderDone] = useState(false);

  if (loaderDone) return null;

  return <PageLoader onComplete={() => setLoaderDone(true)} />;
}
