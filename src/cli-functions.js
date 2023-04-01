
//----------------------Total de links------------------------
const totalLinks =(links) =>{
    const total = links.length
    return {
        total: total
    }
}


//----------------------Links unicos-----------------------
const totalUnique = (links) =>{
    const unique = []
    for (let i = 0; i < links.length; i++) {
      //comprobar si el valor de href ya esta en el arreglo unique
      if (!unique.includes(links[i].href)) {
        //si no lo esta lo añadimos al arreglo
        unique.push(links[i].href);
      }
    }
    return {
        Unique: unique.length
    }
}


//------------------------Links rotos------------------
const totalbroken = (links) =>{
        const broken = links.filter((link) => link.message === 'fail');
        return {
            Broken: broken.length
        };
}


module.exports ={
    totalLinks,
    totalUnique,
    totalbroken
}