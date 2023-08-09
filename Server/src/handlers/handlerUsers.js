const registerUser = require('../controllers/crudUser/postRegisterUser.js');

const handlerRegisterUser = async (req, res) => {
    const { name, lastName, email, birthdate, userName, password, numberPhone, address } = req.body;
    try {
        if (!name || !lastName || !email || !birthdate || !userName || !password || !numberPhone || !address) {
            return res.status(400).json({ error: 'Revise los campos nuevamente y verifique que todo esté correcto' });
        } else {
            const createUserResponse = await registerUser(name, lastName, email, birthdate, userName, password, numberPhone, address);

            if (createUserResponse.error) {
                return res.status(409).json({ error: createUserResponse.error }); // 409 Conflict status code for already existing resource
            }

            return res.status(201).json({ message: 'Usuario creado con éxito' });
        }
    } catch (error) {
        console.error('Ocurrió un error al crear su cuenta de usuario', error);
        return res.status(500).json({ error: 'Error al crear su cuenta de usuario' });
    }
};

module.exports = handlerRegisterUser;
