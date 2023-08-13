const { Mascota } = require('../../db');

const filters = async (size, orden, gender, specie) => {
  let filter = {}; //Donde son asignados los filtros
  try {
    //Filtros
    if (size) filter.size = size;
    if (gender) filter.gender = gender;
    if(specie) filter.specie = specie //Agregado filtrado por especie, por si requiera mas adelante el Front
    
    
    //Ordenamientos
    const orderExpression = [];

    const [column, orderType] = orden.split('-');

    if (column === 'name' && (orderType === 'ASC' || orderType === 'DESC')) {
      orderExpression.push(['name', orderType]);
    }
    if (column === 'age' && (orderType === 'ASC' || orderType === 'DESC')) {
      orderExpression.push(['age', orderType]);
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




