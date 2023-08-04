const getAllPets = require("./getAllPets");

const getNamePet = async (name) => {
  const dataName = await getAllPets(name);
  let petName = null;
  if (name) {
    petName = dataName.filter((pet) =>
      pet.name.toLoweCase().includes(name.toLoweCase())
    );
    return petName;
  }
};

module.exports = getNamePet;
