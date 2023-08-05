const { User } = require('../../db.js');

const registerUser = async (name, lastName, email, birthdate, userName, password, numberPhone, address) => {
	try { 
		const newUser = await User.create({ name, lastName, email, birthdate, userName, password, numberPhone, address });
	
		return newUser
	} catch(error) {
		throw new Error(error.message)
	}
};

module.exports = registerUser;