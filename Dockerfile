# Multi-stage build for the portfolio.
#
# Three stages rather than one, for a reason that only shows up later: the
# final image contains no package manager, no dev dependencies, no source
# and no build cache. Whatever a vulnerability scanner finds in this image is
# something the running server can actually reach.
#
# Build:  docker build -t laud-portfolio .
# Run:    docker run --rm -p 8080:8080 -e GEMINI_API_KEY=... laud-portfolio

# ---- Stage 1: dependencies ------------------------------------------------
# Split from the build stage so a source-only change reuses the cached
# npm install. Copying package.json and the lockfile alone is what makes that
# layer stable; copying the whole tree first would invalidate it on every edit.
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# `npm ci` installs exactly the lockfile, and fails rather than resolving a
# different tree. That failure is the point: an image built from a drifting
# dependency set is not the thing that was tested.
RUN npm ci

# ---- Stage 2: build -------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Tells next.config.ts to emit the traced standalone server. See the comment
# there for why this is a flag rather than the default.
ENV DOCKER_BUILD=1
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Stage 3: runtime -----------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# A named non-root user, because the default in a Node image is root and a
# static site has no reason to hold it. If something does get remote execution
# through a dependency, this is the difference between reading the app
# directory and owning the container.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# `public` and `.next/static` are not traced into the standalone output and
# have to be copied by hand. Missing them gives a site that boots cleanly and
# then serves no CSS and no images, which is a confusing failure to debug
# precisely because nothing errors.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8080

# Not `npm start`. The standalone output is a plain Node server, and running it
# directly means signals reach the process instead of being swallowed by an npm
# wrapper, so the container stops on SIGTERM rather than waiting to be killed.
CMD ["node", "server.js"]
