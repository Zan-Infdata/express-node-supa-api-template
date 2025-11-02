import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import apiRouter from "./routes/api";
import morgan from "morgan";

//Import internal files,modules,functions,routes

//app configs
const app = express();
const PORT = process.env.PORT || 9000; //assign server port
app.use(express.json());
app.use(morgan("dev"));


// adding Helmet to enhance your API's security
app.use(helmet());


// using bodyParser to parse JSON bodies into JS objects
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

  
// enabling CORS for all requests
app.use(cors());
//app.use(cors({
//  origin: process.env.CLIENT_URL || '*', // replace * with your frontend URL
//  credentials: true
//}));


// General error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error for debugging
  res.status(err.status || 500).json({ message: err.message });
});

//handling .env errors
if (process.env.PORT) {
  console.log("Environment variable loaded from .env file");
} else {
  console.error(".env variable PORT isn't loading");
}


/**
 * API routing
 */
app.use("/", apiRouter);


// Listening server in speicified port
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});


