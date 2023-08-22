const postAdoptPet = require('../controllers/crudAdopt/postAdopt');
const getAllAdoptInfo = require('../controllers/crudAdopt/getAdoptInfo')
const { User, Mascota } = require('../db');

const handlerAdoptPet = async (req, res) => {
    const { nameUser, numberPhone, email, birthdate, addressAdoption, dateAdoption,comment } = req.body;
    const { id } = req.params; // ID de la mascota
    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ where: { email } });

        if (!existingUser) { 
            return res.status(400).json({ error: 'Usuario no registrado. Regístrese antes de Realizar una solicitud de adopción.' });
        }
        const petInfo = await Mascota.findOne({ where: { id: id } });
        
        const createAdopt = await postAdoptPet(id, petInfo.name, petInfo.age, petInfo.location, petInfo.size, petInfo.description, 
            petInfo.user_id, nameUser, numberPhone, email, birthdate, addressAdoption,dateAdoption, comment);

        return res.status(201).json({ message: 'Solicitud de adopción creada exitosamente', data: createAdopt });
    } catch (error) {
        console.error('Error en el proceso de adopción:', error);
        return res.status(500).json({ error: 'Error en el proceso de adopción', details: error.message })
    }
};

const handlerAllAdoptInfo = async(req,res) => {
    try {
        const infoAdoptions = await getAllAdoptInfo()
        return res.json(infoAdoptions)
    } catch (error) {
        return res.status(500).json({ error: 'No se pudo acceder a la info' });
    }
}

module.exports = { handlerAdoptPet, handlerAllAdoptInfo };
