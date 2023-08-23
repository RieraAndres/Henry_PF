const server = require('./src/app')
const express = require('express');
const { conn } = require('./src/db') //conexion con la DB

const port = process.env.PORT || 3012

conn.sync({ force: false }).then(() => {
    server.listen(port, () => {
      console.log(`Server escuchando en el puerto ${port}`);
    });
  });