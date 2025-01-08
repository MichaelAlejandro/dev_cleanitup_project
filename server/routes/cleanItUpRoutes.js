const express = require('express');
const router = express.Router();
const cleanItUpController = require('../controller/cleanItUpController'); // Controlador con las funciones de las rutas

// Define las rutas y enlázalas con las funciones del controlador
router.get('/', cleanItUpController.index); // Página principal
router.post('/register', cleanItUpController.register); // Registro
router.post('/login', cleanItUpController.login); // Login
//router.post('/logout', cleanItUpController.logout); // Logout
router.get('/game', cleanItUpController.game); // Juego principal
router.get('/aboutus', cleanItUpController.aboutUs); // Sobre nosotros
router.get('/ranking', cleanItUpController.ranking); // Ranking
router.get('/plantations', cleanItUpController.plantations); // Árboles plantados
router.get('/knowmore', cleanItUpController.knowMore); // Conoce más

module.exports = router;
