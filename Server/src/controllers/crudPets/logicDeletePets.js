const { Mascota, User } = require("../../db");

const logicDeletePets = async (id) => {
  const petNull = await Mascota.findByPk(id);
  if (!petNull) {
    throw new Error("Mascota no encontrada");
  }

  await petNull.update({ status: false });
  return petNull;
};

// Controlador para habilitar o deshabilitar una mascota por ID
const enableOrDisablePet = async (id, newStatus) => {
  try {
    const pet = await Mascota.findByPk(id);
    if (!pet) {
      throw new Error("Mascota no encontrada");
    }

    // Cambia el estado según el nuevo parámetro
    pet.status = newStatus;
    await pet.save();

    return pet;
  } catch (error) {
    console.error(
      "Ocurrió un error al cambiar el estado de la mascota:",
      error
    );
    throw error;
  }
};

module.exports = {
  logicDeletePets,
  enableOrDisablePet,
};
