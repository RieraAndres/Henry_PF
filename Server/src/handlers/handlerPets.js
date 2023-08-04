const getAllPets = require('../controllers/crudPets/getAllPets')
const postPet = require('../controllers/crudPets/postPet')
const getNamePet = require('../controllers/crudPets/getNamePet')
const getIdPet = require('../controllers/crudPets/getIdPet')

const handlerAllPets = async(req, res) => {
    try {
        const allPets = await getAllPets()
        return allPets ? res.json(allPets) : res.status(404).json('No hay mascotas existentes')
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const handlerPostPet = async(req, res) => {
    const { name, gender, age, imageUrl, email, numberPhone } = req.body
    try {
        const createPet = postPet(name, gender, age, imageUrl, email, numberPhone);
        if( !name || !gender || !age || !imageUrl || !email || !numberPhone ){
            return res.status(404).send('Ingrese todos los campos')
        } else{
            return res.status(201).json(createPet)
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const handlerNamePet = async(req, res) => {
    const {name} = req.query
    try {
        const petName = getNamePet(name)
        return petName ? res.json(petName) : res.status(404).send('Mascota no encontrada')
    } catch (error) {
        return res.status(500).json(error.message)
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

module.exports = {handlerAllPets, handlerPostPet, handlerNamePet, handlerIdPet}