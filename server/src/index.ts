import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import paymentUrl from './routes/paymentUrl.route'
import {errors} from 'celebrate'
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io';
dotenv.config();
import config from "../config";
import swaggerDocs from "./doc/swagger";


const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Replace with your frontend origin
    methods: ['GET', 'POST'],
  },
});
const PORT = config.port;
const DB = config.database.connectionString;


app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));
app.use("/api/v1",paymentUrl );
app.use(errors());





try {
  io.on('connection', (socket: any) => {
    console.log('A user connected', socket);

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  server.listen(PORT, () => {
    console.log(`Payment Gateway server with Socket.IO is running on port ${PORT}`);
    swaggerDocs(app, PORT);
  });
} catch (error) {
  console.error(error);
}


connect(DB as string)
  .then((connection) => {
    console.log(
      `Payment Gateway database successfully running on ${connection.connection.host}`
    );
  })
  .catch((err) => console.log(`Error: ${err}`));


export {
  io
}