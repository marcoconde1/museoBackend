const express = require('express');
const router = express.Router();
const favoritoService = require('../services/favorito.service');

// Obtener todos los favoritos
router.get('/favoritos', async (req, res) => {
  try {
    const favoritos = await favoritoService.getAllFavoritos();
    res.json(favoritos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener favoritos', error: err.message });
  }
});

// Obtener favoritos por usuario
router.get('/favoritos/usuario/:usuario_id', async (req, res) => {
  try {
    const favoritos = await favoritoService.getFavoritosByUsuario(req.params.usuario_id);
    res.json(favoritos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener favoritos del usuario', error: err.message });
  }
});

// Agregar un favorito
router.post('/favoritos', async (req, res) => {
  const { usuario_id, objeto_id } = req.body;
  try {
    const resultado = await favoritoService.addFavorito(usuario_id, objeto_id);
    res.status(201).json(resultado);
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar favorito', error: err.message });
  }
});

// Eliminar un favorito
router.delete('/favoritos', async (req, res) => {
  const { usuario_id, objeto_id } = req.body;
  try {
    const resultado = await favoritoService.deleteFavorito(usuario_id, objeto_id);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar favorito', error: err.message });
  }
});

module.exports = router;
