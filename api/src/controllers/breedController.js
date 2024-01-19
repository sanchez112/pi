const {getTotalInfo, sortDogs, dogsFormat, sourceFilter, tempFilter, nameFilter,} = require("../helpers/DogHelper.js")
const {Breed} = require('../db.js');

//devulve todos los perros dependiendo del filtro
const getDogs = async (req, res)=>{
    try {
        let { name, order, orderBy, source, temp } = req.query
        let totalDogsInfo = await getTotalInfo();

        // //usamos helper para tener los mismos formatos 
         let arrayDogs = dogsFormat(totalDogsInfo)

         if(name) arrayDogs = nameFilter(arrayDogs, name)
         if(order && orderBy) sortDogs(arrayDogs, order, orderBy)
         if(source) arrayDogs = sourceFilter(arrayDogs, source)
         if(temp) arrayDogs = tempFilter(arrayDogs, temp)

        return res. status(200).send(arrayDogs);

    } catch (error) {
        res.status(404).send(error.message)
    }
}
//eliminar un perro creado
const removeDogs = async(req, res)=>{
    try {
        let {idBreed} = req.params;
        const remove = await Breed.destroy({
            where: {
                id: idBreed
            }
        })
        return res.status(200).send('ok');
        
    } catch (error) {
        return res.status(500).send('todo mal')
        
    }
}
//Detalles de cada perro
const getDogDetail = async(req, res)=>{
    const {idBreed} = req.params;
    let totalDogsInfo = await getTotalInfo();
    try {
        const filterDogs = totalDogsInfo.filter(e => e.id == idBreed)
        if(filterDogs.length){
            return res.status (200).send (dogsFormat(filterDogs)[0]);
        }
        return res.status(404).send('No existe coicidencia para el ID')
        
    } catch (error) {
        res.status(404).send(error.message)
    }
}
//creacion de de un perro
const postDog = async (req, res) => {
    const { name, height, weight, life_span, temperament } = req.body;

    try {
        const newDog = await Breed.create({ name, height, weight, life_span });
        await newDog.addTemperament(temperament);

        res.status(201).send(newDog)

    } catch (error) {
        res.status(404).send(error.message)
    }
}


module.exports={
    getDogs,
    getDogDetail,
    postDog,
    removeDogs
}