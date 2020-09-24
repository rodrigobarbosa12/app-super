import socketio from 'socket.io-client';
import { API_SUPER } from './constants';

const socket = socketio(API_SUPER, {
  autoConnect: false,
});

const subscribeToNewItem = (subscribeFunction) => {
  socket.on('novo item', subscribeFunction);
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
  connect,
  disconnect,
  subscribeToNewItem,
};
