import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { customer_name, email, invite_id, order_source, order_status } = req.body;

  const { data, error } = await supabase
    .from('orders')
    .insert([{ customer_name, email, invite_id, order_source, order_status }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

export default router;
