const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { db } = require('./Model/DbConnection');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// read data

app.get('/api/readData', (req, res) => {
  const sqlQuery = 'SELECT * FROM user';

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

/// read data secara spesifik
app.get('/api/readUser/:email', (req, res) => {
  const userEmail = req.params.email;

  const sqlQuery = 'SELECT * FROM user WHERE email = ?';
  db.query(sqlQuery, userEmail, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

// Create Data

app.post('/api/createUser', (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const sqlQuery = 'INSERT INTO user (name, email, password) values (?,?,?) ';
  db.query(sqlQuery, [userName, userEmail, userPassword], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

// Update Data

app.put('/api/updateUser', (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const sqlQuery = 'UPDATE user SET name = ?, password = ? where email = ? ';
  db.query(sqlQuery, [userName, userPassword, userEmail], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

// Delete Data
app.delete('/api/deleteUser', (req, res) => {
  const userId = req.body.id;

  const sqlQuery = 'DELETE FROM user WHERE id = ? ';
  db.query(sqlQuery, userId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.listen(3001, () => {
  console.log('Server berhasil dijalankan di port 1....');
});
