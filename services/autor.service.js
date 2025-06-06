const connection = require('../db');
const Autor = require('../models/autor.model');

async function getAllAutores() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM AUTOR', (err, results) => {
      if (err) return reject(err);
      resolve(results.map(row => new Autor(row.id, row.nombre, row.url)));
    });
  });
}

async function createAutor(data) {
  return new Promise((resolve, reject) => {
    const { id, nombre, url } = data;
    connection.query(
      'INSERT INTO AUTOR (id, nombre, url) VALUES (?, ?, ?)',
      [id, nombre, url],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id, nombre, url});
      }
    );
  });
}

async function deleteAutor(id) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM AUTOR WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: `Autor con id ${id} eliminado.` });
    });
  });
}

// Obtener autor por ID
async function getAutorById(id) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM AUTOR WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);

      const row = results[0];
      resolve(new Autor(row.id, row.nombre, row.url));
    });
  });
}

// Actualizar autor por ID
async function updateAutor(id, data) {
  return new Promise((resolve, reject) => {
    const { nombre, url } = data;
    const query = 'UPDATE AUTOR SET nombre = ?, url = ? WHERE id = ?';
    connection.query(query, [nombre, url, id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: `Autor con ID ${id} actualizado.` });
    });
  });
}

module.exports = {
  getAllAutores,
  createAutor,
  deleteAutor,
  getAutorById,
  updateAutor
};
