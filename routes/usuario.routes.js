const express = require('express');
const router = express.Router();
const usuarioService = require('../services/usuario.service');

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: err.message });
  }
});

// Obtener usuario por ID
router.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuario', error: err.message });
  }
});

// Crear nuevo usuario
router.post('/usuarios', async (req, res) => {
  try {
    const nuevoUsuario = await usuarioService.createUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear usuario', error: err.message });
  }
});

// Eliminar usuario por ID
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const resultado = await usuarioService.deleteUsuario(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: err.message });
  }
});

router.put('/usuarios/:id', async (req, res) => {
  try {
    const result = await usuarioService.updateUsuario(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/usuarios/login', async (req, res) => {
try {
const { identificador, contrasena } = req.body;
if (!identificador || !contrasena) {
return res.status(400).json({ error: 'Se requieren identificador y contraseña' });
}
const usuario = await usuarioService.obtenerUsuarioPorCredenciales(identificador, contrasena);
if (!usuario) {
  return res.status(401).json({ error: 'Credenciales inválidas' });
}
res.json(usuario);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

module.exports = router;
