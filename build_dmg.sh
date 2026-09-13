#!/bin/bash
set -e

# Setup variables
APP_NAME="Clickit"
APP_DIR="leanring-buddy/Build/Release/${APP_NAME}.app"
DMG_NAME="${APP_NAME}.dmg"
BACKGROUND="backend/public/clickit_app_logo_rounded.png"

# Check if the app exists
if [ ! -d "$APP_DIR" ]; then
    echo "Error: ${APP_NAME}.app not found in leanring-buddy/Build/Release/"
    echo "Please build the app in Xcode for Release first."
    exit 1
fi

# Remove existing DMG
rm -f "$DMG_NAME"

# Create the DMG
create-dmg \
  --volname "${APP_NAME} Installer" \
  --volicon "leanring-buddy/Assets.xcassets/AppIcon.appiconset/icon_512x512.png" \
  --background "$BACKGROUND" \
  --window-pos 200 120 \
  --window-size 600 400 \
  --icon-size 100 \
  --icon "${APP_NAME}.app" 150 190 \
  --hide-extension "${APP_NAME}.app" \
  --app-drop-link 450 190 \
  "$DMG_NAME" \
  "$APP_DIR"

echo "Success! ${DMG_NAME} created."
