const { Router } = require('express');
const routerPets = Router();

const { handlerAllPets, handlerPostPet, handlerNamePet, handlerIdPet} = require('../handlers/handlerPets')

routerPets.get('/', handlerAllPets)
routerPets.get('name', handlerNamePet)
routerPets.get('/:id', handlerIdPet)
routerPets.post('/',handlerPostPet)


module.exports = routerPets;