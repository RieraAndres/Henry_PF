const getAllPets = require('../crudPets/getAllPets')

const filterGender = async(gender) => {
    const dataGender = await getAllPets(gender) 
    const petByGender = dataGender.find((pet) => pet.gender === gender)
    if(petByGender === 'hembra' || petByGender === 'macho') {
        return petByGender
    }
}


module.exports = filterGender;