import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "upload/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random() * 1e9}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limit: { fileSize: 1000000 * 100 },
}).single("file");

export default upload;
