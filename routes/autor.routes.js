const express = require('express');
const router = express.Router();
const autorService = require('../services/autor.service');

// GET todos los autores
router.get('/autores', async (req, res) => {
  try {
    const autores = await autorService.getAllAutores();
    res.json(autores);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener autores' });
  }
});

// POST crear nuevo autor
router.post('/autores', async (req, res) => {
  try {
    const nuevo = await autorService.createAutor(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear autor' });
  }
});

// DELETE eliminar autor por ID
router.delete('/autores/:id', async (req, res) => {
  try {
    const resultado = await autorService.deleteAutor(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar autor' });
  }
});

// Obtener autor por ID
router.get('/autores/:id', async (req, res) => {
  try {
    const autor = await autorService.getAutorById(req.params.id);
    if (!autor) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }
    res.json(autor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar autor
router.put('/autores/:id', async (req, res) => {
  try {
    const result = await autorService.updateAutor(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
