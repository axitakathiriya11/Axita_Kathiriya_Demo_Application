const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/data", async (req, res) => {
  try {
    const { cname, cin } = req.body;
    const newCompany = await pool.query(
      "INSERT INTO companies (cname, cin) VALUES($1, $2)",
      [cname, cin]
    );
    res.json(newCompany);
  } catch (err) {
    console.log(err);
    res.json("Found duplicate keys");
  }
});

app.get("/data", async (req, res) => {
  try {
    const newTodo = await pool.query("SELECT * FROM companies");
    res.json(newTodo.rows);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.listen(7000, () => {
  console.log("Server connected at post 7000");
});
