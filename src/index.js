const { routerValidate, convertAbsolute, validateFile,  extractLinks, filesMd, getStatus } = require('./api');

  
const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        //convierte en absoluta
      const absoluteConvert = convertAbsolute(path);
      //valida si la ruta existe
      if (!routerValidate(absoluteConvert)) {
        reject('La ruta no existe');
      }
  //valida si es un archivo
      const checkFile = validateFile(absoluteConvert);
      //trae los archivos .md
      const isMdFile = filesMd(absoluteConvert);
  //si es un archivo y contiene archivos .md
      if (checkFile === 'Es un archivo' && isMdFile) {
        //extrae los links 
        extractLinks(absoluteConvert)
        //manejar los resultados de la promesa de extractLInks
          .then((links) => {
            //si la opcion es true 
            if (options && options.validate) {
            //se llama a la funcion getStatus
                resolve(getStatus(links))
              } else {
                //se resuelve la promesa con los links extraidos
                resolve(links);
              }
          })
          //si es un directorio y contiene archivos .md
      } else if (checkFile === 'No es un archivo' && isMdFile) {
        //extrae los links
        extractLinks(absoluteConvert)
          .then((links) => {
            //si la opcion es true 
            if (options && options.validate) {
                //se llama la funcion getStatus
                resolve(getStatus(links))
              } else {
                //se resuelve la promesa con los links extraidos
                resolve(links);
              }
          })
      } else {
        //se rechaza la promesa
        reject('No se encontraron archivos .md');
      }
    });
  };
  
// mdLinks('/Users/jessira/Desktop/DEV003-md-links/prueba', {validate: true})
//   .then((linksData) => console.log(linksData))
//   .catch((error) => console.log(error));

module.exports ={
  mdLinks
} 
