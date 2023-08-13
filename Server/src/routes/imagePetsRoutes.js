const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { Mascota } = require('../db.js');
const {
  CLOUD_NAME, API_KEY, API_SECRET
} = process.env

const router = express.Router();

// Configurar Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

// Configurar Multer para gestionar la carga de archivos
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Ruta para subir una imagen de mascota
router.post('/upload', upload.single('imageUrl'), async (req, res) => {
  const { imageUrl } = req.body;
  try {
    if (!imageUrl) {
      return res.status(400).json({ error: 'No se ha proporcionado una imagen' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    // Guardar la URL de la imagen en la base de datos
    const pet = await Mascota.create({ imageUrl: result.secure_url });

    return res.status(201).json(pet);
  } catch (error) {
    return res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

// Ruta para obtener todas las mascotas
router.get('/', async (req, res) => {
  try {
    const pets = await Mascota.findAll();
    return res.json(pets);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las mascotas' });
  }
});

module.exports = router;
