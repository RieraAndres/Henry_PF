const { User, Mascota, Donacion, Review } = require("../../db.js");

const getAllDataOfUser = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Mascota,
          as: "mascotas",
          require: false,
        },
        {
          model: Donacion,
          as: "donaciones",
          require: false,
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

module.exports = getAllDataOfUser;
