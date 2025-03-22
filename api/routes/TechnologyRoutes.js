import express from "express";
import pool from "./PoolConnection.js";

const technologies = express.Router();

// GET all technologies
technologies.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM technologies");
    res.json(result.rows);
  } catch (error) {
    console.error("Query error trying to retrieve all technologies:", error);
    res.status(500).send("Error retrieving technologies");
  }
});

// GET technology by ID
technologies.get("/:id", async (req, res) => {
  const technologyId = parseInt(req.params.id);
  try {
    const result = await pool.query(
      "SELECT * FROM technologies WHERE id = $1",
      [technologyId]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Technology not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log("Query error tring to retrieve technology");
    res.status(500).send("Error retrieving technology");
  }
});

// DELETE technology by ID
technologies.get("/delete/:id", async (req, res) => {
  const technologyId = parseInt(req.params.id);
  try {
    const result = await pool.query(
      "DELETE FROM technologies WHERE id = $1 RETURNING *",
      [technologyId]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Technology not found");
    }
    res.json({ msg: "User deleted" });
    console.log('User deleted:', result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default technologies
