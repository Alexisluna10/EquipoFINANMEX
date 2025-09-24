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

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows]: any = await pool.query(
      `SELECT u.USU_ID, u.USU_Correo, u.USU_Contrasena, r.ROL_Nombre 
       FROM usuarios u
       INNER JOIN roles r ON u.ROL_ID = r.ROL_ID
       WHERE u.USU_Correo = ? LIMIT 1`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    const user = rows[0];

    if (user.USU_Contrasena !== password) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    res.json({
      success: true,
      token: 'fake-jwt-token',
      user: {
        id: user.USU_ID,
        email: user.USU_Correo,
        role: user.ROL_Nombre
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});





app.listen(3000, () => console.log('Backend corriendo en http://localhost:3000'));
