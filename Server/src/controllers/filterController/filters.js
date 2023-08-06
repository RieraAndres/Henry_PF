const getAllPets = require('../crudPets/getAllPets')
const {Mascota} = require('../../db')

const filters = async(name, age_min, age_max, gender, orden_ascendente, reset = false) => {    
    let filter = {}
    try {
        if(name) filter.name = name;
        if (!reset && age_min !== undefined && age_max !== undefined) {
            filter.age = { $between: [age_min, age_max] };
          }
        if(gender) filter.gender = gender
        const petFiltered = await Mascota.findAll({
            where: filter,
            order: [['name', orden_ascendente === 'true' ? 'ASC' : 'DESC']],
        })
        return petFiltered
    } catch (error) {
        console.log(error); //momentaneo
    }
}

module.exports = filters;