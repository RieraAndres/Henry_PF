const { Mascota, User} = require('../../db')


const postPet = async(name, gender, age, imageUrl, specie, size, location, description, email, numberPhone) => {
    const newPet = await Mascota.create({ name, gender, age, imageUrl, specie, size, location, description});
    const ownerPet = await User.findOne({

        where: {
          email: email,
          numberPhone: numberPhone,
        },
      });
  
      newPet.setUser(ownerPet)
      return newPet;
}

module.exports = postPet;