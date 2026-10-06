const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron"); 
const path = require("path"); 
 
// Database functions 
const database = require("./database"); 
const { once } = require("events");
 
let mainWindow; 
 
function createWindow() { 
 
    mainWindow = new BrowserWindow({ 
        width: 1280, 
        height: 820, 
        minWidth: 1000, 
        minHeight: 700, 
        title: "Improve", 
 
        webPreferences: { 
            preload: path.join(__dirname, "preload.js"), 
            contextIsolation: true, 
            nodeIntegration: false,

        } 
    }); 

    
 
    mainWindow.loadFile( 
        path.join(__dirname, "renderer", "index.html") 
    ); 
   

    
 
    
} 
 
// ============================ 
// App Events 
// ============================ 
 
app.whenReady().then(() => { 

    Menu.setApplicationMenu(null);
 
    createWindow(); 
 
    app.on("activate", () => { 
 
        if (BrowserWindow.getAllWindows().length === 0) { 
            createWindow(); 
        } 
 
    }); 
 
}); 
 
app.on("window-all-closed", () => { 
 
    if (process.platform !== "darwin") { 
        app.quit(); 
    } 
 
}); 
 
// ============================ 
// IPC HANDLERS 
// ============================ 
 
// Save a day 
ipcMain.handle("save-day", async (event, date, data) => { 
 
    return database.saveDay(date, data); 
 
}); 
 
// Load a day 
ipcMain.handle("load-day", async (event, date) => { 
 
    return database.loadDay(date); 
 
}); 



 
// Get all saved dates 
ipcMain.handle("get-saved-dates", async () => { 
 
    return database.getSavedDates(); 
 
}); 
 
// Delete a day's data 
ipcMain.handle("delete-day", async (event, date) => { 
 
    return database.deleteDay(date); 
 
}); 
 
// App version 
//ipcMain.handle("get-version", () => { 
 
    //return app.getVersion(); }); 



// ============================ 
// File Dialogs 
// ============================ 
 
// Open File 
ipcMain.handle("open-file-dialog", async () => { 
 
    const result = await dialog.showOpenDialog({ 
 
        properties: ["openFile"], 
 
        filters: [ 
 
            { 
                name: "Database", 
                extensions: ["db"] 
            } 
 
        ] 
 
    }); 
 
    return result; 
 
}); 
 
// Save File 
ipcMain.handle("save-file-dialog", async () => { 
 
    const result = await dialog.showSaveDialog({ 
 
        defaultPath: "routine-backup.db", 
 
        filters: [ 
 
            { 
                name: "Database", 
                extensions: ["db"] 
            } 
 
        ] 
 
    }); 
 
    return result; 
 
}); 
 
// Export Database 
ipcMain.handle("export-database", async () => { 
 
    return database.exportDatabase(); 
 
}); 
 
// Import Database 
ipcMain.handle("import-database", async () => { 
 
    return database.importDatabase(); 
 
}); 