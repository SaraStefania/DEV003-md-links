const { rutaValida} = require('./validation')
// const fs = require('fs');
// //  se incluye modulo de ruta
// const path = require('path')

// // crear funcion que acepte dos argumentos
 const mdLinks = (path, options) => {
//  retorna una nueva promesa
 return new Promise((resolve, reject) => {
    if(path === true){
        console.log(rutaValida)
    }
 })
 }

module.exports = mdLinks