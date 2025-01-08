// const cleanItUpController = {
//     // Página principal
//     index: (req, res) => {
//         res.status(200).send('Bienvenido a la página principal del juego.');
//     },

//     // Registro de usuario
//     register: (req, res) => {
//         const { username, password } = req.body;

//         if (!username || !password) {
//             return res.status(400).send('Por favor, proporciona un nombre de usuario y contraseña.');
//         }

//         // Lógica para registrar al usuario (ejemplo básico)
//         console.log(`Usuario registrado: ${username}`);
//         res.status(201).send(`Usuario ${username} registrado con éxito.`);
//     },

//     // Inicio de sesión
//     login: (req, res) => {
//         const { username, password } = req.body;

//         if (!username || !password) {
//             return res.status(400).send('Nombre de usuario y contraseña requeridos.');
//         }

//         // Lógica para validar usuario (ejemplo básico)
//         console.log(`Inicio de sesión: ${username}`);
//         res.status(200).send(`Bienvenido, ${username}. Has iniciado sesión correctamente.`);
//     },

//     // Cierre de sesión
//     logout: (req, res) => {
//         // Lógica para cerrar sesión
//         console.log('Usuario cerró sesión');
//         res.status(200).send('Has cerrado sesión correctamente.');
//     },

//     // Juego principal
//     game: (req, res) => {
//         // Lógica para manejar el juego
//         res.status(200).send('Vista del juego principal. ¡Diviértete jugando!');
//     },

//     // Sobre nosotros
//     aboutUs: (req, res) => {
//         res.status(200).send('Esta es la página "Sobre nosotros". Aquí puedes conocer más sobre el proyecto.');
//     },

//     // Ranking
//     ranking: (req, res) => {
//         // Ejemplo de ranking ficticio
//         const ranking = [
//             { username: 'Jugador1', score: 1000 },
//             { username: 'Jugador2', score: 800 },
//             { username: 'Jugador3', score: 600 },
//         ];

//         res.status(200).json(ranking);
//     },

//     // Árboles plantados
//     plantations: (req, res) => {
//         // Lógica para mostrar los árboles plantados
//         const plantations = {
//             totalPlanted: 50,
//             users: [
//                 { username: 'Jugador1', trees: 20 },
//                 { username: 'Jugador2', trees: 15 },
//                 { username: 'Jugador3', trees: 15 },
//             ],
//         };

//         res.status(200).json(plantations);
//     },

//     // Conoce más
//     knowMore: (req, res) => {
//         res.status(200).send('Esta es la página "Conoce más". Información adicional sobre el proyecto.');
//     },
// };

// module.exports = cleanItUpController;








const path = require('path');

const cleanItUpController = {
    // Página principal
    index: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/templates/index.html'));
    },

    // Juego principal
    game: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/templates/game.html'));
    },

    // Sobre nosotros
    aboutUs: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/templates/aboutus.html'));
    },

    // Ranking
    ranking: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/templates/ranking.html'));
    },

    // Árboles plantados
    plantations: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/templates/plantations.html'));
    },

    // Conoce más
    knowMore: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/templates/knowmore.html'));
    },

    login: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/templates/login.html'));
    },

    register: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/templates/register.html'));
    },
};

module.exports = cleanItUpController;
