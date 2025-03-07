const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware

// Configuration CORS
const allowedOrigins = ['http://localhost:5173', process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};


app.use(cors(corsOptions));
app.use(bodyParser.json());

// Vérifiez les en-têtes de réponse
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/game', require('./routes/game'));
app.use('/api/modifydb', require('./routes/modifydb'));
app.use('/api/browsedb', require('./routes/browsedb'));


// Route de test pour vérifier que le serveur répond
app.get('/test', (req, res) => {
  console.log("le test de connexion au serveur fonctionne.");
  res.status(200).json({ message: 'Le serveur répond correctement !' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
