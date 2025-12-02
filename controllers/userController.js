import { prisma } from '../prisma.js';
import * as bcrypt from 'bcrypt';

// GET - Hent liste af flere rækker
export const getRecords = async (req, res) => {
  try {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        isActive: true,
        // password: false - Skjul password i responses
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke hente liste af brugere' });
  }
};

// GET - Hent detaljer for en enkelt række
export const getRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        isActive: true,
        // password: false - Skjul password i responses
      },
    });

    if (!data) {
      return res.status(404).json({ error: 'Bruger ikke fundet' });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke hente bruger' });
  }
};

// POST - Opret række
export const createRecord = async (req, res) => {
  console.log('=== USER CREATE DEBUG ===');
  console.log('req.body:', req.body);

  const { firstname, lastname, email, password, role, isActive } = req.body;

  console.log('Extracted values:', { firstname, lastname, email, password, role, isActive });

  if (!firstname || !lastname || !email || !password) {
    console.log('Validation failed - missing required fields');
    return res.status(400).json({ error: 'Firstname, lastname, email og password er påkrævet' });
  }

  console.log('Validation passed, attempting database create...');

  try {
    // Temporær test uden bcrypt
    const data = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: password, // Gemmer password uden kryptering midlertidigt
        role: role || 'USER',
        isActive: isActive ? Boolean(isActive) : true,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        isActive: true,
        // password: false - Skjul password i response
      },
    });

    console.log('Database create successful:', data);
    return res.status(201).json(data);
  } catch (error) {
    console.error('=== DATABASE ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);

    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email eksisterer allerede' });
    }

    return res.status(500).json({ error: 'Noget gik galt i serveren' });
  }
};

// PUT - Opdater række
export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, password, role, isActive } = req.body;

    // Tjek om bruger eksisterer
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'Bruger ikke fundet' });
    }

    // Opbyg update data objekt
    const updateData = {
      firstname,
      lastname,
      email,
      role,
      isActive: isActive ? Boolean(isActive) : undefined,
    };

    // Kun hash password hvis det er sendt med (undgå dobbelt kryptering)
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Fjern undefined værdier
    Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

    const data = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        isActive: true,
        // password: false - Skjul password i response
      },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke opdatere bruger' });
  }
};

// DELETE - Slet
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    // Tjek om bruger eksisterer
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'Bruger ikke fundet' });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette bruger' });
  }
};
