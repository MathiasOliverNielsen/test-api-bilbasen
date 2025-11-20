import { Router } from 'express';

const router = Router();

// Alle afdelinger
router.get('/', (req, res) => {
  res.send('Find vores afdelinger i hele Danmark');
  console.log('Afdelinger hovedside besøgt');
});

// Jylland
router.get('/jylland', (req, res) => {
  res.send('Bilbasen afdelinger i Jylland');
  console.log('Jylland afdelinger besøgt');
});

// Fyn
router.get('/fyn', (req, res) => {
  res.send('Bilbasen afdelinger på Fyn');
  console.log('Fyn afdelinger besøgt');
});

// Sjælland
router.get('/sjaelland', (req, res) => {
  res.send('Bilbasen afdelinger på Sjælland');
  console.log('Sjælland afdelinger besøgt');
});

export { router as afdelingerRouter };
