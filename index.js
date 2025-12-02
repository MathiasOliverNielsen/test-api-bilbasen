import express from 'express';
import dotenv from 'dotenv';
import { carRouter } from './routes/carRoutes.js';
import { afdelingerRouter } from './routes/afdelingerRoutes.js';
import { brandRouter } from './routes/brandRoutes.js';
import { categoryRouter } from './routes/categoryRoutes.js';
import { userRouter } from './routes/userRoutes.js';

dotenv.config();

const port = process.env.SERVER_PORT || 4000;
const app = express();

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware (fjernet for production)

// Home (Root)
app.get('/', (req, res) => {
  res.send('Velkommen til Bilbasen - Danmarks største bilmarked!');
});

// About us
app.get('/about', (req, res) => {
  res.send('Om Bilbasen - Vi har hjulpet danskerne med bilkøb siden 1999');
});

// Contact
app.get('/contact', (req, res) => {
  res.send('Kontakt Bilbasen - Ring til os på 70 10 10 15');
});

// API routes
app.use('/cars', carRouter);
app.use('/afdelinger', afdelingerRouter);
app.use('/brands', brandRouter); // Fixed from '/e'
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

// 404 Error Handler
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page "${req.originalUrl}" does not exist on our website.</p>
    <a href="/">Go back to homepage</a>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
