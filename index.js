import express from 'express';
import dotenv from 'dotenv';
import { carRouter } from './routes/carRoutes.js';
import { afdelingerRouter } from './routes/afdelingerRoutes.js';
import { brandRouter } from './routes/brandRoutes.js';
import { categoryRouter } from './routes/categoryRoutes.js';

dotenv.config();

const port = process.env.SERVER_PORT || 4000;
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Home (Root)
app.get('/', (req, res) => {
  res.send('Velkommen til Bilbasen - Danmarks største bilmarked!');
});

// About us
app.get('/about', (req, res) => {
  res.send('Om Bilbasen - Vi har hjulpet danskerne med bilkøb siden 1999');
  console.log('About page visited');
});

// Contact
app.get('/contact', (req, res) => {
  res.send('Kontakt Bilbasen - Ring til os på 70 10 10 15');
  console.log('Contact page visited');
});

// API routes med CRUD funktionalitet
app.use('/api/cars', carRouter);
app.use('/api/brands', brandRouter);
app.use('/api/categories', categoryRouter);

// Eksisterende routes
app.use('/cars', carRouter);
app.use('/afdelinger', afdelingerRouter);
app.use('/brands', brandRouter);
app.use('/categories', categoryRouter);

// 404 Error Handler
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page "${req.originalUrl}" does not exist on our website.</p>
    <a href="/">Go back to homepage</a>
  `);
  console.log(`404 error - Attempted to access: ${req.originalUrl}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
