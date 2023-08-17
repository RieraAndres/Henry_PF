const { User } = require("../../db.js");
const { comparePassword } = require("../../passwordUtils/passwordUtils.js");

const loginUser = async (userName, password) => {
   try {
        const user = await User.findOne({ where: { userName: userName } });
        if (user) {
            const isPasswordCorrect = await comparePassword(password, user.password);
            if (isPasswordCorrect) {
                return user; // Devuelve el usuario si el usuario y la contraseña son correctos
            } else {
                return false; // Devuelve falso si la contraseña es incorrecta
            }
        } else {
            return false; // Devuelve falso si no se encuentra el usuario
        }
   } catch (error) {
     throw new Error(error.message);
   }
};

module.exports = loginUser;
