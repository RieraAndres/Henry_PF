const { Donacion, User } = require('../../db.js');

const getAllDonations = async () => {
	try {
    const allDonations =  await Donacion.findAll(
      {
        include: {
          model: User,
          as: 'donante',
          attributes: ['email', 'numberPhone'],
          }
      }
    )
    return allDonations
  } catch (error) {
    console.log(error);
  } 
}

module.exports = getAllDonations;