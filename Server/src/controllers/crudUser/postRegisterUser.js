const { User } = require("../../db.js");

const registerUser = async (
  name,
  lastName,
  email,
  birthdate,
  userName,
  password,
  numberPhone,
  address
) => {
  try {
    // Verificar si el usuario ya existe por su dirección de correo electrónico
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        lastName,
        birthdate,
        userName,
        password,
        numberPhone,
        address,
      },
    });

    // Si el usuario ya existía, devolver un mensaje de error
    if (!created) {
      return { error: "Ya existe un usuario con este email." };
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = registerUser;
