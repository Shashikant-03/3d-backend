import { supabase } from '../supabaseClient.js';

export async function getInvite(req, res) {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('invites')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

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
