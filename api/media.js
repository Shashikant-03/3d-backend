import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

router.get('/:inviteId', async (req, res) => {
  const { inviteId } = req.params;

  const { data, error } = await supabase
    .from('media_files')
    .select('*')
    .eq('invite_id', inviteId);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
