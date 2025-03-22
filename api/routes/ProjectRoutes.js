import express from "express";
import pool from "./PoolConnection.js";

const projects = express.Router();

// GET all projects
projects.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects");
    res.json(result.rows);
  } catch (error) {
    console.error("Query error trying to retrieve all projects:", error);
    res.status(500).send("Error retrieving projects");
  }
});

// GET projects by id
projects.get("/:id", async (req, res) => {
  const projectId = parseInt(req.params.id);
  try {
    const result = await pool.query(
      "SELECT * FROM projects WHERE id = $1",
      [projectId]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Project not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log("Query error tring to retrieve project", error);
    res.status(500).send("Error retrieving project");
  }
});

// DELETE project by ID
projects.get("/delete/:id", async (req, res) => {
  const projectId = parseInt(req.params.id);
  try {
    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [projectId]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Project not found");
    }
    res.json({ msg: "Project deleted" });
    console.log('Project deleted:', result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default projects
