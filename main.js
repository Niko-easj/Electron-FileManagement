const electron = require("electron");
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')

let win;

function createWindow () {  
  win = new BrowserWindow({
    width: 800, 
    height: 600,
      webPreferences: {
        //nodeIntergration var sat til false som standard?!
          nodeIntegration: true,
          contextIsolation: false,
      }

    /*
    //https://stackoverflow.com/questions/60814430/electron-builder-with-browserwindow-and-preload-js-unable-to-load-preload-scrip
    //Anbefaldes ikke at benytte remote grudnet sikkerhedsmessige årsager
    //https://nornagon.medium.com/electrons-remote-module-considered-harmful-70d69500f31
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true, //this must be true
      //preload: path.join(__dirname, 'index.js')
    }
    */
  })  

  //https://www.electronjs.org/docs/api/browser-window
  //søg på "format" på siden og scroll ned i bunden af resultaterne
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    //pathname: path.join(__dirname, 'index.js'),
    protocol: 'file:',
    slashes: true
  }));
  
  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow);

/*
app.on('ready', function(){
  createWindow()

  const template = [
    {
      label: 'demo'
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
});
*/

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});






// Old configuration that came with the project creation
/*
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {

      //SKAL ÆNDRES TIL index.html
      preload: path.join(__dirname, 'index.html')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
*/