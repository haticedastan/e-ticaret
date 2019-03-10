const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
//Database bağlantı
mongoose.connect(config.database);

// Bağlandı
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// hata 
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');

// Port Numarası
const port = 3000;

// CORS Middleware
app.use(cors());

// Static Dosya 
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Server Başlangıcı
app.listen(port, () => {
  console.log('Server started on port '+port);
});
