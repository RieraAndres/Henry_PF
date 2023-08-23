const getAllPets = require("../controllers/crudPets/getAllPets");
const postPet = require("../controllers/crudPets/postPet");
const getNamePet = require("../controllers/crudPets/getNamePet");
const getIdPet = require("../controllers/crudPets/getIdPet");
const filters = require("../controllers/filterController/filters.js");
const modifyPets = require("../controllers/crudPets/putPets.js");
const {
  logicDeletePets,
  enableOrDisablePet,
} = require("../controllers/crudPets/logicDeletePets.js");
const getMyPets = require("../controllers/crudPets/getMyPets");
const deletePets = require("../controllers/crudPets/deletePetsDB.js");
const { query } = require("express");

const handlerAllPets = async (req, res) => {
  try {
    const { name } = req.query;
    const allPets = await getAllPets();

    if (name) {
      const petName = await getNamePet(name); //busqueda por name
      return petName.length > 0
        ? res.json(petName)
        : res.status(404).send("Mascota no encontrada");
    } else {
      //sino encuentra la mascota por nombre, pasa toda la info
      return res.json(allPets);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const handlerPostPet = async (req, res) => {
  const {
    name,
    gender,
    age,
    imageUrl,
    specie,
    size,
    location,
    description,
    email,
    numberPhone,
  } = req.body;
  try {
    const createPet = postPet(
      name,
      gender,
      age,
      imageUrl,
      specie,
      size,
      location,
      description,
      email,
      numberPhone
    );
    if (
      !name ||
      !gender ||
      !age ||
      !imageUrl ||
      !specie ||
      !size ||
      !description ||
      !location ||
      !email ||
      !numberPhone
    ) {
      return res.status(404).send("Rellene todos los campos");
    } else {
      return res.status(201).json(createPet);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const handlerIdPet = async (req, res) => {
  const { id } = req.params;
  try {
    const petId = await getIdPet(id);
    return petId
      ? res.json(petId)
      : res
          .status(404)
          .send("La mascota con ese identificador no fue encontrada");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const handlerPutPets = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    gender,
    age,
    imageUrl,
    specie,
    size,
    location,
    description,
    status,
    email,
    numberPhone,
  } = req.body;
  try {
    if (
      !name ||
      !gender ||
      !age ||
      !imageUrl ||
      !specie ||
      !size ||
      !location ||
      !description ||
      !email ||
      !numberPhone
    ) {
      return res.status(404).json({
        error:
          "Alguno de los campos está vacío, revise que estén completos e intente nuevamente",
      });
    }

    const updatePet = await modifyPets(
      id,
      name,
      gender,
      age,
      imageUrl,
      specie,
      size,
      location,
      description,
      status,
      email,
      numberPhone
    );
    return res.status(200).json(updatePet);
  } catch (error) {
    console.error("Ocurrió un error al actualizar la mascota");
    return res.status(500).json({ error: error.message });
  }
};

const handlerLogicDeletePets = async (req, res) => {
  const id = req.params.id;
  try {
    const petDesactived = await logicDeletePets(id);
    return res.status(200).json(petDesactived);
  } catch (error) {
    console.error("Ocurrió un error al desactivar esta mascota");
    return res.status(500).json({ error: error.message });
  }
};

// Manejador para habilitar o deshabilitar una mascota por ID
const handlerEnableOrDisablePet = async (req, res) => {
  const id = req.params.id;
  const { newStatus } = req.body;

  try {
    const updatedPet = await enableOrDisablePet(id, newStatus);
    return res.status(200).json(updatedPet);
  } catch (error) {
    console.error(
      "Ocurrió un error al cambiar el estado de la mascota:",
      error
    );
    return res.status(500).json({ error: error.message });
  }
};

const handlerDeletePets = async (req, res) => {
  const id = req.params.id;
  try {
    const petDeleted = await deletePets(id);
    return res.status(200).json(petDeleted);
  } catch (error) {
    console.error("Ocurrió un error al eliminar esta mascota");
    return res.status(500).json({ error: error.message });
  }
};

const handlerMyPost = async (req, res) => {
  const { user_id } = req.query;
  const id = req.params.id;
  try {
    const myPets = await getMyPets(user_id, id);
    return res.status(200).json(myPets);
  } catch (error) {
    console.error("Ocurrió un error al eliminar esta mascota");
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handlerAllPets,
  handlerPostPet,
  handlerIdPet,
  handlerPutPets,
  handlerLogicDeletePets,
  handlerDeletePets,
  handlerEnableOrDisablePet,
  handlerMyPost,
};
