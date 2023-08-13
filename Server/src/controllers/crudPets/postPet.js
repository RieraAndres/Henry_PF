const { Mascota, User } = require('../../db');

const postPet = async (name, gender, age, imageUrl, specie, size, location, description, email, numberPhone) => {
  try {
    // Verificar si el usuario ya existe
    let ownerPet = await User.findOne({
      where: {
        email,
        numberPhone,
      },
    });
    
    // Crear la mascota y asignarla al usuario
    const newPet = await Mascota.create({
      name,
      gender,
      age,
      imageUrl,
      specie,
      size,
      location,
      description,
      user_id: ownerPet.id, // Asignar el ID del usuario a la columna user_id en la tabla de Mascota
    });

    return newPet;
  } catch (error) {
    console.error('Error al crear la mascota:', error);
    throw error;
  }
};

module.exports = postPet;
