import multer from "multer";
import upload from "../Middleware/Multer.js";
import FileModel from "../Models/FileModel.js";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//File Upload
export const FileUpload = async (req, res) => {
  try {
    //Store File
    upload(req, res, async (err) => {
      //Validate request
      if (!req.file) {
        return res.status(404).send({
          success: false,
          message: "All fields are required ",
        });
      }

      if (err) {
        return res.status(404).send({
          success: false,
          message: err.message,
        });
      }

      //Store into Database
      const file = new FileModel({
        filename: req.file.filename,
        uuid: uuidv4(),
        path: req.file.path,
        size: req.file.size,
      });

      const response = await file.save();
      return res.status(201).send({
        success: true,
        file: `${process.env.APP_BASE_URL}/api/v1/files/${response.uuid}`,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//Show File
export const showFile = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const file = await FileModel.findOne({ uuid: uuid });
    if (!file) {
      return res.render("dounload", { error: "Link is Expired" });
    }

    res.render("dounload", {
      uuid: file.uuid,
      filename: file.filename,
      filesize: file.size,
      dounload: `${process.env.APP_BASE_URL}/api/v1/files/dounload/${file.uuid}`,
    });
  } catch (error) {
    res.render("dounload", { error: "Somenthing Went Wrong" });
  }
};

//Dounload File
export const DounloadFile = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const file = await FileModel.findOne({ uuid: uuid });
    if (!file) {
      return res.render("dounload", { error: "Link is Expired" });
    }

    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath);
  } catch (error) {
    console.log(error);
  }
};
