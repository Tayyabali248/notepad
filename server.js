const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const { dbConnection } = require("./db");

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

dbConnection();

module.exports = { io };

require("./config/sockets");

app.get("/", (req, res) => {
  res.send(`App is running on ${port}`);
});

app.use((req, res) => {
  res
    .status(404)
    .json({ status: 404, success: false, message: "Route not found" });
});

app.use((err, res) => {
  console.error("error stack", err.stack);
  res.status(500).json({ error: err.stack });
});

// Server listening
server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
