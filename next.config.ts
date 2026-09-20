import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* `standalone` traces the exact files the server needs and writes a
   * self-contained `.next/standalone`, which is what makes the Docker image
   * small enough to be worth building. It is deliberately NOT on by default.
   *
   * `next start` refuses to run against a standalone build and tells you to
   * run `node .next/standalone/server.js` instead. Railway's builder runs
   * `npm start`, so switching this on unconditionally would take the live site
   * down the next time it deployed, in exchange for an image size nothing in
   * that path ever looks at.
   *
   * So the Dockerfile sets DOCKER_BUILD=1 and gets the traced output; every
   * other build, including Railway's, keeps the runtime it already works with.
   * Remove the condition only when the container is the deployment. */
  output: process.env.DOCKER_BUILD === "1" ? "standalone" : undefined,
};

export default nextConfig;
