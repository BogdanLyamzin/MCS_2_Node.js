import { Server } from "socket.io";
import {createServer} from "http";

const httpServer = createServer();

const wsServer = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

wsServer.on("connection", (socket)=> {
    // console.log("Success connection");
    socket.on("chat-message", data => {
        socket.broadcast.emit("chat-message", data);
    })

    socket.on("disconnect", ()=> {
        console.log("Frontend close chat")
    })
})

httpServer.listen(5000);