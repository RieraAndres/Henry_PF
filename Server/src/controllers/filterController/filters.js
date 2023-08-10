const { Mascota } = require('../../db');

const filters = async (size, orden_age, gender, orden_name, specie) => {
  let filter = {}; //Donde son asignados los filtros
  try {
    //Filtros
    if (size) filter.size = size;
    if (gender) filter.gender = gender;
    if(specie) filter.specie = specie //Agregado filtrado por especie, por si requiera mas adelante el Front

    //Ordenamientos
    const orderExpression = []; //Van siendo alojados en este array, por columnas

    //Cambié el orden de los if, ya que al momento de pushear, el integer de la edad tiene prioridad en el array
    if (orden_name === 'ASC' || orden_name === 'DESC') {
      orderExpression.push(['name', orden_name]);
    }
    if (orden_age === 'ASC' || orden_age === 'DESC') {
      const ordenName = orderExpression.push(['age', orden_age]);
      orderExpression.concat(ordenName)
    }

    const petFiltered = await Mascota.findAll({
      where: filter,
      order: orderExpression,
    }); //Combinación de los filtrados junto a los ordenados

    return petFiltered;
  } catch (error) {
    console.log(error);
  }
};

module.exports = filters;




