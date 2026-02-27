const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

let db; // Global DB connection

// Connect to MySQL with Retry
function connectWithRetry() {
  console.log("Trying to connect to MySQL...");

  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  db.connect(err => {
    if (err) {
      console.error("DB connection failed. Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to MySQL database");

      // Create table if not exists
      db.query(`
        CREATE TABLE IF NOT EXISTS students (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          roll VARCHAR(50)
        )
      `);
    }
  });
}

// Start DB connection
connectWithRetry();


// ================= CRUD APIs =================

// CREATE
app.post("/students", (req, res) => {
  const { name, roll } = req.body;

  db.query(
    "INSERT INTO students (name, roll) VALUES (?, ?)",
    [name, roll],
    err => {
      if (err) return res.status(500).send(err);
      res.send("Student added");
    }
  );
});

// READ
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// UPDATE
app.put("/students/:id", (req, res) => {
  const { name, roll } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE students SET name=?, roll=? WHERE id=?",
    [name, roll, id],
    err => {
      if (err) return res.status(500).send(err);
      res.send("Student updated");
    }
  );
});

// DELETE
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM students WHERE id=?",
    [id],
    err => {
      if (err) return res.status(500).send(err);
      res.send("Student deleted");
    }
  );
});

// Start server
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running");
});
