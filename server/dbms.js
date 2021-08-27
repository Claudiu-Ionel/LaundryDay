
const cors = require('cors');
const mysql = require('mysql2');
const express = require('express');
const { CgArrowLongRight } = require('react-icons/cg');
const app = express();

app.use(express.json());

require('dotenv').config({ path: '../.env' });

app.use(cors({ origin: '*', credentials: true }));
// app.use(function (req, res, next) {

//   res.header('Access-Control-Allow-Origin', "http://localhost:3000");
//   res.header('Access-Control-Allow-Headers', true);
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   next();
// });

const db = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASS,
  database: 'dudu',
  port: 3306,
})

db.connect((err) => {
  if (!err) {
    console.log("connected");

  } else {
    console.log(err);
  }

})

app.post(`/getAdmin`, (req, res) => {
  // const { username, email, password } = req.body;
  db.query('Select id, username, email from dudu.admins;', (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);

    }
  })
})
app.post(`/registerAdmin`, (req, res) => {
  const { username, email, password } = req.body;
  db.query('INSERT Into admins (username, email, password) VALUES (?,?,?);', [username, email, password], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Admin Registered")

    }
  })
})

app.post(`/loginAdmin`, (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT id, username from admins a WHERE a.username = ? AND a.password = ?;', [username, password], (err, result) => {
    if (err) {
      res.send(err);
      res.end()
    } else {
      res.send(result)
      res.end()
    }
  })
})

app.listen(3001)