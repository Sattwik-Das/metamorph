const { app, BrowserWindow, screen, globalShortcut, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let overlayWindow;

function createOverlayWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  overlayWindow = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  // Make it completely click-through so it doesn't block the user's OS
  overlayWindow.setIgnoreMouseEvents(true, { forward: true });

  // Optional: on macOS, you might want it to display on all workspaces
  if (process.platform === 'darwin') {
    overlayWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  }

  const isDev = !app.isPackaged && process.env.NODE_ENV === 'development';
  if (isDev) {
    // Navigate to a specific route for the overlay UI
    overlayWindow.loadURL('http://localhost:5174/overlay');
  } else {
    // In production, you'd load the file with a hash route, e.g., index.html#/overlay
    overlayWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}#/overlay`);
  }
}

function createWindow() {
  const isMac = process.platform === 'darwin';

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    transparent: isMac,
    hasShadow: true,
    ...(isMac ? { titleBarStyle: 'hiddenInset' } : { autoHideMenuBar: true }),
    icon: path.join(__dirname, '../public/clickit_app_logo_rounded.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (process.platform === 'darwin') {
    app.dock.setIcon(path.join(__dirname, '../public/clickit_app_logo_rounded.png'));
  }

  const isDev = !app.isPackaged && process.env.NODE_ENV === 'development';

  if (isDev) {
    mainWindow.loadURL('http://localhost:5174');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.setName('Clickit');

app.whenReady().then(() => {
  createWindow();
  createOverlayWindow();

  // Register Global Push-to-Talk Hotkey (Ctrl+Space or Cmd+Space)
  globalShortcut.register('CommandOrControl+Space', () => {
    // Tell the overlay window to start listening/recording
    if (overlayWindow) {
      overlayWindow.webContents.send('ptt-start');
    }
  });

  // Since it's push-to-talk, we want to know when it's released, 
  // but globalShortcut doesn't support 'keyup' directly in Electron.
  // As a workaround, we'll expose an IPC for the overlay to manage state, 
  // or use a toggle approach if needed.

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      createOverlayWindow();
    }
  });
});

app.on('will-quit', () => {
  // Unregister all shortcuts when quitting
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
