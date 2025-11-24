import { Router } from 'express';
import { getRecords, getRecord, createRecord, updateRecord, deleteRecord } from '../controllers/categoryController.js';

const router = Router();

// CRUD routes
router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', createRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export { router as categoryRouter };
