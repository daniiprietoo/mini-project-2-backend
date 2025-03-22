import express from 'express';
import pool from './PoolConnection.js';

const userRouter = express.Router();

// Get all users
userRouter.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).send('Error retrieving users');
  }
});

// Get user by ID
userRouter.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).send('Error retrieving user');
  }
});

// Delete user by ID
userRouter.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User deleted' });
    console.log('User deleted:', result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default userRouter;



