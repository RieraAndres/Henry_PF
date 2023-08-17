const { User } = require("../../db");

const deleteUser = async (id) => {
  try {
    const userToDelete = await User.findOne({ where: { id } });
    if (userToDelete) {
      const userDeleted = await User.destroy({ where: { id } });
      return userDeleted;
    } else {
      return "No existe usuario con ese id";
    }
  } catch (error) {
    throw error;
  }
};

module.exports = deleteUser;
