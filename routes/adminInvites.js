// routes/adminInvites.js
const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');
const verifyAdmin = require('../middleware/adminAuth');

// GET invite by ID (includes media files)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('invites')
    .select('*, media_files(*)')
    .eq('id', id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ ...data, media: data.media_files || [] });
});

// CREATE invite (admin only)
router.post('/', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('invites')
    .insert([req.body])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;