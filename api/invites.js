import express from 'express';
import { getInvite, createInvite } from './invitesController.js';

const router = express.Router();

router.get('/:id', getInvite);
router.post('/', createInvite);

export default router;
