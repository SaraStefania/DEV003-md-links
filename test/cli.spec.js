const { totalLinks, totalUnique, totalbroken} = require('../src/cli-functions')

const urls = [
    {
        text: 'Markdown',
        href: 'https://es.wikipedia.org/wiki/Markdow',
        file: '/Users/jessira/Desktop/DEV003-md-links/README.md',
        status: 404,
        message: 'fail'
      },
      {
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
        href: 'http://community.l-paquetes-frameworks-cual-es-la-diferencia/175',
        file: '/Users/jessira/Desktop/DEV003-md-links/README.md',
        status: 500,
        message: 'fail'
      },
      {
            
        text: 'Funciones clásicas',
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/01-classic',
        file: '/Users/jessira/Desktop/DEV003-md-links/README.md',
        status: 200,
        ok: 'OK'
              }
  ]


//----------------Total Links----------------
describe('totalLinks', () =>{
    it('Deberia retornar un arreglo con el total de links', () =>{
        expect(totalLinks(urls)).toEqual({total: 3})
    })
})

//------------------links unicos-----------------

describe('totalUnique', () =>{
    it('Deberia retornar un arreglo con el total de links', () =>{
        expect(totalUnique(urls)).toEqual({Unique: 3})
    })
    
})

//-------------------Links rotos-----------------
describe('totalBroken', () =>{
    it('Deberia retornar un arreglo con el total de links rotos', () =>{
        expect(totalbroken(urls)).toEqual({Broken: 2})
    })
})