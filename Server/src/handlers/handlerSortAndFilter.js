const filterGender = require("../controllers/filterController/filters");

const handlerSortAndFilter = async (req, res) => {
  const { size, orden, gender, specie } = req.query;
  try {
    const petsFiltered = await filterGender( size, orden, gender, specie); //Parametros que manejara el controller
    return res.status(200).json(petsFiltered);
  } catch (error) {
    console.error("Error al filtrar mascotas:", error);
    return res.status(500).json({ error: "Error al filtrar mascotas" });
  }
};

module.exports = { handlerSortAndFilter };
