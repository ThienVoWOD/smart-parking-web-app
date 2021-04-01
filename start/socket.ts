import socketIo from "socket.io";
import Server from "@ioc:Adonis/Core/Server";

/**
 * Pass AdonisJS http server instance to socketIo.
 */
const io = socketIo(Server.instance!);

/**
 * Standard business from here
 */
io.on("connection", (socket) => {
  socket.emit("news", { hello: "world" });

  socket.on("my other event", (data) => {
    console.log(data);
  });
});
