import { prisma } from '../prisma.js';

// GET - Hent liste af flere rækker
export const getRecords = async (req, res) => {
  try {
    const data = await prisma.brand.findMany({
      include: {
        cars: true,
      },
    });
    console.log('brandController - getRecords kaldt');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke hente liste af brands' });
  }
};

// GET - Hent detaljer for en enkelt række
export const getRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.brand.findUnique({
      where: { id: parseInt(id) },
      include: {
        cars: true,
      },
    });

    if (!data) {
      return res.status(404).json({ error: 'Brand ikke fundet' });
    }

    console.log(`brandController - getRecord kaldt for ID: ${id}`);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke hente brand' });
  }
};

// POST - Opret række
export const createRecord = async (req, res) => {
  const { name, logo } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name er påkrævet' });
  }

  try {
    const data = await prisma.brand.create({
      data: {
        name,
        logo: logo || null,
      },
    });

    console.log('brandController - createRecord kaldt');
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Brand navn eksisterer allerede' });
    }

    return res.status(500).json({ error: 'Noget gik galt i serveren' });
  }
};

// PUT - Opdater række
export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.brand.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    console.log(`brandController - updateRecord kaldt for ID: ${id}`);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke opdatere brand' });
  }
};

// DELETE - Slet
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.brand.delete({
      where: { id: parseInt(id) },
    });
    console.log(`brandController - deleteRecord kaldt for ID: ${id}`);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette brand' });
  }
};
