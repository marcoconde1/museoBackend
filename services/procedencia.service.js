const connection = require('../db');
const Procedencia = require('../models/procedencia.model');

async function getAllProcedencias() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM PROCEDENCIA', (err, results) => {
      if (err) return reject(err);
      resolve(results.map(row => new Procedencia(row.id, row.nombre_region, row.descripcion)));
    });
  });
}

async function createProcedencia(data) {
  return new Promise((resolve, reject) => {
    const { id, nombre_region, descripcion } = data;
    connection.query(
      'INSERT INTO PROCEDENCIA (id, nombre_region, descripcion) VALUES (?, ?, ?)',
      [id, nombre_region, descripcion],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id, nombre_region, descripcion });
      }
    );
  });
}

async function deleteProcedencia(id) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM PROCEDENCIA WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: `Procedencia con id ${id} eliminada.` });
    });
  });
}

async function getProcedenciaById(id) {
return new Promise((resolve, reject) => {
const query = 'SELECT * FROM PROCEDENCIA WHERE id = ?';
connection.query(query, [id], (err, results) => {
if (err) return reject(err);
if (results.length === 0) return resolve(null);
const row = results[0];
resolve(new Procedencia(row.id, row.nombre_region, row.descripcion));
});
});
}

async function updateProcedencia(id, data) {
return new Promise((resolve, reject) => {
const { nombre_region, descripcion } = data;
const query = 'UPDATE PROCEDENCIA SET nombre_region = ?, descripcion = ? WHERE id = ?';
connection.query(query, [nombre_region, descripcion, id], (err, result) => {
if (err) return reject(err);
resolve({ message: 'Procedencia con id ${id} actualizada.' });
});
});
}

module.exports = {
  getAllProcedencias,
  createProcedencia,
  deleteProcedencia,
  getProcedenciaById,
  updateProcedencia
};
