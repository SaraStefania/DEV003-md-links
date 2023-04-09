const { routerValidate, absolutePath, convertAbsolute, validateFile, directorio, extractLinks, filesMd, getStatus}  = require('../src/api');
const absoluta = '/Users/jessira/Desktop/DEV003-md-links/prueba/prueba.md'
const directorios  = '/Users/jessira/Desktop/DEV003-md-links/prueba'
const relativa = 'prueba/prueba.md'
const urls = 
[
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
    file: '/Users/jessira/Desktop/DEV003-md-links/README.md'
  }
]

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
  it('Deberia retonar un array con text, href y files de un archivo', () => {
    return extractLinks(absoluta)
      .then((links) => {
        expect(Array.isArray(links)).toBe(true);
        //primer elemento del arreglo
        expect(links[0]).toEqual({
          text: 'Markdown',
          href: 'https://es.wikipedia.org/wiki/Markdown',
          file: '/Users/jessira/Desktop/DEV003-md-links/prueba/prueba.md'
        });
        
      });
  });
})
it('Deberia retornar un error si no se pudo leer los archivos', () =>{
  const result  = extractLinks('./noexiste')
   //se espera que devuelva un error que sea igual al error original
   return expect(result).rejects.toEqual('No se pudo leer uno o más archivos')
})

//----------------------- Validar archivos Markdown-------------------------
describe('filesMd', () =>{
  it('Deberia retornar true si contiene archivos Markdown', () =>{
    expect(filesMd(absoluta)).toEqual(true)
  })
  it('Deberia retornar false si no contiene archivos Markdown', () =>{
    expect(filesMd('./sinArchivos.js')).toEqual(false)
  })
})

//-------------------- Status--------------------------

describe('getStatus', () => {
  it('Se crea un arreglo con el HTTP y el manejo de estado', () => {
    return getStatus(urls)
      .then((links) => {
        expect(Array.isArray(links)).toBe(true);
        expect(links.length).toBe(3);
        expect(links[0]).toEqual([
          {
            text: 'Markdown',
            href: 'https://es.wikipedia.org/wiki/Markdow',
            file: '/Users/jessira/Desktop/DEV003-md-links/README.md',
            status: 404,
            message: 'fail'
          }
        ]);
        expect(links[1]).toEqual([
          {
            text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
            href: 'http://community.l-paquetes-frameworks-cual-es-la-diferencia/175',
            file: '/Users/jessira/Desktop/DEV003-md-links/README.md',
            status: 500,
            message: 'fail'
          }
        ]);
        expect(links[2]).toEqual([
          {
            
    text: 'Funciones clásicas',
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/01-classic',
    file: '/Users/jessira/Desktop/DEV003-md-links/README.md',
            status: 200,
            ok: 'OK'
          }
        ]);
      });
  });
});

