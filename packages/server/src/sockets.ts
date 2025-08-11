import { Server } from 'socket.io'
import type { Collaborator, SocketEvents } from './clientTypes'
import { createServer } from 'http'
import { trackGraphState } from './trackGraphState'

export const sockets = (httpServer: ReturnType<typeof createServer>) => {
  const io = new Server<SocketEvents, SocketEvents, {}, {}>(httpServer, {
    cors: {
      origin: '*',
    },
  })

  /**
   * a map of collaborator ids to their details and the room they are in
   */
  const collaboratorIdToCollaborator: Record<string, Collaborator> = {}

  /**
   * a map of collaborator ids to the room they are in
   */
  const collaboratorIdToRoomId: Record<string, string> = {}

  io.on('connection', (socket) => {

    const tracker = trackGraphState()

    socket.on('joinRoom', async (joinRoomOptions, callback) => {
      const {
        me,
        roomId: myRoomId,
        graphState: myGraphState
      } = joinRoomOptions

      tracker.setRoomId(myRoomId)

      socket.join(myRoomId)
      socket.broadcast.to(myRoomId).emit('collaboratorJoined', me)

      const existingGraphState = tracker.getGraphState()
      if (!existingGraphState) tracker.setGraphState(myGraphState)

      callback(collaboratorIdToCollaborator, tracker.getGraphState())

      collaboratorIdToCollaborator[socket.id] = me
      collaboratorIdToRoomId[socket.id] = myRoomId
    })

    socket.on('leaveRoom', (confirmationCallback) => {
      socket.leave(tracker.getRoomId())
      try {
        const roomId = tracker.getRoomId()
        const room = io.sockets.adapter.rooms.get(roomId)
        if (!room || room.size === 0) {
          console.log('room is empty, deleting graph state')
          tracker.deleteGraphState()
        }
        socket.broadcast.to(roomId).emit('collaboratorLeft', socket.id)
      } catch (error) {
        if (error instanceof Error) {
          console.error('while trying to delete graph state -', error.message)
        } else {
          console.error('unknown error while trying to delete graph state', error)
        }
      }

      delete collaboratorIdToCollaborator[socket.id]
      confirmationCallback()
    })

    socket.on('nodeAdded', (node) => {
      tracker.addNode(node)
      socket.broadcast.to(tracker.getRoomId()).emit('nodeAdded', node)
    })

    socket.on('nodeRemoved', (nodeId) => {
      tracker.removeNode(nodeId)
      socket.broadcast.to(tracker.getRoomId()).emit('nodeRemoved', nodeId)
    })

    socket.on('nodeMoved', (node) => {
      tracker.updateNode(node.id, node)
      socket.broadcast.to(tracker.getRoomId()).emit('nodeMoved', node)
    })

    socket.on('edgeAdded', (edge) => {
      tracker.addEdge(edge)
      socket.broadcast.to(tracker.getRoomId()).emit('edgeAdded', edge)
    })

    socket.on('edgeRemoved', (edgeId) => {
      tracker.removeEdge(edgeId)
      socket.broadcast.to(tracker.getRoomId()).emit('edgeRemoved', edgeId)
    })

    socket.on('edgeLabelEdited', (edgeId, newLabel) => {
      tracker.updateEdge(edgeId, { label: newLabel })
      socket.broadcast.to(tracker.getRoomId()).emit('edgeLabelEdited', edgeId, newLabel)
    })

    socket.on('collaboratorMoved', ({ x, y }) => {
      const roomId = collaboratorIdToRoomId[socket.id]
      if (!roomId) return
      socket.broadcast.to(roomId).emit('collaboratorMoved', { id: socket.id, x, y })
    })

    socket.on('disconnect', () => {
      try {
        const roomId = tracker.getRoomId()
        const room = io.sockets.adapter.rooms.get(roomId)
        if (!room || room.size === 0) {
          console.log('room is empty, deleting graph state')
          tracker.deleteGraphState()
        }
        socket.broadcast.to(roomId).emit('collaboratorLeft', socket.id)
      } catch (error) {
        if (error instanceof Error) {
          console.error('while trying to delete graph state -', error.message)
        } else {
          console.error('unknown error while trying to delete graph state', error)
        }
      }

      delete collaboratorIdToCollaborator[socket.id]
    })

    socket.on('error', (error) => {
      console.error(error)
    })
  })

  return io
}
