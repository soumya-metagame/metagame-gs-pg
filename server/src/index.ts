import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import paymentUrl from './routes/paymentUrl.route'
import {errors} from 'celebrate'
import cors from "cors";

dotenv.config();
import config from "../config";
import swaggerDocs from "./doc/swagger";


const app: Express = express();
const PORT = config.port;
const DB = config.database.connectionString;


app.use(express.json());
app.use(cors());
app.use("/api/v1",paymentUrl );
app.use(errors());



connect(DB as string)
  .then((connection) => {
    console.log(
      ` Payment Gateway database successfully running on ${connection.connection.host}`
    );
    app.listen(PORT, () => {
      console.log(`Payment Gateway server is running on port ${PORT}`);
      swaggerDocs(app, PORT);
    });
  })
  .catch((err) => console.log(`Error: ${err}`));