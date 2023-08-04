const { Router } = require('express');
const routerPets = Router();

const { handlerAllPets, handlerPostPet, handlerIdPet} = require('../handlers/handlerPets')

routerPets.get('/', handlerAllPets) //trae todos los pets y por nombre segun condicional //OK pero unicamente por modelo mascota
routerPets.get('/:id', handlerIdPet) //trae todas las mascotas por id
routerPets.post('/',handlerPostPet) //post de los pets //OK pero unicamente por modelo mascota


module.exports = routerPets;