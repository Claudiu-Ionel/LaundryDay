
const cors = require('cors');
const mysql = require('mysql2');
const express = require('express');

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
  host: host,
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
app.get('/getApartments', (req, res) => {
  db.query('SELECT * from apartments', (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

app.get('/showTenants/:city/:street/:building', (req, res) => {
  const { city, street, building } = req.params;
  const query = `SELECT t.id, t.first_name, t.second_name, t.personal_number, a.number as apartment_number, b.number as building_number from tenants t
  INNER JOIN apartments a ON a.id = t.apartment_id
  INNER JOIN buildings b ON b.id = t.building_id
  INNER JOIN streets s ON s.id = b.street_id
  inner JOIN cities c ON c.id = s.city_id
  WHERE c.name= ? AND s.name = ? AND b.number = ?;`

  db.query(query, [city, street, building], (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})
app.delete('/deleteTenant/:tenantId', (req, res) => {
  const tenantId = req.params.tenantId;
  db.query(`Delete from dbms.tenants where tenants.id = ?;`, [tenantId], (err, result) => {
    if (err) {
      console.log(tenantId);
      res.send(err, "tenant could not be deleted");
    } else {
      console.log(tenantId);
      res.send("tenant deleted")
    }
  })
})
app.delete('/addTenant/', (req, res) => {
  const { firstName, secondName, building, apartment } = req.body;

  db.query(`INSERT INTO tenants (first_name,second_name,personal_number,apartment_id,building_id) VALUES (?,?,?,?,?);`, [firstName, secondName, building, apartment], (err, result) => {
    if (err) {
      console.log(firstName);
      res.send(err, "tenant could not be deleted");
    } else {
      console.log(firstName);
      res.send("tenant deleted")
    }
  })
})
app.listen(3001)