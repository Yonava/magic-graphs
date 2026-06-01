import { SocketEvents } from '@magic/graph/collab/types';
import { createServer } from 'http';
import { Server } from 'socket.io';

export const sockets = (httpServer: ReturnType<typeof createServer>) => {
  const io = new Server<SocketEvents, SocketEvents, {}, {}>(httpServer, {
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
