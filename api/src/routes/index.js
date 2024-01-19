const { Router } = require('express');
const { getTemperaments } = require('../controllers/TempController');
const {getDogs,getDogDetail,postDog,removeDogs} = require('../controllers/breedController.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

//GET/dogs and GET/dogs?name=''
router.get('/dogs', getDogs)//x

// //GET/dogs/{idRaza}
router.get('/dogs/:idBreed', getDogDetail )//x

// //POST/dogs
router.post('/dogs', postDog)//x

// //GET/temperaments
router.get('/temperaments', getTemperaments )//x

// //DELETE
router.delete('/dogs/:idBreed', removeDogs)//x




module.exports = router;
