#!/usr/bin/env bash
set -euo pipefail

# One-command deploy to cPanel via rsync over SSH.
# Usage:
#   CPANEL_HOST=host CPANEL_USER=user CPANEL_PATH=/home/user/public_html ./deploy-cpanel.sh

: "${CPANEL_HOST:?Set CPANEL_HOST}"
: "${CPANEL_USER:?Set CPANEL_USER}"
: "${CPANEL_PATH:?Set CPANEL_PATH}"

REMOTE="${CPANEL_USER}@${CPANEL_HOST}"

echo "[1/2] Uploading frontend files to ${REMOTE}:${CPANEL_PATH}"
rsync -az --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  frontend/ "${REMOTE}:${CPANEL_PATH}/"

echo "[2/2] Uploading backend files to ${REMOTE}:~/chmup_backend"
rsync -az --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  chmup_backend/ "${REMOTE}:~/chmup_backend/"

echo "Deploy finished."
echo "Now restart Node.js app in cPanel or run: passenger-config restart-app ~/chmup_backend"
