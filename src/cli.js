#!/usr/bin/env node

const {mdLinks} = require('./index');
const { totalLinks, totalUnique, totalbroken } = require('./cli-functions');
const colors = require('colors');

// es un arreglo que contiene los argumentos de linea de comando.
const path = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats')
};



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
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });
