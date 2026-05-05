import dotenv from "dotenv";
import express from "express";
import { sockets } from "./sockets";
import { createServer } from "http";
import { LOCALHOST_PORT } from "./constants";
import path from "path";

dotenv.config();

const app = express();
const server = createServer(app);

app.use(express.json());

const publicPath = path.resolve(__dirname, "dist", "public");

app.use(express.static(publicPath));

app.get(/.*/, (req, res) => {
  const indexPath = path.join(publicPath, "index.html");
  res.sendFile(indexPath);
});

const PORT = process.env.PORT || LOCALHOST_PORT;

server.listen(Number(PORT), () => {
  console.log(`Server listening on port ${PORT}`);
});

sockets(server);
