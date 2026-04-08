#!/usr/bin/env bash
set -euo pipefail

# Deploy from a git checkout located ON the cPanel server.
# Default paths are tailored for chmtop account.
# Usage (from anywhere):
#   /home/chmtop/WEB_STR/deploy-on-cpanel.sh
#
# Optional overrides:
#   REPO_DIR=/home/chmtop/WEB_STR PUBLIC_HTML=/home/chmtop/public_html BACKEND_DIR=/home/chmtop/chmup_backend ./deploy-on-cpanel.sh

REPO_DIR="${REPO_DIR:-/home/chmtop/WEB_STR}"
PUBLIC_HTML="${PUBLIC_HTML:-/home/chmtop/public_html}"
BACKEND_DIR="${BACKEND_DIR:-/home/chmtop/chmup_backend}"

if [[ ! -d "$REPO_DIR/.git" ]]; then
  echo "ERROR: git repo not found at $REPO_DIR"
  exit 1
fi

cd "$REPO_DIR"
echo "[1/5] Pulling latest changes from git..."
git pull --ff-only

echo "[2/5] Copying frontend to $PUBLIC_HTML"
mkdir -p "$PUBLIC_HTML"
cp -a frontend/. "$PUBLIC_HTML/"

echo "[3/5] Copying backend to $BACKEND_DIR"
mkdir -p "$BACKEND_DIR"
cp -a chmup_backend/. "$BACKEND_DIR/"

if command -v npm >/dev/null 2>&1; then
  echo "[4/5] Installing backend dependencies..."
  cd "$BACKEND_DIR"
  npm install --production
else
  echo "[4/5] npm not found in current shell (skip install)."
  echo "       Use cPanel Node.js App panel to run NPM Install / Restart."
fi

echo "[5/5] Done. Restart Node.js app in cPanel if needed."
