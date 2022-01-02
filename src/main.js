const { app, BrowserWindow, ipcMain, session } = require("electron");
const path = require("path");
const os = require("os");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// on macOS
const reactDevToolsPath = path.join(
  os.homedir(),
  "Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.22.0_0"
);

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

app.whenReady().then(async () => {
  await session.defaultSession.loadExtension(reactDevToolsPath);
});

ipcMain.on("AUTH", (event, { client, secret, redirect, scope, state }) => {
  const webExLogin = new BrowserWindow({
    height: 600,
    width: 800,
    modal: true,
  });
  webExLogin.loadURL(
    `https://webexapis.com/v1/authorize?response_type=code&client_id=${client}&redirect_uri=${redirect}&scope=${scope}&state=${state}`
  );
  webExLogin.show();
  function handleCallback(url) {
    console.log(url);
    let code, error;
    const current = new URL(url);
    code = current.searchParams.has("code")
      ? current.searchParams.get("code")
      : false;
    error = current.searchParams.has("error")
      ? current.searchParams.get("error")
      : false;
    console.log(error);
    if (code || error) {
      // Close the browser if code found or error
      if (code) {
        event.sender.send("CODE", {
          client,
          secret,
          scope,
          state,
          code,
          redirect,
        });
      }

      webExLogin.destroy();
    }
  }

  // Handle the response from GitHub - See Update from 4/12/2015

  webExLogin.webContents.on("did-navigate", function (event, url) {
    handleCallback(url);
  });

  webExLogin.webContents.on(
    "did-get-redirect-request",
    function (event, oldUrl, newUrl) {
      handleCallback(oldUrl);
    }
  );
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
