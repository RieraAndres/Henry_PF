const { Mascota } = require('../../db');

const filters = async (name, orden_age, gender, orden_name, reset = false) => {
  let filter = {};
  try {
    if (name) filter.name = name;
    if (gender) filter.gender = gender;

    const orderExpression = [];

    if (orden_age === 'ASC' || orden_age === 'DESC') {
      orderExpression.push(['age', orden_age]);
    }

    if (orden_name === 'ASC' || orden_name === 'DESC') {
      orderExpression.push(['name', orden_name]);
    }

    const petFiltered = await Mascota.findAll({
      where: filter,
      order: orderExpression,
    });

    return petFiltered;
  } catch (error) {
    console.log(error);
  }
};

module.exports = filters;




