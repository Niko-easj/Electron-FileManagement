//"fs" er en function der står for FileSystem, kan ses i bunden på denne side:
//https://www.electronjs.org/docs/tutorial/quick-start
//const { dialog } = require('electron').remote
const { dialog } = require('electron')
const fs = require('fs')
const path = require('path')

//I Electron skriver man ikke import, som i React eller Angular:
//import React, { Component } from 'react';

console.log("We are in the index.js!")

//Buttons
buttonCreate = document.getElementById('buttonCreate')
buttonRead = document.getElementById('buttonRead')
buttonDelete = document.getElementById('buttonDelete')

//Under construction
buttonClear = document.getElementById('buttonClear')

//For the file
fileName = document.getElementById('fileName')
fileBody = document.getElementById('fileBody')

//Her erklære jeg stien til filmappen hvor filerne oprettes
//https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname
//Det SKAL være to __ (understreger...)
let pathName = path.join(__dirname, 'Files')

//Handlers

//Opret fil
buttonCreate.addEventListener('click', function () {

    //Kommer fra min form i index.html
    //Man kan se det her som "get; set;" fra C#
    let file = path.join(pathName, fileName.value)
    let body = fileBody.value

    //Kan ses som en metode
    //Kik på "writeFile", som er en Electron function
    //err er en standard error rapport
    fs.writeFile(file, body, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("Filen er oprettet")
    })
})

//Læs fil
buttonRead.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value)
    //let body = fileBody.value

    //Nu med to parametre, da vi skal læse indholdet
    fs.readFile(file, function (err, content) {
        if (err) {
            return console.log(err)
        }
        //Hvis lykkedes bliver indholdet vist
        //"fileBody" er textboxen i HTML hvor man skriver/og læser filens indhold.
        fileBody.value = content
        console.log("Filen er læst")
    })
})

//Slet fil
buttonDelete.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value)

    if (window.confirm("Du er ved at slette en fil!")) {
        //Slette en fil ned Node.js
        //https://flaviocopes.com/how-to-remove-file-node/
        //unlink
        fs.unlink(file, function (err) {
            if (err) {
                return console.log(err)
            }
            fileName.value = ''
            fileBody.value = ''
            console.log("Filen er slettet")
        })
    }
})
