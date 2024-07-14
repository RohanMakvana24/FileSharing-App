import express from "express";
import {
  DounloadFile,
  FileUpload,
  SendFileEmail,
  showFile,
} from "../Controllers/FileController.js";

const Routes = express.Router();

// ROUTES //
Routes.post("/myfile", FileUpload);
Routes.get("/files/:uuid", showFile);
Routes.get("/files/dounload/:uuid", DounloadFile);
Routes.post("/files/send", SendFileEmail);

export default Routes;
