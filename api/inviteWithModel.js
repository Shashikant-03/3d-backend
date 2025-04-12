import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  const { data: invite, error } = await supabase
    .from('invites')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !invite) return res.status(404).json({ error: 'Invite not found' });

  const { data: modelData, error: modelError } = await supabase
    .from('media_files')
    .select('url')
    .eq('invite_id', invite.id)
    .eq('type', 'model')
    .single();

  if (modelError) return res.status(500).json({ error: modelError.message });

  res.json({ ...invite, model_url: modelData.url });
});

export default router;
