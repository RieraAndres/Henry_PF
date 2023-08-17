const { User } = require("../../db");

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getAllUsers;
