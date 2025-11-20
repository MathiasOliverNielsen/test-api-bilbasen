import express from 'express';
import { carRouter } from './routes/carRoutes.js';
import { afdelingerRouter } from './routes/afdelingerRoutes.js';

const port = 4000;
const app = express();

// Home (Root)
app.get('/', (req, res) => {
  res.send('Velkommen til Bilbasen - Danmarks største bilmarked!');
  console.log('Home page visited');
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

app.use('/cars', carRouter);
app.use('/afdelinger', afdelingerRouter);

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
