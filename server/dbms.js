
const cors = require('cors');
const mysql = require('mysql2');
const express = require('express');
const { CgArrowLongRight } = require('react-icons/cg');
const app = express();

app.use(express.json());

require('dotenv').config({ path: '../local.env' });

app.use(cors({ origin: '*', credentials: true }));
// app.use(function (req, res, next) {
const host = process.env.REACT_APP_DB_HOST;
const user = process.env.REACT_APP_DB_USER;
const pass = process.env.REACT_APP_DB_PASS;
//   res.header('Access-Control-Allow-Origin', "http://localhost:3000");
//   res.header('Access-Control-Allow-Headers', true);
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   next();
// });

const db = mysql.createConnection({
  host: 'localhost',
  user: user,
  password: pass,
  database: 'dbms',
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
  db.query('Select id, username, email from dbms.admins;', (err, result) => {
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
      res.end();

    } else {
      res.send(result)
      res.end();
      console.log(`admin "${username}" logged in!`);
    }
  })
})

app.get('/getCities', (req, res) => {
  db.query('SELECT * from cities', (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

app.get('/getStreets', (req, res) => {
  db.query('SELECT * from streets', (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

app.get('/getBuildings', (req, res) => {
  db.query('SELECT * from buildings', (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

app.get('/showTenants/:city/:street/:building', (req, res) => {
  const { city, street, building } = req.params;
  console.log(city, street, building);
  const query = `SELECT t.id, t.first_name, t.second_name, t.personal_number, a.number as apartment_number, b.number as building_number from tenants t
  INNER JOIN apartments a ON a.id = t.apartment_id
  INNER JOIN buildings b ON b.id = t.building_id
  INNER JOIN streets s ON s.id = b.street_id
  inner JOIN cities c ON c.id = s.city_id
  WHERE c.name= ? AND s.name = ? AND b.number = ?;`
  console.log(query);
  db.query(query, [city, street, building], (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

app.listen(3001)