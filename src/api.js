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
const rutaValida = (router) => fs.existsSync(router)

//-------------verificar si la ruta es absoluta--------------
const absolutePath = (router) => path.isAbsolute(router)  


//----------------pasar la ruta relativa a absoluta---------------
const convertAbsolute = (router) => path.resolve(router)

//-----------------Validar si es un archivo---------------
const validateFile = (router) =>{
  //se utiliza para obtener información sobre el archivo en la ruta
  const stats = fs.statSync(router)
  if(stats.isFile()){
    console.log('Es un archivo')
  }else{
    console.log('No es un archivo')
  }
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


//------------------Traer links---------------------
const extractLinks = (router) => {
  fs.readFile(router, 'utf8', (err, data) => {
    if (err) {
      console.error('Error:', err)
      return
    }
//devuelve todas las ocurrencias de una expresión regular
const links = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
let linksData = []
//se utiliza para almacenar el resultado de la expresion regular 
    let match
    while ((match = links.exec(data)) !== null) {
      const text = match[1]
      const href = match[2]
      const file = router
      linksData.push({text, href, file});
    }
    console.log(linksData)
  })
}
extractLinks(absoluta)


//------------------Validar si hay archivos .md y traerlos------------------
const filesMd = (router) => {
  //se utiliza para obtener información sobre el archivo en la ruta
  const stat = fs.statSync(router);
  if (stat.isDirectory()) {
    const filesArray = directorio(router);
    filesArray.forEach((file) => {
      filesMd(file);
    });
  } else if (path.extname(router) === ".md") {
    extractLinks(router);
  } else {
    console.log(`${router} no es un archivo Markdown válido.`);
  }
};
filesMd(absoluta)


//------------------exportar-------------------------
module.exports = {
rutaValida,
absolutePath,
convertAbsolute,
validateFile,
directorio
//filesMd
}
// module.exports = rutaValida