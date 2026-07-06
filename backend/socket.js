let io;

const initializeSocket = (socketIO) => {
  io = socketIO;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized.");
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};
