// routes/publicInvites.js
const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET invite by slug (includes media files)
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const { data, error } = await supabase
    .from('invites')
    .select('*, media_files(*)')
    .eq('slug', slug)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ ...data, media: data.media_files || [] });
});

module.exports = router;
