'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn('Users', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'idFacebook');
  }
};
/* tener instalada dependencia sequelize-cli, luego crear una carpeta "config" en raíz de server, y adentro crear un archivo "config.json" con el siguiente contenido;
{
  "development": {-----Reemplazar con sus datos sólo en development
    "username": "tu_usuario", 
    "password": "tu_contraseña",
    "database": "nombre_de_la_base_de_datos",
    "host": "localhost",
    "dialect": "postgres" --por defecto(dejar así)
  },
  "test": {
    "username": "tu_usuario",
    "password": "tu_contraseña",
    "database": "nombre_de_la_base_de_datos",
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "username": "tu_usuario",
    "password": "tu_contraseña",
    "database": "nombre_de_la_base_de_datos",
    "host": "localhost",
    "dialect": "mysql"
  }
}

Luego ejecutar: npx sequelize-cli db:migrate (en terminal del server) y se habrá actualizado la tabla de donaciones sin borrar DB o restablecer */

