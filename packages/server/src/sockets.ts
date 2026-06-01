import { createServer } from 'http';
import { Server } from 'socket.io';

export const sockets = (httpServer: ReturnType<typeof createServer>) => {
  const io = new Server<{}, {}, {}, {}>(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    socket.on('error', (error) => {
      console.error(error);
    });
  });

  return io;
};
