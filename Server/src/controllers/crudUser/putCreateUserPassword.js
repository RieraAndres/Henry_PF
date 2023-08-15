const { User } = require("../../db.js");
const { hashPassword } = require("../../passwordUtils/passwordUtils.js");

const createUserPassword = async ({
  idFacebook,
  email,
  createdPassword,
  createdEmail,
}) => {
  try {
    if (email) {
      const [updatedRowsCount, [updatedUser]] = await User.update(
        {
          password: await hashPassword(createdPassword),
        },
        {
          where: { email: email },
          returning: true,
        }
      );

      if (updatedRowsCount === 0) {
        throw new Error(`Usuario con email ${email} no encontrado`);
      }

      return updatedUser;
    } else if (idFacebook && !email) {
      const [updatedRowsCount, [updatedUser]] = await User.update(
        {
          email: createdEmail,
          password: await hashPassword(createdPassword),
        },
        {
          where: { idFacebook: idFacebook },
          returning: true,
        }
      );

      if (updatedRowsCount === 0) {
        throw new Error("No se aplicaron los cambios");
      }

      return updatedUser;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = createUserPassword;
