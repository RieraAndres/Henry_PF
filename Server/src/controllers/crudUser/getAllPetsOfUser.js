const { User, Mascota } = require('../../db.js');

const getAllPetsOfUser = async() => {
  try {
    const users =  await User.findAll({
      include: {
        model: Mascota,
        as: 'mascotas',
        required: true
      }  
    });
    
    if(!users){
    	return null;
    }

    return users
  } catch (error) {
    console.log(error);
  } 
}

module.exports = getAllPetsOfUser;