import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send(channel, payload) {
      const validChannels = ["CODE", "AUTH"];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, payload);
      }
    },
    receive: (channel, func) => {
      const validChannels = ["CODE"];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (_, args) => func(args));
      }
    },
    batteryApi: {},
    fileApi: {},
  },
});
