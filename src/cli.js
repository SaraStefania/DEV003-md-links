#!/usr/bin/env node

const {mdLinks} = require('./index');
const { totalLinks, totalUnique, totalbroken } = require('./cli-functions');
const colors = require('colors');

// es un arreglo que contiene los argumentos de linea de comando.
const path = process.argv[2];
const options = {
  help: process.argv.includes('--help'),
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats')
};

if(options.help){
  console.log('\n---------------------------------------')
  console.log('"mdLinks"'.bgYellow ,'es una libreria que te permite verificar el estado de los enlaces de los archivos Markdown.')
  console.log('---------------------------------------')
  console.log(`\n${'·'.grey} A continuación te mostraré los pasos a seguir y los comandos que debes usar.`.bgBlack)
  console.log(`\n${'1.'.grey}   Ingresa la ruta de tu archivo o directorio que deseas analizar`)
  console.log(`\n${'2.'.grey}   Después de esto, ingresa una de las siguientes opciones:\n`)
  console.log('---------------------------------------')
  console.log('--validate'.green, ':', 'Obtendrás el estado de los enlaces de tus archivos') 
  console.log('---------------------------------------')
  console.log('--stats'.green, ':', 'Obtendrás las estadísticas del total de enlaces y los enlaces únicos')
  console.log('---------------------------------------')
  console.log('--validate --stats'.green, ':', 'Obtendrás las estadísticas de los enlaces rotos')
  console.log('---------------------------------------')
}



mdLinks(path, options)
  .then((result) => {
    if (options.validate && options.stats) {
      const unique = result.flat();
      const brokenLinks = result.flat().filter(link => link.ok !== 'OK');
      console.log('---------------------------------------')
      console.log(`Total: ${totalLinks(result)}`.green);
      console.log(`Unique: ${totalUnique(unique)}`.green);
      console.log('---------------------------------------')
      console.log(`Broken: ${totalbroken(brokenLinks)}`.red);
      console.log('---------------------------------------')
    } else if(options.validate){
      result.flat().forEach(links => {
        console.log('---------------------------------------')
        console.log( 'Text:'.cyan ,links.text);
         console.log('Href:'.cyan ,links.href);
         console.log('File:'.cyan ,links.file);
         console.log('Status:'.bgYellow ,links.status);
         console.log('Message:'.bgBlack ,(links.ok === 'OK'? links.ok.green  : links.message.red))
         console.log('---------------------------------------')

      });
    }
    else if(options.stats){
      console.log('---------------------------------------')
      console.log(`Total: ${totalLinks(result)}`.green);
      console.log(`Unique: ${totalUnique(result)}`.green);
      console.log('---------------------------------------')
    }else{
      result.flat().forEach(links => {
        console.log('---------------------------------------')
      console.log( 'Text:'.cyan ,links.text);
      console.log('Href:'.cyan ,links.href);
      console.log('File:'.cyan ,links.file);
      console.log('---------------------------------------')
      })
    }
  })
  .catch((error) => {
    console.error(error);
  });
