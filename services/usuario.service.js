const connection = require('../db');
const Usuario = require('../models/usuario.model');

// Obtener todos los usuarios
async function getAllUsuarios() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM USUARIO', (err, results) => {
      if (err) return reject(err);
      resolve(results.map(row => new Usuario(
        row.id, row.nombre, row.apellido, row.usuario,
        row.contrasena, row.correo_electronico, row.admin
      )));
    });
  });
}

// Obtener usuario por ID
async function getUsuarioById(id) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM USUARIO WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      const row = results[0];
      resolve(new Usuario(
        row.id, row.nombre, row.apellido, row.usuario,
        row.contrasena, row.correo_electronico, row.admin
      ));
    });
  });
}

// Crear usuario
async function createUsuario(data) {
  return new Promise((resolve, reject) => {
    const { id, nombre, apellido, usuario, contrasena, correo_electronico, admin } = data;
    const query = `INSERT INTO USUARIO (id, nombre, apellido, usuario, contrasena, correo_electronico, admin)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [id, nombre, apellido, usuario, contrasena, correo_electronico, admin], (err, result) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

// Eliminar usuario por ID
async function deleteUsuario(id) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM USUARIO WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: `Usuario con ID ${id} eliminado.` });
    });
  });
}

async function updateUsuario(id, data) {
  return new Promise((resolve, reject) => {
    const { nombre, apellido, usuario, contrasena, correo_electronico, admin } = data;
    const query = `
      UPDATE USUARIO SET
        nombre = ?,
        apellido = ?,
        usuario = ?,
        contrasena = ?,
        correo_electronico = ?,
        admin = ?
      WHERE id = ?
    `;
    connection.query(
      query,
      [nombre, apellido, usuario, contrasena, correo_electronico, admin, id],
      (err, result) => {
        if (err) return reject(err);
        resolve({ message: `Usuario con id ${id} actualizado.` });
      }
    );
  });
}

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario
};
