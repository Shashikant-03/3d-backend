import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import inviteRoutes from './api/invites.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/invites', inviteRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the 3D Invite API!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
