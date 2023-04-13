
const { routerValidate, convertAbsolute, validateFile,  extractLinks, filesMd, getStatus, directorio } = require('./api');


const mdLinks = (path, options) => {
  const absoluteRouter = convertAbsolute(path);

  return new Promise((resolve, reject) => {
    if (!routerValidate(absoluteRouter)) {
      reject('La ruta no existe');
    }

    if (validateFile(absoluteRouter) === 'No es un archivo') {
      const files = directorio(absoluteRouter);
      //se filtran los archivos que tienen extensión .md
      const mdFiles = files.filter(filesMd);
      //Se crea un array de promesas con la función extractLinks
      const promises = mdFiles.map(file => extractLinks(file));
      // para esperar a que todas las promesas del paso anterior se resuelvan
      Promise.all(promises)
        .then(links => {
          //se crea un solo array con todos los links extraídos,
          const flatLinks = links.flat();
          if (options.validate) {
            getStatus(flatLinks).then(statusLinks => resolve(statusLinks));
          } else {
            resolve(flatLinks);
          }
        })
        .catch(err => reject(err));
        //si es un archivo
    } else {
      extractLinks(absoluteRouter)
        .then(links => {
          if (options.validate) {
            getStatus(links).then(statusLinks => resolve(statusLinks));
          } else {
            resolve(links);
          }
        })
        .catch(err => reject(err));
    }
  });
};

  
// mdLinks('/Users/jessira/Desktop/DEV003-md-links/README.md', {validate: true})
//   .then((linksData) => console.log(linksData))
//   .catch((error) => console.log(error));

module.exports ={
  mdLinks
} 
