const { Mascota, User} = require('../../db')

const postPet = async(name, gender, age, image, email, numberPhone) => {
    const newPet = await Mascota.create({ name, gender, age, image, email, numberPhone})
    const ownerPet = await User.findAll({
        where: {
            email: email,
            numberPhone: numberPhone
        }
    });
    newPet.addUser(ownerPet);
    return newPet
}

module.exports = postPet;