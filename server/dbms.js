const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config({ path: '../.env' });


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: `${process.env.DBPASS}`,
  database: 'dbms',
})

db.connect((err) => {
  if (!err) {
    console.log('connected');
  } else {
    console.log('connection Failed');
  }

})


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT username from admins a WHERE a.username = ? AND a.password = ?;', [username, password], (err, result) => {
    if (err) {
      res.send("Username/Password not found")
    } else {
      res.send("User Found")
    }
  })
})

app.listen(3001)