import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipc: {
    send(payload) {
      ipcRenderer.send("AUTH", payload);
    },
    receive: (func) => {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on("CODE", (event, code) => func(code));
    },
  },
  batteryApi: {},
  fileApi: {},
});
