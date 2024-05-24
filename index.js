const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { connectToDatabase } = require('./db');
const Log = require('./models/log');
const mongoose = require('mongoose');


ipcMain.handle('connect-to-db', async (event, infoConn) => {
	return (connectToDatabase(infoConn));
	
});

ipcMain.handle('get-collections', async () => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  return collections;
});

ipcMain.handle('get-documents', async (event, { collectionName, query }) => {
  const collection = mongoose.connection.db.collection(collectionName);
  const documents = await collection.find(query).toArray();
  return documents;
});

ipcMain.handle('get-logs', async (event, { query }) => {
  try {
	const logs = query ? await Log.find(query).sort({ type: 1, method: 1 }).limit(100).exec() : await Log.find().sort({ timestamp: -1, type: 1, method: 1 }).limit(100).exec();
    	return logs;
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw error;
  }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

