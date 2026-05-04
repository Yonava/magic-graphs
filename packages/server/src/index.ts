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

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || LOCALHOST_PORT;

server.listen(Number(PORT), () => {
  console.log(`Server listening on port ${PORT}`);
});

sockets(server);
