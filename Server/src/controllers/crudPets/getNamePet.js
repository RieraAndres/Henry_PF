const getAllPets = require("./getAllPets");

const getNamePet = async (name) => {
  const dataName = await getAllPets(name);
  const petByName = await dataName.filter((pet) => 
    pet.name.toLowerCase().includes(name.toLowerCase()))
  return petByName
};

module.exports = getNamePet;
