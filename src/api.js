//--------------permite interactuar con los archivos del sistema-----------------
const fs = require('fs');
// -------------se incluye modulo de ruta---------------
const path = require('path');

const absoluta = '/Users/jessira/Desktop/DEV003-md-links/README.md'
const directorios  = '/Users/jessira/Desktop/DEV003-md-links'
const relativa = './README.md'
const falsa = '/rutaFalsa'
const directorios2 = '/Users/jessira/Desktop/pruebas/red social'

//----------------Validar si la ruta existe-------------
const rutaValida = (router) => {
    return fs.existsSync(router)
}

//-------------verificar si la ruta es absoluta--------------
const absolutePath = (router) => {
    return path.isAbsolute(router)  
}

//----------------pasar la ruta relativa a absoluta---------------
const convertAbsolute = (router) => {
   return path.resolve(router)
}
//-----------------validar si es un directorio---------------
const directorio = (router, arrayOfFiles = []) => {
  //leyendo el contenido de la ruta
  //devuelve una matriz de nombres de archivo y directorio
    const files = fs.readdirSync(router)
    files.forEach(file => {
        // para obtener información sobre él y determinar si es un archivo o un directorio.
      const stat = fs.statSync(`${router}/${file}`)
      if (stat.isDirectory()) {
        directorio(`${router}/${file}`, arrayOfFiles)
      } else {
        arrayOfFiles.push(`${router}/${file}`)
      }
    })
    return arrayOfFiles
  }
  
  console.log(directorio(directorios))


//------------------Validar si hay archivos .md y traerlos------------------
const filesMd = (router) => {
const filesArray = directorio(router);
filesArray.forEach(file =>{
    const stat = fs.statSync(file);
    if(stat.isDirectory()){
        filesMd(file)
    }else if(path.extname(file) === '.md'){
        console.log(file)
    }
})
}
filesMd(directorios)


//------------------exportar-------------------------
module.exports = () => {
rutaValida,
absolutePath,
convertAbsolute,
directorio, 
filesMd
}