const express = require('express');
const router = express.Router();
const epocaService = require('../services/epoca.service');

// GET todas las épocas
router.get('/epocas', async (req, res) => {
  try {
    const epocas = await epocaService.getAllEpocas();
    res.json(epocas);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener épocas' });
  }
});

// POST crear nueva época
router.post('/epocas', async (req, res) => {
  try {
    const nueva = await epocaService.createEpoca(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear época' });
  }
});

// DELETE eliminar época por ID
router.delete('/epocas/:id', async (req, res) => {
  try {
    const resultado = await epocaService.deleteEpoca(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar época' });
  }
});

// Obtener época por ID
router.get('/epocas/:id', async (req, res) => {
try {
const epoca = await epocaService.getEpocaById(req.params.id);
if (!epoca) {
return res.status(404).json({ message: 'Época no encontrada' });
}
res.json(epoca);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Actualizar época por ID
router.put('/epocas/:id', async (req, res) => {
try {
const result = await epocaService.updateEpoca(req.params.id, req.body);
res.json(result);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
module.exports = router;
