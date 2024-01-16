const { Router } = require('express');
const { getTemperaments } = require('../controllers/TempController');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


//GET/temperaments
router.get('/temperaments', getTemperaments )

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
