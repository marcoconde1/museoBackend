function modeloToDTO(modelo) {
    return {
      rutaModelo: modelo.ruta_modelo,
      rutaFondo: modelo.ruta_fondo,
      idObjeto: modelo.objeto_id,
    };
  }
  
  module.exports = { modeloToDTO };
  