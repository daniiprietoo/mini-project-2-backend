import express from 'express';
import cors from 'cors';
import users from './routes/UserRoutes.js';
import technologies from './routes/TechnologyRoutes.js';
import projects from './routes/ProjectRoutes.js';
// import projectTechnologyRouter from './routes/ProjectTechnologiesRoutes.js';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', users);
app.use('/technologies', technologies);
app.use('/projects', projects);
// app.use('/project-technologies', projectTechnologyRouter);

app.get('/', (req, res) => {
  try {
    res.send('Hello from Express Server');
  } catch (error) {
    console.error('Query error:', error);
    res.send(' Sorry Error');
  }
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app