const connection = require('../db');
const Ubicacion = require('../models/ubicacion.model');

async function getAllUbicaciones() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM UBICACION_ACTUAL', (err, results) => {
      if (err) return reject(err);
      resolve(results.map(row => new Ubicacion(row.id, row.pais, row.museo, row.contacto)));
    });
  });
}

async function createUbicacion(data) {
  return new Promise((resolve, reject) => {
    const { id, pais, museo, contacto } = data;
    connection.query(
      'INSERT INTO UBICACION_ACTUAL (id, pais, museo, contacto) VALUES (?, ?, ?, ?)',
      [id, pais, museo, contacto],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id, pais, museo, contacto });
      }
    );
  });
}

async function deleteUbicacion(id) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM UBICACION_ACTUAL WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: `Ubicación con id ${id} eliminada.` });
    });
  });
}

module.exports = {
  getAllUbicaciones,
  createUbicacion,
  deleteUbicacion
};
