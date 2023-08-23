const { User, Mascota, Donacion, Adopcion, Review } = require("../../db");

const deleteUser = async (id) => {
  try {
    const userToDelete = await User.findOne({ where: { id } });
    if (userToDelete) {
      await Mascota.update({ user_id: null, status: false}, { where : { user_id: id } });
      await Adopcion.update({ adoptante_id: null }, { where : { adoptante_id: id } });
      await Adopcion.update({ admin_id: null }, { where : { admin_id: id } });
      await Donacion.update({ donante_id: null }, { where : { donante_id: id } });
      await Review.update({ user_id: null }, { where : { user_id: id } });

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
