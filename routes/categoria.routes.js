const express = require('express');
const router = express.Router();
const categoriaService = require('../services/categoria.service');

// Obtener todas las categorías
router.get('/categorias', async (req, res) => {
  try {
    const categorias = await categoriaService.getAllCategorias();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
});

// Crear una nueva categoría
router.post('/categorias', async (req, res) => {
  try {
    const nuevaCategoria = await categoriaService.createCategoria(req.body);
    res.status(201).json(nuevaCategoria);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear categoría' });
  }
});

// Eliminar una categoría por ID
router.delete('/categorias/:id', async (req, res) => {
  try {
    const resultado = await categoriaService.deleteCategoria(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar categoría' });
  }
});

module.exports = router;
