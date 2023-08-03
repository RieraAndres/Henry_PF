const getAllPets = require('./getAllPets')

const getIdPet = async(id) => {
    const responseId = await getAllPets(id)
    if(id){
        const idPet = responseId.find((pet) => pet.id === id )
        return idPet
    }
}

module.exports = getIdPet