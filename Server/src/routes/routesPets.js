const { Router } = require('express');
const routerPets = Router();

const { handlerAllPets, handlerPostPet, handlerNamePet, handlerIdPet} = require('../handlers/handlerPets')

routerPets.get('/', handlerAllPets) //trae todos
routerPets.get('name', handlerNamePet) //por name
routerPets.get('/:id', handlerIdPet) //por id
routerPets.post('/',handlerPostPet) //post de la mascota


module.exports = routerPets;