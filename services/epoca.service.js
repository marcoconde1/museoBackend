const connection = require('../db');
const Epoca = require('../models/epoca.model');

async function getAllEpocas() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM EPOCA', (err, results) => {
      if (err) return reject(err);
      resolve(results.map(row => new Epoca(row.id, row.nombre_epoca, row.ano_inicio, row.ano_fin)));
    });
  });
}

async function createEpoca(data) {
  return new Promise((resolve, reject) => {
    const { id, nombre_epoca, ano_inicio, ano_fin } = data;
    connection.query(
      'INSERT INTO EPOCA (id, nombre_epoca, ano_inicio, ano_fin) VALUES (?, ?, ?, ?)',
      [id, nombre_epoca, ano_inicio, ano_fin],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id, nombre_epoca, ano_inicio, ano_fin });
      }
    );
  });
}

async function deleteEpoca(id) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM EPOCA WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: `Época con id ${id} eliminada.` });
    });
  });
}

module.exports = {
  getAllEpocas,
  createEpoca,
  deleteEpoca
};
