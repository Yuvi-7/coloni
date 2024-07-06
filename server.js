const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0"; // Bind to all network interfaces
const port = process.env.PORT || 3001;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  // Enable CORS for all origins, you can customize options if needed
  httpServer.use(
    cors({
      origin: "http://13.232.18.107:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true, // Enable credentials if your client uses cookies, sessions, etc.
    })
  );

  const io = new Server(httpServer);

  // Socket.IO logic here

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}, SOCKET.IO`);
  });

  httpServer.on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
  });
});
