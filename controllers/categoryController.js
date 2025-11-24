import { prisma } from '../prisma.js';

// GET - Hent liste af flere rækker
export const getRecords = async (req, res) => {
  try {
    const data = await prisma.category.findMany({
      include: {
        cars: true,
      },
    });
    console.log('categoryController - getRecords kaldt');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke hente liste af kategorier`);
  }
};

// GET - Hent detaljer for en enkelt række
export const getRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        cars: true,
      },
    });
    console.log(`categoryController - getRecord kaldt for ID: ${id}`);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke hente kategori`);
  }
};

// POST - Opret række
export const createRecord = async (req, res) => {
  try {
    const data = await prisma.category.create({
      data: req.body,
    });
    console.log('categoryController - createRecord kaldt');
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke oprette kategori`);
  }
};

// PUT - Opdater række
export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.category.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    console.log(`categoryController - updateRecord kaldt for ID: ${id}`);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke opdatere kategori`);
  }
};

// DELETE - Slet
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    console.log(`categoryController - deleteRecord kaldt for ID: ${id}`);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke slette kategori`);
  }
};
