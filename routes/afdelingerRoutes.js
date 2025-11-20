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

// Jylland cars
router.get('/jylland/cars', (req, res) => {
  res.send('Alle biler til salg i Jylland');
  console.log('Jylland biler liste besøgt');
});

router.get('/jylland/cars/:id', (req, res) => {
  const carId = req.params.id;
  res.send(`Bil detaljer for bil ${carId} i Jylland`);
  console.log(`Jylland bil ${carId} detaljer besøgt`);
});

// Fyn
router.get('/fyn', (req, res) => {
  res.send('Bilbasen afdelinger på Fyn');
  console.log('Fyn afdelinger besøgt');
});

// Fyn cars
router.get('/fyn/cars', (req, res) => {
  res.send('Alle biler til salg på Fyn');
  console.log('Fyn biler liste besøgt');
});

router.get('/fyn/cars/:id', (req, res) => {
  const carId = req.params.id;
  res.send(`Bil detaljer for bil ${carId} på Fyn`);
  console.log(`Fyn bil ${carId} detaljer besøgt`);
});

// Sjælland
router.get('/sjaelland', (req, res) => {
  res.send('Bilbasen afdelinger på Sjælland');
  console.log('Sjælland afdelinger besøgt');
});

// Sjælland cars
router.get('/sjaelland/cars', (req, res) => {
  res.send('Alle biler til salg på Sjælland');
  console.log('Sjælland biler liste besøgt');
});

router.get('/sjaelland/cars/:id', (req, res) => {
  const carId = req.params.id;
  res.send(`Bil detaljer for bil ${carId} på Sjælland`);
  console.log(`Sjælland bil ${carId} detaljer besøgt`);
});

export { router as afdelingerRouter };
