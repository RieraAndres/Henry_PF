const { Router } = require('express');
const routes = Router();

//Imports rutas segun el modelo

//Imports rutas segun el modelo
const routerPets = require('./routesPets')
// const routerFilter = require('./routesFilter')
const routerForUsers = require('./routesUser.js') //----Marcos
const routerCloud = require('../cloudinary/imgPetsRoutes')
// const {} = require('./routesDonations')
// const {} = require('./routesAdoptions')

routes.use('/mascotas', routerPets)  // Model : mascota
// routes.use('/filter', routerFilter)
routes.use('/usuario', routerForUsers) // Model : User ----Marcos
routes.use('/cloud', routerCloud) // Ruta para la carga de imágenes de las mascotas en Cloudinary
// routes.use('/donacion', /*rutaDonacion*/) // Model : Donacion
// routes.use('/Adopcion', /*rutaAdopcion*/) // Model : Adopcion


module.exports = routes;