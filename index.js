import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/database/connectDB.js";
import Routes from "./Router/Routre.js";
//DOTENV CONFIG
dotenv.config();

//DATABASE CONFIG
ConnectDB();

//SERVER SETUP
const port = process.env.PORT;
const server = express();

//ROUTES
server.use("/api/v1", Routes);

//EJS
server.set("view engine", "ejs");

//SERVER  LISTEN
server.listen(port, () => {
  console.log(`Server is Start on port : ${port}`);
});
