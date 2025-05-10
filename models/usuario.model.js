class Usuario {
  constructor(id, nombre, apellido, usuario, contrasena, correo_electronico, admin) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.usuario = usuario;
    this.contrasena = contrasena;
    this.correo_electronico = correo_electronico;
    this.admin = admin;
  }
}

module.exports = Usuario;
