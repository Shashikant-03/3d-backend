import express from 'express';
import { getInvite, createInvite } from './invitesController.js';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// GET invite data by slug
router.get('/:slug', getInvite);

// CREATE new invite
router.post('/', createInvite);

// POST log (visitor or interaction)
router.post('/:slug/log', async (req, res) => {
  const { slug } = req.params;
  const { event, meta } = req.body;

  const { error } = await supabase
    .from('logs')
    .insert({ slug, event, meta });

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: 'Logged' });
});

export default router;