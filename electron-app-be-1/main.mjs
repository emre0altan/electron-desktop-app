import { app, BrowserWindow } from 'electron';
import { createWindow } from './handler_window.mjs';

import pkg from './handler_express.cjs';
const { expressServer, expressPort} = pkg;

let mainWindow;

app.on('ready', () => {
    mainWindow = createWindow(expressServer, expressPort);

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) mainWindow = createWindow(expressServer, expressPort);
    })

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit();
    });
});
