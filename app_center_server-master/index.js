const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");

const taskController = require('./controllers/tasks');
const usersController = require('./controllers/users');
const history = require('./controllers/history');

const corsMiddleware = require('./middlewares/cors');
const authMiddleware = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());

app.use(corsMiddleware);
// app.use(/^\/(?!signin).*$/, authMiddleware);

app.use(taskController);
app.use(history);
app.use(usersController);

const normalizePort = (val) => {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
};
  
const onError = (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
};
  
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    console.log("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "7000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

