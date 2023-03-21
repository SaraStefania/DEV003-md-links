const { rutaValida, absolutePath, convertAbsolute, validateFile}  = require('../src/api');
const absoluta = '/Users/jessira/Desktop/DEV003-md-links/README.md'
const directorios  = '/Users/jessira/Desktop/DEV003-md-links'
const relativa = './README.md'
//-----------------Validar si la ruta existe------------------
describe('rutaValida ', () => {
  it('Deberia ser una función', () =>{
    expect(typeof rutaValida).toBe('function')
  })
  it('Deberia indicar si la ruta es valida', () => {
   expect(rutaValida(absoluta)).toEqual(true)
  });
});

//-------------------Verificar si es una ruta absoluta------------------
describe('absolutePath', () =>{
  it('Deberia ser una función', () =>{
    expect(typeof absolutePath).toBe('function')
  })
  it('verifica si la ruta es absoluta', () =>{
    expect(absolutePath(absoluta)).toEqual(true)
  })
})

//--------------Convertir ruta relativa en absoluta------------------
describe('convertAbsolute', () =>{
  it('Deberia ser una función', () =>{
    expect(typeof convertAbsolute).toBe('function')
  })
  it('Deberia retonar la ruta absoluta', () =>{
    expect(convertAbsolute(relativa)).toEqual(absoluta)
  })
})

//----------------Validar si es un archivo--------------
describe('validateFile', () =>{
  it('Deberia ser una funcion', () =>{
    expect(typeof validateFile).toBe('function')
  })
  it('Deberia mostrar en un mensaje si es un archivo', () =>{
    //espia el console.log y eemplazar su implementación con una implementación simulada
    const spy = jest.spyOn(console, 'log').mockImplementation();

    validateFile(absoluta);
    expect(spy).toHaveBeenCalledWith('Es un archivo')
    spy.mockRestore()
  })
  
  it('Deberia mostrar en un mensaje si no es un archivo', () =>{

    const spy = jest.spyOn(console, 'log').mockImplementation();
    validateFile(directorios);
    expect(spy).toHaveBeenCalledWith('No es un archivo')
    spy.mockRestore()
  })
})