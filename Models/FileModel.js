import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: false,
  },
  receiver: {
    type: String,
    required: false,
  },
});

const FileModel = new mongoose.model("Files", FileSchema);

export default FileModel;
