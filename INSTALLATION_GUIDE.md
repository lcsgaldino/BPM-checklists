# Installation Guide - Renewal Checklist Tool

## Quick Start (Easiest Method)

### For Windows Users:
1. Navigate to the `renewal-checklist-app` folder
2. Double-click `run-app.bat`
3. The application will open in your default web browser

### For All Users:
1. Navigate to the `renewal-checklist-app` folder
2. Double-click `index.html`
3. The application will open in your default web browser

**That's it! No installation required for basic usage.**

---

## Advanced: Building as Standalone Executable

If you want to create a standalone desktop application that doesn't require a browser:

### Prerequisites
1. **Install Node.js:**
   - Download from: https://nodejs.org/
   - Choose LTS (Long Term Support) version
   - Run the installer and follow the prompts
   - Verify installation by opening Command Prompt/Terminal and typing:
     ```
     node --version
     npm --version
     ```

### Building the Executable

1. **Open Command Prompt/Terminal**
   - Windows: Press `Win + R`, type `cmd`, press Enter
   - Mac: Press `Cmd + Space`, type `terminal`, press Enter
   - Linux: Press `Ctrl + Alt + T`

2. **Navigate to the app folder:**
   ```bash
   cd path/to/renewal-checklist-app
   ```
   Example for Windows:
   ```bash
   cd C:\Users\YourName\Desktop\renewal-checklist-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   This will download all required packages (may take a few minutes).

4. **Build the executable:**

   **For Windows:**
   ```bash
   npm run build-win
   ```
   
   **For macOS:**
   ```bash
   npm run build-mac
   ```
   
   **For Linux:**
   ```bash
   npm run build-linux
   ```

5. **Find your executable:**
   - After building, look in the `dist` folder
   - Windows: `dist/Renewal Checklist Tool Setup.exe` or `dist/Renewal Checklist Tool.exe`
   - macOS: `dist/Renewal Checklist Tool.dmg`
   - Linux: `dist/Renewal Checklist Tool.AppImage` or `.deb` file

6. **Install/Run:**
   - Windows: Run the setup.exe or portable .exe file
   - macOS: Open the .dmg file and drag to Applications
   - Linux: Make AppImage executable and run, or install .deb package

### Testing During Development

To test the app before building:
```bash
npm start
```
This opens the app in Electron (desktop mode) without creating an executable.

---

## Troubleshooting

### "npm is not recognized" error
- Node.js is not installed or not in PATH
- Solution: Install Node.js from https://nodejs.org/

### Build fails with permission errors
- Windows: Run Command Prompt as Administrator
- Mac/Linux: Use `sudo npm run build-mac` (or build-linux)

### Application won't open in browser
- Try a different browser (Chrome, Firefox, Edge)
- Check if JavaScript is enabled in browser settings
- Right-click index.html → Open with → Choose your browser

### Electron build is very large
- This is normal. Electron bundles a Chromium browser with the app
- Typical size: 100-150 MB
- For smaller distribution, use the web version (just the HTML/CSS/JS files)

---

## Distribution Options

### Option 1: Web Version (Smallest)
Share these files only:
- index.html
- styles.css
- script.js
- run-app.bat (optional, for Windows users)

**Size:** ~50 KB
**Pros:** Tiny, works on any OS with a browser
**Cons:** Requires a web browser

### Option 2: Electron Executable (Standalone)
Share the built executable from the `dist` folder

**Size:** ~100-150 MB
**Pros:** Standalone app, professional look, no browser needed
**Cons:** Larger file size, separate builds for each OS

---

## System Requirements

### Web Version:
- Any modern web browser (Chrome, Firefox, Edge, Safari)
- No other requirements

### Electron Version:
- **Windows:** Windows 7 or later
- **macOS:** macOS 10.11 or later
- **Linux:** Ubuntu 18.04 or later (or equivalent)
- **RAM:** 512 MB minimum
- **Disk Space:** 200 MB

---

## Support

For issues or questions:
1. Check the README.md file
2. Verify all files are present in the folder
3. Try the web version first (index.html)
4. Contact your IT support team

---

## File Checklist

Ensure you have all these files:
- ✅ index.html
- ✅ styles.css
- ✅ script.js
- ✅ main.js
- ✅ package.json
- ✅ README.md
- ✅ INSTALLATION_GUIDE.md (this file)
- ✅ run-app.bat

Optional (for building executable):
- node_modules/ (created after `npm install`)
- dist/ (created after building)