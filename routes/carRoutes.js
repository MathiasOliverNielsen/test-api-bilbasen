import { Router } from 'express';

const router = Router(); // Fejl rettelse: var "routerx()"

// Bil liste
router.get('/', (req, res) => {
  res.send('Se alle vores biler til salg');
  console.log('Bil liste side besøgt');
});

// Bil detaljer
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Detaljer for bil med ID: ${id}`);
  console.log(`Bil detaljer for ID ${id} besøgt`);
});

export { router as carRouter };
