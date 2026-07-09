let io;

module.exports = {
  init: (serverIo) => {
    io = serverIo;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  }
};