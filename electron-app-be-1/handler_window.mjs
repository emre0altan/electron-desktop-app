import { BrowserWindow } from 'electron';
import { add_ipc_main_listeners } from './handler_ipc_listener.mjs'
import { getKey, keyUserData } from './handler_storing.cjs';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let expressServer;

function add_window_events(){
    mainWindow.on('closed', function () {
        mainWindow = null;
        expressServer.close();
    });

    mainWindow.webContents.on('did-finish-load', ()=>{
        userData = getKey(keyUserData);
        if(userData != undefined){
            mainWindow.webContents.send('update-name', userData['_json']);
        }
    })
}

function createWindow(express_server, expressPort) {
    expressServer = express_server
    mainWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            nodeIntegration: true
        }
    });

    add_ipc_main_listeners(mainWindow);
    mainWindow.maximize();
    mainWindow.loadURL(`http://localhost:${expressPort}`)
        .then(() => { 
            mainWindow.show(); 
        });

    add_window_events();

    return mainWindow;
}

export {
    createWindow,
};
