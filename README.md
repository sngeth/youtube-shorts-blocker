# YouTube Shorts Blocker for Safari

A Safari extension that completely blocks YouTube Shorts from appearing anywhere on YouTube.

## Features

- Removes Shorts shelf from YouTube homepage
- Hides Shorts button in sidebar navigation
- Blocks direct navigation to Shorts URLs (redirects to YouTube homepage)
- Removes Shorts from search results and recommendations
- Hides Shorts tab/chip in the interface
- Prevents Shorts from appearing in video overlays

## Installation

### Method 1: Using Xcode (Recommended for Safari)

1. Install Xcode from the Mac App Store if you haven't already
2. Open Terminal and run:
   ```bash
   cd youtube-shorts-blocker
   xcrun safari-web-extension-converter . --project-location ../YouTubeShortsBlocker --app-name "YouTube Shorts Blocker"
   ```
3. Open the generated Xcode project:
   ```bash
   open ../YouTubeShortsBlocker/YouTube\ Shorts\ Blocker/YouTube\ Shorts\ Blocker.xcodeproj
   ```
4. In Xcode:
   - **IMPORTANT**: At the top, make sure "YouTube Shorts Blocker (macOS)" is selected, NOT iOS
   - Select "My Mac" as the target device
   - For signing: Choose "Personal Team" OR skip signing for local use only
   - Build and run the project (⌘+R)
5. **Enable Unsigned Extensions** (required for local development):
   - Safari → Settings → Advanced
   - Check "Show features for web developers"
   - Safari → Develop menu → **Allow Unsigned Extensions**
6. Enable the extension in Safari:
   - Open Safari → Settings (⌘+,)
   - Go to Extensions tab
   - **If you don't see the extension**: Click "Quit and Open Safari Settings..." in the app window
   - Check the box next to "YouTube Shorts Blocker"
   - Grant permissions for youtube.com when prompted

### Method 2: Manual Safari Extension Installation

1. Open Safari and enable Developer mode:
   - Safari → Settings → Advanced → Show features for web developers
2. Go to Safari → Settings → Extensions
3. Allow unsigned extensions (in Developer menu)
4. Load the extension folder directly

### Method 3: Convert for Other Browsers

This extension uses Manifest V3 and can be easily loaded in Chrome, Edge, or Firefox:

**Chrome/Edge:**
1. Go to `chrome://extensions` or `edge://extensions`
2. Enable Developer mode
3. Click "Load unpacked" and select the `youtube-shorts-blocker` folder

**Firefox:**
1. Go to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file

## How It Works

The extension uses multiple approaches to block Shorts:

1. **Content Script**: Continuously monitors and removes Shorts elements from the DOM
2. **Background Script**: Intercepts navigation to Shorts URLs and redirects to homepage
3. **Declarative Net Request**: Uses rule-based URL blocking for faster response

## Troubleshooting

- **Extension not showing in Safari?**
  - Make sure you selected "macOS" target in Xcode, not iOS
  - Enable "Allow Unsigned Extensions" in Safari Develop menu
  - The app must be running - look for it in the Dock
  - Click "Quit and Open Safari Settings..." button if you see it
- **Build failed in Xcode?**
  - Ensure "My Mac" is selected as target device (not iOS Simulator)
  - Signing is optional for local use - you can skip it
  - Icons are optional - warnings about missing icons are safe to ignore
- If Shorts still appear, try refreshing the YouTube page
- Make sure the extension has permission to run on youtube.com
- Check Safari Console for any error messages (Developer → Show Page Source → Console)

## Privacy

This extension:
- Does not collect any user data
- Only runs on YouTube domains
- Does not make external network requests
- All blocking happens locally in your browser

## License

MIT License - Feel free to modify and distribute as needed.