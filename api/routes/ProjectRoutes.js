import express from "express";
import pool from "./PoolConnection.js";

const projects = express.Router();

projects.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects");
    res.json(result.rows);
  } catch (error) {
    console.error("Query error trying to retrieve all projects:", error);
    res.status(500).send("Error retrieving projects");
  }
});

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

projects.post("/:id", async (req, res) => {
  const { title, description, live_url, github_url, image_url, user_id} = req.body;
  user_id = parseInt(user_id)
  try {
    const result = await pool.query(
      "INSERT INTO project (title, description, live_url, github_url, image_url, user_id) VALUES ($1,$2,$3,$4,$5,$6)",
      [title, description, live_url, github_url, image_url, user_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log('Error posting project', error);
    res.status(500).send("Server error");
  }
});

projects.get("/:id", async (req, res) => {
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
