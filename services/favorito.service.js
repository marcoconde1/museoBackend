const connection = require('../db');
const Favorito = require('../models/favorito.model');

// Obtener todos los favoritos
async function getAllFavoritos() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM FAVORITO', (err, results) => {
      if (err) return reject(err);
      resolve(results.map(row => new Favorito(row.USUARIO_id, row.OBJETO_id)));
    });
  });
}

// Obtener favoritos por ID de usuario
async function getFavoritosByUsuario(usuario_id) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM FAVORITO WHERE USUARIO_id = ?', [usuario_id], (err, results) => {
      if (err) return reject(err);
      resolve(results.map(row => new Favorito(row.USUARIO_id, row.OBJETO_id)));
    });
  });
}

// Agregar favorito
async function addFavorito(usuario_id, objeto_id) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO FAVORITO (USUARIO_id, OBJETO_id) VALUES (?, ?)';
    connection.query(query, [usuario_id, objeto_id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: 'Favorito agregado', usuario_id, objeto_id });
    });
  });
}

// Eliminar favorito
async function deleteFavorito(usuario_id, objeto_id) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM FAVORITO WHERE USUARIO_id = ? AND OBJETO_id = ?';
    connection.query(query, [usuario_id, objeto_id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: 'Favorito eliminado', usuario_id, objeto_id });
    });
  });
}

module.exports = {
  getAllFavoritos,
  getFavoritosByUsuario,
  addFavorito,
  deleteFavorito
};
