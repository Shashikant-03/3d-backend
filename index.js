import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import invitesRoutes from './api/invites.js';
import mediaRoutes from './api/media.js';
import templatesRoutes from './api/templates.js';
import ordersRoutes from './api/orders.js';
import inviteWithModelRoutes from './api/inviteWithModel.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/invites', invitesRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/templates', templatesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/invite', inviteWithModelRoutes); // includes model_url

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
