import { prisma } from '../prisma.js';

// GET - Hent liste af flere rækker
export const getRecords = async (req, res) => {
  try {
    const data = await prisma.car.findMany({
      include: {
        category: true,
        brand: true,
      },
    });
    console.log('carController - getRecords kaldt');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke hente liste af biler`);
  }
};

// GET - Hent detaljer for en enkelt række
export const getRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.car.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        brand: true,
      },
    });
    console.log(`carController - getRecord kaldt for ID: ${id}`);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke hente bil`);
  }
};

// POST - Opret række
export const createRecord = async (req, res) => {
  try {
    const data = await prisma.car.create({
      data: req.body,
    });
    console.log('carController - createRecord kaldt');
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke oprette bil`);
  }
};

// PUT - Opdater række
export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.car.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    console.log(`carController - updateRecord kaldt for ID: ${id}`);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke opdatere bil`);
  }
};

// DELETE - Slet
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.car.delete({
      where: { id: parseInt(id) },
    });
    console.log(`carController - deleteRecord kaldt for ID: ${id}`);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke slette bil`);
  }
};
