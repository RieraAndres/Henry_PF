const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { Mascota } = require('../db.js');
const {
	CLOUD_NAME, API_KEY, API_SECRET,
} = process.env;

const routerCloud = express.Router();

cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET
});

// Gestionar carga de archivos con multer
const storage = multer.diskStorage({});
const upload = multer({ storage });

routerCloud.post('/api/pets/upload', upload.single('image'), async (req, res) => {  //Ruta para subir una imagen de mascota
	try {
		if(req.file) {
			return res.status(400).json({ error: 'No se ha proporcionado una imagen' });
		}

		const result = await cloudinary.uploader.upload(req.file.path);

		const pet = await Mascota.create({ imageUrl: result.secure_url });

		return res.status(201).json(pet);
	} catch(error) {
		return res.status(500).json({ error: 'Error al subir la imagen' });
	}
});

routerCloud.get('/api/pets', async (req, res) => {  //Ruta que trae todas las imágenes de las mascotas
	try {
		const pets = await Mascota.findAll();
		return res.json(pets);
	} catch(error) {
		return res.status(500).json({ error: 'Error al obtener todas las imágenes de mascotas' })
	}
});

module.exports = routerCloud;