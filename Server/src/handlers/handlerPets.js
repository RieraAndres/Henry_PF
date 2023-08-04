const getAllPets = require('../controllers/crudPets/getAllPets')
const postPet = require('../controllers/crudPets/postPet')
const getNamePet = require('../controllers/crudPets/getNamePet')
const getIdPet = require('../controllers/crudPets/getIdPet')
const filterGender = require('../controllers/crudFilter/filterGender')

const handlerAllPets = async(req, res) => {
    try {
        const { name, age, gender } = req.query
        const allPets = await getAllPets()

        
        if(name){
            const petName = await getNamePet(name) //busqueda por name
            return petName.length > 0 
            ? res.json(petName)
            : res.status(404).send('Mascota no encontrada')
        }
        if(gender){
            const petGender = await filterGender(gender)
            return petGender
            ? res.json(petGender)
            : res.status(404).send('Mascota con ese filtro no encontrado')
        }
        else { //sino encuentra la mascota por nombre, pasa toda la info
            return res.json(allPets)
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


const handlerSortAndFilter = async(req,res) => {
    const { age } = req.query
    try {
        const allPets = await getAllPets(age)
        
    } catch (error) {
        
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

module.exports = {handlerAllPets, handlerPostPet, handlerIdPet, handlerSortAndFilter}