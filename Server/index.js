const server = require('./src/app')
const express = require('express');
const { conn } = require('./src/db') //conexion con la DB


conn.sync({ force: true }).then(() => {
    server.listen(3001, () => {
      console.log('Server escuchando en el PORT=3001');
    });
  });