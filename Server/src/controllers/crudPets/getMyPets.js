const getAllPets = require("./getAllPets");

const getMyPets = async (user_id, id) => {
  try {
    const allPets = await getAllPets(user_id);
    const myPets = allPets.filter((pet) => pet.user_id === id);
    return myPets;
  } catch (error) {
    throw new Error("Ocurrió un error al obtener las mascotas.");
  }
};

module.exports = getMyPets;
