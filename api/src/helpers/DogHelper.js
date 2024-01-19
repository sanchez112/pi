const { Breed, Temperament } = require('../db.js');
const axios = require('axios');

//retornar toda la data de db y api.
const getTotalInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds`);

    const dbInfo = await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    });

    const totalInfo = apiUrl.data.concat(dbInfo);

    return totalInfo;
}
//se necesita tener en un mismo formato(api y db) para realizar las comparaciones
const weightFormat = (weight) => {
    if (typeof weight ==='number') return weight;

    return weight.slice(-4).replace(/[-\s–]/g, "") 
}
// Orden por peso o alfabeticamente

const sortDogs = (array, order, orderBy) => {
    if (orderBy === "weight") {  
        if (order === 'asc') return array.sort((a, b) => weightFormat(a.weight) - weightFormat(b.weight));
        if (order === 'desc') return array.sort((a, b) => weightFormat(b.weight) - weightFormat(a.weight));
    }
    if (orderBy === "name") {  
        if (order === 'asc') return array.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        if (order === 'desc') return array.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);
    }
}
  //convierte la info de la db y api con un mismo formato con igual propiedades
  const dogsFormat = (array) => {
    return array.map((e) => {
        const temperamentArray = e.temperament ? e.temperament.split(', ') : [];
        const temperamentsArray = e.temperaments ? e.temperaments.map(t => t.name) : [];

        return {
            id: e.id,
            image: e.image?.url || 'https://i.pinimg.com/originals/35/22/3a/35223a232b520d960d01822c29d4c9e7.jpg',
            name: e.name,
            temperament: temperamentArray.concat(temperamentsArray),
            weight: e.weight.imperial || e.weight,
            height: e.height.imperial || e.height,
            life_span: e.life_span,
        };
    });
}
  //filtro de perros de la api y db por id(id= 'number', id='string')
  const sourceFilter = (array, source)=> {
    if(source == 'api'){
        return array.filter((e)=> typeof e.id == 'number')
    }
    if(source == 'created'){
        return array.filter((e)=> typeof e.id == 'string')
    }
    return array;
  }
  // filtro de temperamentos 

  const tempFilter =(array, temp)=>{
    const temp2 = temp.charAt(0).toUpperCase() + temp.slice(1);
    return array.filter((e) => e.temperament?.includes(temp2))
  }
  // filtro por nombre de la raza
  const nameFilter = (array, name) =>{
    return array.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
  }



module.exports ={
    getTotalInfo,
    sortDogs,
    dogsFormat,
    sourceFilter,
    tempFilter,
    nameFilter,
    
    
}