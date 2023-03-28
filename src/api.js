const axios = require('axios')
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
const routerValidate = (router) => fs.existsSync(router)

//-------------verificar si la ruta es absoluta--------------
const absolutePath = (router) => path.isAbsolute(router)  


//----------------pasar la ruta relativa a absoluta---------------
const convertAbsolute = (router) => path.resolve(router)

//-----------------Validar si es un archivo---------------
const validateFile = (router) =>{
  //se utiliza para obtener información sobre el archivo en la ruta
  const stats = fs.statSync(router)
  if(stats.isFile()){
    return 'Es un archivo'
  }else{
    return 'No es un archivo'
  }
}
console.log(validateFile(directorios))




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
  
  // Se crea un método "readFile" para envolver el fs.readFile en una promesa.
  const readFile = (file)=> {
    return new Promise ((resolve, reject)=> {
      fs.readFile(file, 'utf8', (err, data) =>{
        if (err) {
          reject(new Error('No se pudo leer archivo'));
        }

        resolve(data )
      })
    })
  }



//------------------Traer text, href, file---------------------
const extractLinks = (router) =>{
  return new Promise((resolve, reject) =>{
    let arrayOfFiles = [];
    // Usamos try/catch para controlar cualquier error que surja mientras se leen/validan los archivos a procesar
    try {
      //obtiene la información, si es un directorio 
      if (fs.statSync(router).isDirectory()) {
        //se obtienen todos los archivos y se guarda en un array 
        arrayOfFiles = directorio(router);
      } else {
        // Si la ruta es un archivo, se agrega al array directamente
        arrayOfFiles.push(router);
      }
      
      //Se utiliza un .map para crear un array de promesas, una por cada archivo a leer
      const filesData = arrayOfFiles.map((file)=> readFile(file));

      // Se utiliza Promise.all para esperar a que todas las promesas del array filesData se resuelvan
      Promise.all(filesData).then((files)=>{
        const linksData=[];
        const links = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        files.forEach((file)=>{
          let match;
          while ((match = links.exec(file)) !== null) {
            const text = match[1];
            const href = match[2];
            const file = router;
            linksData.push({text, href, file});
          }
        })
        resolve(linksData);
      })

    } catch(err) {
      //Se rechaza la promesa si algo sale mal durante el proceso.
      reject('No se pudo leer uno o más archivos');
    }
  });
};

//se llama a la función extractLinks con la ruta del directorio
extractLinks(absoluta)
  .then((linksData) => {
    console.log(linksData);
  })
  .catch((error) => {
    console.error(error);
  });




//------------------Validar si hay archivos .md y traerlos------------------
const filesMd = (router) => {
  //se utiliza para obtener información sobre el archivo en la ruta
  const stat = fs.statSync(router);
   //variable booleana
   let hayArchivosMd = false;
  if (stat.isDirectory()) {
    const filesArray = directorio(router);
    filesArray.forEach((file) => {
     if(filesMd(file)){
      hayArchivosMd = true
     }
    });
  } else if (path.extname(router) === ".md") {
  hayArchivosMd = true
  }else{
    hayArchivosMd = false
  }
  return hayArchivosMd
};
console.log(filesMd(absoluta))


//------------------exportar-------------------------
module.exports = {
routerValidate,
absolutePath,
convertAbsolute,
validateFile,
directorio,
extractLinks, 
filesMd, 
readFile
}