"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const sockets_1 = require("./sockets");
const http_1 = require("http");
const constants_1 = require("./constants");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
const PORT = process.env.PORT || constants_1.LOCALHOST_PORT;
server.listen(Number(PORT), () => {
    console.log(`Server listening on port ${PORT}`);
});
(0, sockets_1.sockets)(server);
