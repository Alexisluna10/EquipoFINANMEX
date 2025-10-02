import express, { Request } from 'express';
import cors from 'cors';
import { pool } from './db/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());


//Configuración de Multer NO MODIFICAR A MENOS QUE SEPAS LO QUE HACES 
//por que yo no ;-----;
// y se me olvida xD

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nombre único
  },
});

const upload = multer({ storage });

//este es para tipar req con multer
interface MulterRequest extends Request {
  files?: {
    ine?: Express.Multer.File[];
    domicilio?: Express.Multer.File[];
  };
}

//test endpoint

// GET usuarios
app.get('/users', async (req, res) => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users');
  res.json(rows);
});

// POST usuario (ejemplo simple)
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
    console.log('Usuarios desde MySQL:', rows);
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
        role: user.ROL_Nombre,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});


app.post(
  '/api/register',
  upload.fields([
    { name: 'ine', maxCount: 1 },
    { name: 'domicilio', maxCount: 1 },
  ]),
  async (req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, email, telefono, password, nacimiento, curp } =
      req.body;

    try {
      // 👇 Hacemos casting puntual aquí
      const files = req.files as {
        ine?: Express.Multer.File[];
        domicilio?: Express.Multer.File[];
      };

      const ineFile = files?.ine?.[0]?.path || null;
      const domicilioFile = files?.domicilio?.[0]?.path || null;

      // 1️⃣ Crear usuario
      const [userResult]: any = await pool.query(
        `INSERT INTO usuarios (USU_Correo, USU_Contrasena, USU_FechaCreacion, ROL_ID)
         VALUES (?, ?, NOW(), 3)`,
        [email, password]
      );

      const userId = userResult.insertId;

      // 2️⃣ Crear perfil asociado
      await pool.query(
        `INSERT INTO perfiles 
        (PEC_Nombre, PEC_ApellidoPat, PEC_ApellidoMat, PEC_Tel, PEC_Nacimiento, PEC_CURP, PEC_INE, PEC_Domicilio, USU_ID)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nombre,
          apellidoPaterno,
          apellidoMaterno || null,
          telefono,
          nacimiento || null,
          curp,
          ineFile,
          domicilioFile,
          userId,
        ]
      );

      res.json({ success: true, message: 'Usuario creado correctamente' });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ success: false, message: 'Error al registrar usuario' });
    }
  }
);


// ======================
// 🚀 INICIO SERVIDOR
// ======================
app.listen(3000, () => console.log('Backend corriendo en http://localhost:3000'));
