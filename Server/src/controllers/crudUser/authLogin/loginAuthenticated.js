const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const routerAuth = express.Router();
const { User } = require('../../../db');
const authenticateToken = require('./authenticateToken');

// Ruta de inicio de sesión para obtener el token
routerAuth.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrecta' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrecta' });
    }

    const userToken = { id: user.id, userName: user.userName };
    const token = jwt.sign(userToken, 'patitassinhogar');
    return res.json({ id: userToken.id,userName:userToken.userName, token });
  } catch (error) {
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});


// Ruta protegida para obtener los datos del usuario
routerAuth.get('/protected', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Acceso autorizado', user: req.user });
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});

module.exports = routerAuth;
