// import { createServer } from "node:http";
const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

// import next from "next";
// import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  const userSockets = {};

  io.on("connection", (socket) => {
    // ...

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      // Remove the socket reference when a client disconnects
      Object.keys(userSockets).forEach((userId) => {
        if (userSockets[userId] === socket) {
          delete userSockets[userId];
        }
      });
    });

    // When a user connects, store their socket instance
    socket.on("userConnected", (userID) => {
      // console.log("userIDXX", userSockets);
      userSockets[userID] = socket;
    });

    socket.on("sent_friend_req", (userID, msg) => {
      const room = userSockets[userID];
      if (room) {
        const operator1 = io.to(room?.id); // to vikas user
        operator1.emit("notification", msg);
      }
    });

    socket.on("join_room", (userID) => {
      socket.join(userID);
    });

    socket.on(
      "private_message",
      ({ recipientID, message, recipientDetail }) => {
        // Emit the message only to the recipient's room

        console.log(recipientID, "recipientID", recipientDetail);

        io.to(recipientID).emit("private_message", {
          senderID: socket.id,
          message,
          recipientDetail,
        });
      }
    );
  });

  // socket.on("message", (userID, msg) => {
  //   const room = userSockets[userID];

  //   if (room) {
  //     const operator1 = io.to(room?.id);
  //     operator1.emit("message", msg);
  //   }
  // });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}, SCOKET>IO`);
    });
});
