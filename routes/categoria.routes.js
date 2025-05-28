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

// Obtener categoría por ID
router.get('/categorias/:id', async (req, res) => {
try {
const categoria = await categoriaService.getCategoriaById(req.params.id);
if (!categoria) {
return res.status(404).json({ message: 'Categoría no encontrada' });
}
res.json(categoria);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Actualizar categoría
router.put('/categorias/:id', async (req, res) => {
try {
const result = await categoriaService.updateCategoria(req.params.id, req.body);
res.json(result);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
module.exports = router;
