import { io } from 'socket.io-client';
 
const socket = io('wss://api.studypulse.live', {

  path: "/socket.io",

  transports: ['websocket'],

  reconnection: true,

  reconnectionAttempts: 5,

  cors: {

    origin: "*",

  }

});
 
export const joinDiscussion = (discussionId) => {

  socket.emit('join-discussion', { discussionId });

};
 
export const sendMessage = (roomId, message) => {

  socket.emit('get-message', { roomId, message });

};
 
export const listenForMessages = (callback) => {

  socket.on('get-message', callback);

};
 
export default socket;

 