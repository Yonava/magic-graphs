"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackGraphState = void 0;
/**
 * maps the room id to the live version of the graph for that room
 */
const roomIdToGraphState = {};
const trackGraphState = () => {
    let roomId;
    const setRoomId = (newRoomId) => {
        roomId = newRoomId;
    };
    const getRoomId = () => {
        if (!roomId)
            console.warn('room id not set');
        return roomId;
    };
    const getGraphState = () => {
        return roomIdToGraphState[getRoomId()];
    };
    const setGraphState = (graphState) => {
        roomIdToGraphState[getRoomId()] = graphState;
    };
    const deleteGraphState = () => {
        delete roomIdToGraphState[getRoomId()];
    };
    const updateEdge = (edgeId, edge) => {
        const graphState = roomIdToGraphState[getRoomId()];
        if (!graphState)
            return;
        const edgeIndex = graphState.edges.findIndex((e) => e.id === edgeId);
        if (edgeIndex === -1)
            return;
        graphState.edges[edgeIndex] = {
            ...graphState.edges[edgeIndex],
            ...edge
        };
    };
    const updateNode = (nodeId, node) => {
        const graphState = roomIdToGraphState[getRoomId()];
        if (!graphState)
            return;
        const nodeIndex = graphState.nodes.findIndex((n) => n.id === nodeId);
        if (nodeIndex === -1)
            return;
        graphState.nodes[nodeIndex] = {
            ...graphState.nodes[nodeIndex],
            ...node
        };
    };
    const removeEdge = (edgeId) => {
        const graphState = roomIdToGraphState[getRoomId()];
        if (!graphState)
            return;
        graphState.edges = graphState.edges.filter((e) => e.id !== edgeId);
    };
    const removeNode = (nodeId) => {
        const graphState = roomIdToGraphState[getRoomId()];
        if (!graphState)
            return;
        graphState.nodes = graphState.nodes.filter((n) => n.id !== nodeId);
    };
    const addEdge = (edge) => {
        const graphState = roomIdToGraphState[getRoomId()];
        if (!graphState)
            return;
        graphState.edges.push(edge);
    };
    const addNode = (node) => {
        const graphState = roomIdToGraphState[getRoomId()];
        if (!graphState)
            return;
        graphState.nodes.push(node);
    };
    return {
        getRoomId,
        setRoomId,
        getGraphState,
        setGraphState,
        deleteGraphState,
        addNode,
        removeNode,
        updateNode,
        addEdge,
        removeEdge,
        updateEdge,
    };
};
exports.trackGraphState = trackGraphState;
