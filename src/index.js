const { routerValidate,
     absolutePath,
    convertAbsolute,
    validateFile,
    directorio } = require('./api')
// const fs = require('fs');
// //  se incluye modulo de ruta
// const path = require('path')

const absoluta = '/Users/jessira/Desktop/DEV003-md-links/README.md'
const directorios  = '/Users/jessira/Desktop/DEV003-md-links'
const relativa = './README.md'
const falsa = '/rutaFalsa'

// // crear funcion que acepte dos argumentos
 const mdLinks = (path, options) => {
//  retorna una nueva promesa
 return new Promise((resolve, reject) => {
if(routerValidate(path)){
    console.log('Es valida')
}if(absolutePath(path)){
console.log('La ruta es absoluta')
}if(convertAbsolute(path)){
    console.log('Se convirtio la ruta a absoluta')
}if(validateFile(path)){
    console.log('Es un archivo')
}if(directorio(path)){
    console.log('Es un directorio ')
}
 })
 }
 console.log(mdLinks(directorios))

module.exports = mdLinks