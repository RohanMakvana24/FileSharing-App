import multer from "multer";
import upload from "../Middleware/Multer.js";
import FileModel from "../Models/FileModel.js";
import { v4 as uuidv4 } from "uuid";

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
        file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOP = async (req, res) => {
  console.log("hello");
};
