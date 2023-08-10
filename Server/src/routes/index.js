const { Router } = require('express');
const routes = Router();

//Imports rutas segun el modelo
const routerPets = require('./routesPets')
const routerForUsers = require('./routesUser.js') //----Marcos
const routerCloud = require('../cloudinary/imgPetsRoutes')
// const {} = require('./routesDonations')


routes.use('/mascotas', routerPets)  // Model : mascota
routes.use('/usuario', routerForUsers) // Model : User ----Marcos
routes.use('/cloud', routerCloud) // Ruta para la carga de imágenes de las mascotas en Cloudinary



// routes.use('/donacion', /*rutaDonacion*/) // Model : Donacion


module.exports = routes;