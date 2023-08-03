const getAllPets = require('./getAllPets')

const getIdPet = async(id) => {
    const dataId = await getAllPets(id)
    if(id){
        const idPet = dataId.find((pet) => pet.id === id )
        return idPet
    }
}

module.exports = getIdPet