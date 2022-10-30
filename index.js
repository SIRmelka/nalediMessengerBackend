const express = require("express");
const http = require("http");
const cors = require("cors");
const passport = require("passport");
const users = require("./routes/users");
const messages = require("./routes/messages");
const { Server } = require("socket.io");
require("./middlewares/authentification");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("user " + socket.id + " connected");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("sendmessage", (data) => {
    console.log(data);
    socket.broadcast.emit("newmessage", data);
  });
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const restrictor = passport.authenticate("jwt", { session: false });
app.use("/", (req, res) => {
  res.json("Welcome to naledi messenger api");
});
app.use("/users/", users);
app.use("/api/messages/", restrictor, messages);

server.listen(3001, () => {
  console.log("server running on port 3001");
});

module.exports = server;
