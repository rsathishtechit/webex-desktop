import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipc: {
    send(name, payload) {
      console.log(name, payload);
      ipcRenderer.send(name, payload);
    },
    receive: (name, func) => {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(name, (_, code) => func(code));
    },
  },
  batteryApi: {},
  fileApi: {},
});
