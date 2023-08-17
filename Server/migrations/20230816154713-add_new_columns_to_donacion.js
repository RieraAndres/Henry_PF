'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  down: async(queryInterface, Sequelize) => {
    /*await queryInterface.removeColumn('Donacions', 'date');
    await queryInterface.removeColumn('Donacions', 'nameDonante');*/
  },

  up: async (queryInterface, Sequelize) => {
    /*await queryInterface.addColumn('Donacions', 'nameDonante', {
      type: Sequelize.STRING,
      allowNull: true,
    });*/

    /*await queryInterface.addColumn('Donacions', 'date', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });*/

    await queryInterface.addColumn('Donacions', 'numberPhone', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Donacions', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    });

    await queryInterface.addColumn('Donacions', 'mp_preference_id', {
      type: Sequelize.STRING,
      unique: true,
    });

    await queryInterface.addColumn('Donacions', 'mp_payment_id', {
      type: Sequelize.STRING,
      unique: true,
    });

    await queryInterface.addColumn('Donacions', 'mp_status', {
      type: Sequelize.STRING,
    });
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

