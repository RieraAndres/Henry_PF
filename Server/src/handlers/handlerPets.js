const getAllPets = require('../controllers/crudPets/getAllPets')
const postPet = require('../controllers/crudPets/postPet')
const getNamePet = require('../controllers/crudPets/getNamePet')
const getIdPet = require('../controllers/crudPets/getIdPet')

const handlerAllPets = async(req, res) => {
    try {
        const { name } = req.query
        const allPets = await getAllPets()

        if(name){
            const petName = await getNamePet(name) //busqueda por name
            return petName.length > 0 
            ? res.json(petName)
            : res.status(404).send('Mascota no encontrada')
        }
        else { //sino encuentra la mascota por nombre, pasa toda la info
            return res.json(allPets)
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const handlerPostPet = async(req, res) => {
    const { name, gender, age, imageUrl,specie, size, location, description, email, numberPhone } = req.body
    try {
        const createPet = postPet(name, gender, age, imageUrl, specie, size, location, description, email, numberPhone);
        if( !name || !gender || !age || !imageUrl || !specie || !size || !description || !location || !email || !numberPhone ){
            return res.status(404).send('Rellene todos los campos')
        } else{
            return res.status(201).json(createPet)
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const handlerIdPet = async(req, res) => {
 const {id} = req.params
 try {
    const petId = await getIdPet(id)
    return petId ? res.json(petId) : res.status(404).send('La mascota con ese identificador no fue encontrada')
 } catch (error) {
    return res.status(500).json(error.message)
 }
}

module.exports = {handlerAllPets, handlerPostPet, handlerIdPet}