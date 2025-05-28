const connection = require('../db');
const EstadoConservacion = require('../models/estado.model');

async function getAllEstados() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM ESTADO_CONSERVACION', (err, results) => {
      if (err) return reject(err);
      resolve(results.map(row => new EstadoConservacion(row.id, row.estado)));
    });
  });
}

async function createEstado(estadoData) {
  return new Promise((resolve, reject) => {
    const { id, estado } = estadoData;
    connection.query(
      'INSERT INTO ESTADO_CONSERVACION (id, estado) VALUES (?, ?)',
      [id, estado],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id, estado });
      }
    );
  });
}

async function deleteEstado(id) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM ESTADO_CONSERVACION WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: `Estado con id ${id} eliminado.` });
    });
  });
}

//Obtener id por estado 
async function getEstadoById(id) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM ESTADO_CONSERVACION WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);

      const row = results[0];
      resolve(new EstadoConservacion(row.id, row.estado));
    });
  });
}

//Actualizar estado 
async function updateEstado(id, data) {
  return new Promise((resolve, reject) => {
    const { estado } = data;
    const query = 'UPDATE ESTADO_CONSERVACION SET estado = ? WHERE id = ?';
    connection.query(query, [estado, id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: `Estado de conservación con ID ${id} actualizado.` });
    });
  });
}


module.exports = {
  getAllEstados,
  createEstado,
  deleteEstado,
  getEstadoById,
  updateEstado
};
