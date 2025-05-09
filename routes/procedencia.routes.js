const express = require('express');
const router = express.Router();
const procedenciaService = require('../services/procedencia.service');

// Obtener todas las procedencias
router.get('/procedencias', async (req, res) => {
  try {
    const procedencias = await procedenciaService.getAllProcedencias();
    res.json(procedencias);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener procedencias' });
  }
});

// Crear una nueva procedencia
router.post('/procedencias', async (req, res) => {
  try {
    const nueva = await procedenciaService.createProcedencia(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear procedencia' });
  }
});

// Eliminar una procedencia por ID
router.delete('/procedencias/:id', async (req, res) => {
  try {
    const resultado = await procedenciaService.deleteProcedencia(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar procedencia' });
  }
});

module.exports = router;
