import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pkg.Pool({
  host: process.env.BASEDATOS_HOST,
  user: process.env.BASEDATOS_USUARIO,
  password: process.env.BASEDATOS_CONTRASENA,
  database: process.env.BASEDATOS_NOMBRE,
  port: process.env.BASEDATOS_PUERTO || 5432,
  max: 20,
  tiempoInactivo: 30000,
  tiempoConexion: 20000
});

export { pool };