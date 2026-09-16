#!/usr/bin/env bash
# Build the app, render every route to static HTML, and assemble a fully
# static site in ./out for deployment to static hosting (e.g. IONOS Deploy Now).
#
# The app has no server-side data, auth or database, so each route renders to a
# fixed HTML document. We build, start the production server, crawl the known
# routes, then shut the server down. No runtime is needed by the deployed site.
set -uo pipefail

ROUTES=("" "estudio" "servicios" "proyectos" "contacto")  # add new routes here
PORT=3000
BASE="http://127.0.0.1:${PORT}"
BIN="./node_modules/.bin/vinext"

echo "==> Building (vinext build)"
"${BIN}" build

echo "==> Preparing ./out from static client assets"
rm -rf out && mkdir -p out
cp -r dist/client/. out/

echo "==> Starting production server for snapshot"
# New session/process group so we can kill the whole tree (vinext spawns workerd)
setsid bash -c "exec ${BIN} start" >/tmp/vinext-start.log 2>&1 &
SRV_PGID=$!

cleanup() {
  kill -- -"${SRV_PGID}" 2>/dev/null || true
  pkill -f "vinext start" 2>/dev/null || true
  pkill -f "workerd"      2>/dev/null || true
}
trap cleanup EXIT

echo "==> Waiting for server"
UP=0
for i in $(seq 1 40); do
  if [ "$(curl -s --max-time 3 -o /dev/null -w '%{http_code}' "${BASE}/" 2>/dev/null)" = "200" ]; then
    UP=1; echo "    up after ~$((i*2))s"; break
  fi
  sleep 2
done
if [ "${UP}" != "1" ]; then echo "ERROR: server never came up"; tail -30 /tmp/vinext-start.log; exit 1; fi

echo "==> Crawling routes"
FAIL=0
for r in "${ROUTES[@]}"; do
  if [ -z "$r" ]; then dest="out/index.html"; label="/"; else mkdir -p "out/$r"; dest="out/$r/index.html"; label="/$r"; fi
  curl -s --max-time 30 "${BASE}/${r}" -o "${dest}"
  bytes=$(wc -c <"${dest}" 2>/dev/null || echo 0)
  if [ "${bytes}" -lt 500 ]; then echo "    FAIL ${label} (${bytes} bytes)"; FAIL=1; else echo "    ok   ${label} (${bytes} bytes)"; fi
done
[ "${FAIL}" = "0" ] || { echo "ERROR: one or more routes failed to render"; exit 1; }

echo "==> Static site ready in ./out"
exit 0
