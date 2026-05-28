import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

import { LOCALHOST_PORT } from './constants.ts';
import { sockets } from './sockets.ts';

dotenv.config();

const app = express();
const server = createServer(app);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

app.get(/.*/, (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');
  res.sendFile(indexPath);
});

const PORT = process.env.PORT || LOCALHOST_PORT;

server.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

sockets(server);
