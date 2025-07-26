const express = require("express");

const http = require("http");

const cors = require("cors");

const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);


app.use(cors());

app.use(express.static("public"));


const io = new Server(server, {

    cors: {

        origin: "*", // Allow all origins

        methods: ["GET", "POST"]

    }

});

// Socket.io logic

io.on("connection", (socket) => {

    console.log("Client connected:", socket.id);

    socket.on("ping", (data) => {

        console.log(`Ping received at ${Date.now()} from ${socket.id}`);

        socket.emit("pong", { time: Date.now() });

    });

    socket.on("disconnect", () => {

        console.log("Client disconnected:", socket.id);

    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});