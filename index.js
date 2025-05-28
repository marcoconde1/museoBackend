const express = require('express');
const app = express();
const modeloRoutes = require('./routes/modelo.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const estadoRoutes = require('./routes/estado.routes');
const procedenciaRoutes = require('./routes/procedencia.routes');
const ubicacionRoutes = require('./routes/ubicacion.routes');
const epocaRoutes = require('./routes/epoca.routes');
const autorRoutes = require('./routes/autor.routes');
const imagenRoutes = require('./routes/imagen.routes');
const videoRoutes = require('./routes/video.routes');
const objetoRoutes = require('./routes/objeto.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const favoritoRoutes = require('./routes/favorito.routes');


require('dotenv').config();

// Middleware
app.use(express.json());

// Rutas
app.use('/api', modeloRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', estadoRoutes);
app.use('/api', procedenciaRoutes);
app.use('/api', ubicacionRoutes);
app.use('/api', epocaRoutes);
app.use('/api', autorRoutes);
app.use('/api', imagenRoutes);
app.use('/api', videoRoutes);
app.use('/api', objetoRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', favoritoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
