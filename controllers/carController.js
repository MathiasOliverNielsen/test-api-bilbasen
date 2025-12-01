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
    res.status(500).json({ error: 'Kunne ikke hente liste af biler' });
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

    if (!data) {
      return res.status(404).json({ error: 'Bil ikke fundet' });
    }

    console.log(`carController - getRecord kaldt for ID: ${id}`);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke hente bil' });
  }
};

// POST - Opret række
export const createRecord = async (req, res) => {
  const { categoryId, brandId, model, year, price, fueltype } = req.body;

  if (!categoryId || !brandId || !model || !year || !price || !fueltype) {
    return res.status(400).json({ error: 'Alle felter skal udfyldes' });
  }

  try {
    const data = await prisma.car.create({
      data: {
        categoryId: parseInt(categoryId),
        brandId: parseInt(brandId),
        model,
        year: parseInt(year),
        price: parseFloat(price),
        fueltype,
      },
      include: {
        category: true,
        brand: true,
      },
    });

    console.log('carController - createRecord kaldt');
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);

    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Ugyldig category eller brand ID' });
    }

    return res.status(500).json({ error: 'Noget gik galt i serveren' });
  }
};

// PUT - Opdater række
export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;

    // Tjek om bil eksisterer
    const existingCar = await prisma.car.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCar) {
      return res.status(404).json({ error: 'Bil ikke fundet' });
    }

    const data = await prisma.car.update({
      where: { id: parseInt(id) },
      data: req.body,
      include: {
        category: true,
        brand: true,
      },
    });
    console.log(`carController - updateRecord kaldt for ID: ${id}`);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke opdatere bil' });
  }
};

// DELETE - Slet
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    // Tjek om bil eksisterer
    const existingCar = await prisma.car.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCar) {
      return res.status(404).json({ error: 'Bil ikke fundet' });
    }

    await prisma.car.delete({
      where: { id: parseInt(id) },
    });
    console.log(`carController - deleteRecord kaldt for ID: ${id}`);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette bil' });
  }
};
