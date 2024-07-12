import express from "express";
import { FileUpload } from "../Controllers/FileController.js";

const Routes = express.Router();

// ROUTES //
Routes.post("/myfile", FileUpload);
export default Routes;
