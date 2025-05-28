const connection = require('../db');
const Categoria = require('../models/categoria.model');

async function getAllCategorias() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM CATEGORIA', (err, results) => {
      if (err) return reject(err);
      resolve(results.map(row => new Categoria(row.id, row.categoria, row.descripcion)));
    });
  });
}

async function createCategoria(categoriaData) {
  return new Promise((resolve, reject) => {
    const { id, categoria, descripcion } = categoriaData;
    connection.query(
      'INSERT INTO CATEGORIA (id, categoria, descripcion) VALUES (?, ?, ?)',
      [id, categoria, descripcion],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id, categoria, descripcion });
      }
    );
  });
}

async function deleteCategoria(id) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM CATEGORIA WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: `Categoría con id ${id} eliminada.` });
    });
  });
}

async function getCategoriaById(id) {
return new Promise((resolve, reject) => {
connection.query('SELECT * FROM CATEGORIA WHERE id = ?', [id], (err, results) => {
if (err) return reject(err);
if (results.length === 0) return resolve(null);
  const row = results[0];
  resolve(new Categoria(row.id, row.categoria, row.descripcion));
});
});
}

// Actualizar categoría por ID
async function updateCategoria(id, data) {
return new Promise((resolve, reject) => {
const { categoria, descripcion } = data;
const query = 'UPDATE CATEGORIA SET categoria = ?, descripcion = ? WHERE id = ?';
connection.query(query, [categoria, descripcion, id], (err, result) => {
if (err) return reject(err);
resolve({ message: `Categoría con ID ${id} actualizada.` });
});
});
}

module.exports = {
  getAllCategorias,
  createCategoria,
  deleteCategoria,
  getCategoriaById,
  updateCategoria
};
