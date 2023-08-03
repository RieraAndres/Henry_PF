const server = require('./src/app')

const { conn } = require('./src/db') //conexion con la DB


conn.sync({ force: false }).then(() => {
    server.listen(3001, () => {
      console.log('Server escuchando en el PORT=3001');
    });
  });