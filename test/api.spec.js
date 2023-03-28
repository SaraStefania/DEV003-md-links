
const { routerValidate, absolutePath, convertAbsolute, validateFile, directorio, extractLinks, filesMd, readFile}  = require('../src/api');
const absoluta = '/Users/jessira/Desktop/DEV003-md-links/README.md'
const directorios  = '/Users/jessira/Desktop/DEV003-md-links'
const relativa = './README.md'

//-----------------Validar si la ruta existe------------------
describe('routerValidate', () => {
  it('Deberia indicar si la ruta es valida', () => {
   expect(routerValidate(absoluta)).toEqual(true)
  });
});

//-------------------Verificar si es una ruta absoluta------------------
describe('absolutePath', () =>{
  it('verifica si la ruta es absoluta', () =>{
    expect(absolutePath(absoluta)).toEqual(true)
  })
})

//--------------Convertir ruta relativa en absoluta------------------
describe('convertAbsolute', () =>{
  it('Deberia retonar la ruta absoluta', () =>{
    expect(convertAbsolute(relativa)).toEqual(absoluta)
  })
})

//----------------Validar si es un archivo--------------
describe('validateFile', () =>{
  it('Deberia mostrar en un mensaje si es un archivo', () =>{
    expect(validateFile(absoluta)).toEqual('Es un archivo')
  })
  
  it('Deberia mostrar en un mensaje si no es un archivo', () =>{
    expect(validateFile(directorios)).toEqual('No es un archivo')
  })
})

//--------------------------Validar si es un Directorio-------------------------
describe('directorio', () =>{
  it('Deberia devolver un array con nombre del archivo y directorio', () =>{
    const arrayOfFiles = directorio(directorios)
    expect(Array.isArray(arrayOfFiles)).toEqual(true)
  })
}) 

//--------------------------Traer href, text y file-------------------------
describe('extractLinks', () => {
  it('Deberia retonar un array con text, href y files', () => {
    return extractLinks(absoluta)
      .then((links) => {
        expect(Array.isArray(links)).toBe(true);
        expect(links[0]).toEqual({
          text: 'Markdown',
          href: 'https://es.wikipedia.org/wiki/Markdown',
          file: '/Users/jessira/Desktop/DEV003-md-links/README.md'
        });
      });
  });
  it('arrayOfFiles deberia ser un array ', () =>{
    const arrayOfFiles = directorio(directorios);
   expect(Array.isArray(arrayOfFiles)).toBe(true);
 });
 it('Deberia mostrar un error si no se puede leer el contenido', () =>{
   const result = extractLinks(absoluta+"a")
   //se espera que devuelva un error que sea igual al error original
   return expect(result).rejects.toEqual('No se pudo leer uno o más archivos')
  })
  
})

describe('filesMd', () =>{
  it('Deberia validar si es un archivo Markdown', () =>{
    expect(filesMd(absoluta)).toEqual(true)
  })
  it('Deberia validar si no es un archivo Markdown', () =>{
    expect(filesMd('/Users/jessira/Desktop/DEV003-md-links/package.json')).toEqual(false)
  })
  it('Deberia validar si hay archivos .md en un directorio', () =>{
    expect(filesMd(directorios)).toEqual(true)
  })
})