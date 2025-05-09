const express = require('express');
const router = express.Router();
const ubicacionService = require('../services/ubicacion.service');

// GET todas las ubicaciones
router.get('/ubicaciones', async (req, res) => {
  try {
    const ubicaciones = await ubicacionService.getAllUbicaciones();
    res.json(ubicaciones);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener ubicaciones' });
  }
});

// POST crear nueva ubicación
router.post('/ubicaciones', async (req, res) => {
  try {
    const nueva = await ubicacionService.createUbicacion(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear ubicación' });
  }
});

// DELETE eliminar ubicación por ID
router.delete('/ubicaciones/:id', async (req, res) => {
  try {
    const resultado = await ubicacionService.deleteUbicacion(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar ubicación' });
  }
});

module.exports = router;
