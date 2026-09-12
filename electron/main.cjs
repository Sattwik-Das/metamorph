const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    transparent: true,
    hasShadow: true,
    titleBarStyle: 'hiddenInset', // Makes it look like a native Mac app
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

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
