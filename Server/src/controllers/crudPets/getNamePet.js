const getAllPets = require("./getAllPets");

const getNamePet = async (name) => {
  const responseName = await getAllPets(name);
  let petName = null;
  if (name) {
    petName = responseName.filter((pet) =>
      pet.name.toLoweCase().includes(name.toLoweCase())
    );
    return petName;
  }
};

module.exports = getNamePet;
