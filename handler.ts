import express from "express";
import serverless from "serverless-http";
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const app = express();

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: "test",
});

app.get("/inspections/get", (_, res) => {
  pool.query("SELECT * FROM Inspections;", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Data: ", JSON.parse(JSON.stringify(results)));

    let data = JSON.parse(JSON.stringify(results));

    return res.status(200).json({ data });
  });
});

app.get("/inspections/get/:id", (req, res) => {
  pool.query(
    "SELECT * FROM Inspections WHERE id = ?;",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Data: ", JSON.parse(JSON.stringify(results)));

      let data = JSON.parse(JSON.stringify(results));

      return res.status(200).json({ data });
    },
  );
});

if (process.env.NODE_ENV === "dev") {
  console.log("Detected Dev mode");
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
} else {
  exports.handler = serverless(app);
}
