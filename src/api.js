const axios = require('axios').default;

//--------------permite interactuar con los archivos del sistema-----------------
const fs = require('fs');
// -------------se incluye modulo de ruta---------------
const path = require('path');
const urls = [
  {
    text: 'Markdown',
    href: 'https://es.wikipedia.org/wiki/Markdow',
    file: '/Users/jessira/Desktop/DEV003-md-links/README.md'
  },
  {
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    href: 'http://community.l-paquetes-frameworks-cual-es-la-diferencia/175',
    file: '/Users/jessira/Desktop/DEV003-md-links/README.md'
  },
  {
    text: 'Funciones clásicas',
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/01-classic',
    file: '/Users/jessira/Desktop/DEV003-md-links/README.md',
    code: 'ENOTFOUND',
    message: 'fail'
  }
]
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
  

//------------------Validar si hay archivos .md y traerlos------------------
const filesMd = (router) => {
  if (path.extname(router) === ".md") {
  return true
  }else{
    return false
  }

};


//------------------Traer text, href, file---------------------
// 
const extractLinks = (router) => {
  return new Promise((resolve, reject) => {
    fs.readFile(router, 'utf8', (err, data) => {
      if(err){
        reject('No se pudo leer uno o más archivos')
      }
      const links = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
      let linksData = []
      let match
      while ((match = links.exec(data)) !== null) {
        const text = match[1]
        const href = match[2]
        const file = router
        linksData.push({text, href, file,});
      }
      resolve(linksData)
    })
  })
}






//-------------------Hallar el status--------------------

const getStatus = (link) =>
  Promise.all(
    link.map((element) =>
      axios.get(element.href)
        .then((res) => ([{
          file: element.file,
          href: element.href,
          text: element.text,
          status: res.status,
          ok: res.statusText,
        }]))
        .catch((error) => {
        //almacenar el código de estado del error
          let errorStatus;
        
         // si error.response existe
          if (error.response) {
      // La respuesta fue hecha y el servidor respondió con un código de estado
      // que esta fuera del rango de 2xx
            errorStatus = error.response.status;
        // La petición fue hecha pero no se recibió respuesta
          } else if (error.request) {
            //e asigna un código de estado de 500 a errorStatus
            errorStatus = 500;
          } else {
            // Algo paso al preparar la petición que lanzo un Error y
            //se asigna un código de estado de 400 a errorStatus
            errorStatus = 400;
          }
          //Se devuelve un objeto con la información del enlace que no se pudo procesar
          return [{
            text: element.text,
            href: element.href,
            file: element.file,
            status: errorStatus,
            message: 'fail'
          }];
  })  
    )
  );

  


//------------------exportar-------------------------
module.exports = {
routerValidate,
absolutePath,
convertAbsolute,
validateFile,
directorio,
extractLinks, 
filesMd, 
getStatus
}