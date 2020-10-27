import socketio from 'socket.io-client';
import { API_SUPER } from './constants';

const socket = socketio(API_SUPER, {
  autoConnect: false,
});

const subscribeToNewItem = (subscribeFunction) => {
  socket.on('new-item', subscribeFunction);
};

const subscribeToNotification = (subscribeFunction) => {
  console.warn('epa');
  socket.on('solicitation-group', subscribeFunction);
};

const connectUser = (usuariosId: string) => {
  socket.io.opts.query = {
    usuariosId
  };

  socket.connect();
};

const connect = (gruposId: string) => {
  socket.io.opts.query = {
      gruposId
  };

  socket.connect();
};

const disconnect = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export {
  connectUser,
  connect,
  disconnect,
  subscribeToNewItem,
  subscribeToNotification,
};
