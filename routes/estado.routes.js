const express = require('express');
const router = express.Router();
const estadoService = require('../services/estado.service');

// Obtener todos los estados
router.get('/estados', async (req, res) => {
  try {
    const estados = await estadoService.getAllEstados();
    res.json(estados);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener estados' });
  }
});

// Crear un nuevo estado
router.post('/estados', async (req, res) => {
  try {
    const nuevoEstado = await estadoService.createEstado(req.body);
    res.status(201).json(nuevoEstado);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear estado' });
  }
});

// Eliminar un estado por ID
router.delete('/estados/:id', async (req, res) => {
  try {
    const resultado = await estadoService.deleteEstado(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar estado' });
  }
});

router.get('/estados/:id', async (req, res) => {
  try {
    const estado = await estadoService.getEstadoById(req.params.id);
    if (!estado) {
      return res.status(404).json({ message: 'Estado de conservación no encontrado' });
    }
    res.json(estado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/estados/:id', async (req, res) => {
  try {
    const result = await estadoService.updateEstado(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
