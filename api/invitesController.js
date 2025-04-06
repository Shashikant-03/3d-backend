import { supabase } from '../supabaseClient.js';
export async function getInvite(req, res) {
  const { slug } = req.params;

  const { data, error } = await supabase
    .from('invites')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return res.status(404).json({ error: 'Invite not found' });
  res.json(data);
}

// CREATE new invite
export async function createInvite(req, res) {
  const invite = req.body;

  const { data, error } = await supabase
    .from('invites')
    .insert(invite)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
}