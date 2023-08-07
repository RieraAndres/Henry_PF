const filterGender = require('../controllers/filterController/filters')
const getAllPets = require('../controllers/crudPets/getAllPets')
const {Mascota} = require('../db')

const handlerSortAndFilter = async(req,res) => {
    const {name, orden_age, gender, orden_name, reset } = req.query
    if(reset === true){
        //trae todas las mascotas nuevamente
        try {
            const allPets = getAllPets()
            res.json(allPets);
          } catch (error) {
            console.error('Error al obtener todas las mascotas:', error);
            res.status(500).json({ error: 'Error al obtener las mascotas' });
          }
        } else {
            // Si reset no es true, aplicamos los filtros
            try {
              const petsFiltered = await filterGender(name, orden_age, gender, orden_name, reset);
              res.json(petsFiltered);
            } catch (error) {
              console.error('Error al filtrar mascotas:', error);
              res.status(500).json({ error: 'Error al filtrar mascotas' });
            }
    }
}

module.exports = {handlerSortAndFilter}