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

// Obtener época por ID
async function getEpocaById(id) {
return new Promise((resolve, reject) => {
connection.query('SELECT * FROM EPOCA WHERE id = ?', [id], (err, results) => {
if (err) return reject(err);
if (results.length === 0) return resolve(null);
  const row = results[0];
  resolve(new Epoca(row.id, row.nombre_epoca, row.ano_inicio, row.ano_fin));
});
});
}

// Actualizar época por ID
async function updateEpoca(id, data) {
return new Promise((resolve, reject) => {
const { nombre_epoca, ano_inicio, ano_fin } = data;
const query = 'UPDATE EPOCA SET nombre_epoca = ?, ano_inicio = ?, ano_fin = ? WHERE id = ?';
connection.query(query, [nombre_epoca, ano_inicio, ano_fin, id], (err, result) => {
if (err) return reject(err);
resolve({ message: 'Época con ID ${id} actualizada.'});
});
});
}

module.exports = {
  getAllEpocas,
  createEpoca,
  deleteEpoca,
  getEpocaById,
updateEpoca
};
