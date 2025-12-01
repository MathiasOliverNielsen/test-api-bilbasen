import { prisma } from '../prisma.js';

// GET - Hent liste af flere rækker
export const getRecords = async (req, res) => {
  try {
    const data = await prisma.category.findMany({
      include: {
        cars: true,
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke hente liste af kategorier' });
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

    if (!data) {
      return res.status(404).json({ error: 'Category ikke fundet' });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke hente kategori' });
  }
};

// POST - Opret række
export const createRecord = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name er påkrævet' });
  }

  try {
    const data = await prisma.category.create({
      data: {
        name,
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Category navn eksisterer allerede' });
    }

    return res.status(500).json({ error: 'Noget gik galt i serveren' });
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
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke opdatere kategori' });
  }
};

// DELETE - Slet
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette kategori' });
  }
};
