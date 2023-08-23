const { User } = require("../../db");

const setAdminUser = async (id) => {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  } else if (user.typeUser === "Admin") {
    await user.update({ typeUser: "Adopter" });
  } else {
    await user.update({ typeUser: "Admin" });
  }

  return user;
};

module.exports = setAdminUser;
