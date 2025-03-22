import express from 'express';
import pool from './PoolConnection.js';

const projectTechnologyRouter = express.Router();

// GET technologies for a project
projectTechnologyRouter.get('/technologies/:project_id', async (req, res) => {
    const { project_id } = req.params;
    try {
        const result = await pool.query(
            'SELECT technology_id FROM ProjectTechnologies WHERE project_id = $1',
            [project_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all projects for a technology
projectTechnologyRouter.get('/projects/:technology_id', async (req, res) => {
    const { technology_id } = req.params;
    try {
        const result = await pool.query(
            'SELECT project_id FROM ProjectTechnologies WHERE technology_id = $1',
            [technology_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET a specific technology for a project
projectTechnologyRouter.get('/:project_id/:technology_id', async (req, res) => {
    const { project_id, technology_id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM ProjectTechnologies WHERE project_id = $1 AND technology_id = $2',
            [project_id, technology_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('ProjectTechnology not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE a technology from a project
projectTechnologyRouter.get('/delete/:project_id/:technology_id', async (req, res) => {
    const { project_id, technology_id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM ProjectTechnologies WHERE project_id = $1 AND technology_id = $2 RETURNING *',
            [project_id, technology_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'ProjectTechnology not found' });
        }
        res.json({ msg: 'ProjectTechnology deleted' });
        console.log('ProjectTechnology deleted:', result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default projectTechnologyRouter;