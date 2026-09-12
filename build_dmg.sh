#!/bin/bash

# Exit on any error
set -e

APP_NAME="Clickit"
PROJECT_NAME="leanring-buddy.xcodeproj"
SCHEME="leanring-buddy"
BUILD_DIR="build"

echo "🧹 Cleaning previous builds..."
rm -rf "$BUILD_DIR"
rm -f "$APP_NAME.dmg"

echo "🔨 Building $APP_NAME..."
xcodebuild clean build \
  -project "$PROJECT_NAME" \
  -scheme "$SCHEME" \
  -configuration Release \
  -derivedDataPath "$BUILD_DIR" \
  CODE_SIGN_IDENTITY="" \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGNING_ALLOWED=NO

APP_PATH=$(find "$BUILD_DIR/Build/Products/Release" -name "*.app" -maxdepth 1 | head -n 1)

if [ -z "$APP_PATH" ]; then
    echo "❌ Failed to find the built .app"
    exit 1
fi

echo "✅ App built successfully at $APP_PATH"

# Rename the app to exactly Clickit.app just in case
if [[ $(basename "$APP_PATH") != "$APP_NAME.app" ]]; then
    mv "$APP_PATH" "$(dirname "$APP_PATH")/$APP_NAME.app"
    APP_PATH="$(dirname "$APP_PATH")/$APP_NAME.app"
fi

echo "📦 Creating $APP_NAME.dmg..."

# Create a temporary staging directory
STAGING_DIR="$BUILD_DIR/dmg_staging"
mkdir -p "$STAGING_DIR"

# Copy the app to the staging directory
cp -r "$APP_PATH" "$STAGING_DIR/"

# Create a symlink to Applications folder
ln -s /Applications "$STAGING_DIR/Applications"

# Create the DMG
hdiutil create -volname "$APP_NAME" -srcfolder "$STAGING_DIR" -ov -format UDZO "$APP_NAME.dmg"

echo "🎉 Successfully created $APP_NAME.dmg!"
