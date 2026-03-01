import multer from "multer";
import appErrors from "../utils/errors.js";
import { httpResponseText } from "../utils/httpResponseText.js";

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file", file);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-image${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const inputType = file.mimetype.split("/")[0];
  if (inputType === "image") {
    return cb(null, true);
  } else {
    return cb(
      appErrors.create(400, "the file must be an image", httpResponseText.FAIL),
      false,
    );
  }
};

const upload = multer({ storage: diskStorage, fileFilter });
export default upload;
