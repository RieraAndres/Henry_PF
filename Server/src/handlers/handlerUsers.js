const registerUser = require('../controllers/crudUser/postRegisterUser.js');

const handlerRegisterUser = async (req, res) => {
	const { name, lastName, email, birthdate, userName, password, numberPhone, address } = req.body
	try {
		const createUser = registerUser(name, lastName, email, birthdate, userName, password, numberPhone, address);
		if( !name || !lastName || !email || !birthdate || !userName || !password || !numberPhone || !address ){
			return res.status(400).json({ error: 'Revise los campos nuevamente y verifique que todo esté correcto' })
		} else {
			return res.status(201).json(createUser)
		};
	} catch (error) {
		console.error('Ocurrió un error al crear su cuenta de usuario');
		return res.status(500).json({ error: error.message });
	}
};

module.exports = handlerRegisterUser;