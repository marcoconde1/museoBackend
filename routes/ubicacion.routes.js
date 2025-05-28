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

router.get('/ubicaciones/:id', async (req, res) => {
  try {
    const ubicacion = await ubicacionService.getUbicacionById(req.params.id);
    if (!ubicacion) return res.status(404).json({ message: 'Ubicación no encontrada' });
    res.json(ubicacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/ubicaciones/:id', async (req, res) => {
  try {
    const result = await ubicacionService.updateUbicacion(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
