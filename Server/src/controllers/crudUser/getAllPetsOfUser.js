const { User, Mascota } = require("../../db.js");

const getAllPetsOfUser = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Mascota,
          as: "mascotas",
          required: false,
        },
      ],
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllPetsOfUser;
