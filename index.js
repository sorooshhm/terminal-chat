const net = require("net");
const _ = require("underscore");
const server = net.createServer();
const sockets = [];

sockets.delete = (s) => {
  const index = sockets.findIndex((v) => _.isEqual(v, s));

  sockets.splice(index, 1);
};

server.on("error", (err) => {
  console.log(err);
  server.close();
});

server.on("connection", (socket) => {
  console.log("hi");
  sockets.push(socket);

  socket.once("error", (err) => {
    console.log(err);
  });
  socket.on("close", () => {
    sockets.delete(socket);
  });
  socket.on("end", () => {
    sockets.delete(socket);
  });

  socket.on("data", (data) => {
    console.log(data.toString());
    sockets.forEach((v, k) => {
      try {
        v.write(data);
      } catch (error) {}
    });
  });
});

server.listen(8080, () => {
  console.log("server is listening to port 8080");
});
