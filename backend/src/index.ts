import express from 'express';
import cors from 'cors';
import { pool } from './db/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const app = express();
app.use(cors());
app.use(express.json());

// GET usuarios
app.get('/users', async (req, res) => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users');
  res.json(rows);
});

// POST usuario
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  res.json({ id: result.insertId, name, email });
});

// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    console.log('Usuarios desde MySQL:', rows); // 👈 imprime en consola
    res.json(rows);
  } catch (error) {
    console.error('Error consultando usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});




app.listen(3000, () => console.log('Backend corriendo en http://localhost:3000'));
