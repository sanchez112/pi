const {Breed, Temperamt} = require('../db.js');
const axios = require = ('axios');

//retornar toda la data de db y api.
const getAllInfo = async () =>{
    //info api
    const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds`);

    //info db
    const  dbInfo= await Breed.findAll({
        include: {
            model: Temperamt,
            attributes: ["name"],
            through:{
                attributes:[],
            },
        }
    })
    const AllInfo = apiInfo.data.concat(dbInfo);

    return AllInfo;
};

//se necesita tener en un mismo formato(api y db) para realizar las comparaciones
const waightFormat = (weight) =>{
    if (typeof weight === 'number') return weight;

    return weight.slice(-4).replace(/[-\s–]/g, "")
}





module.exports ={
    getAllInfo,
    waightFormat,
}