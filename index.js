require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/usersRoutes');
const taskRoutes = require('./routes/tasksRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// middlewares globaux
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// servir les fichiers uploadés
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.get("/", (req, res) => res.redirect("/api/tasks"));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// gestion des erreurs
app.use(errorHandler);

// démarrage
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
