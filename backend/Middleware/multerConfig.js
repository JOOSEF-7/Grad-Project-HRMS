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
  
  const fileName = `${file.fieldname}-${Date.now()}.${ext}`;
  
  cb(null, fileName);
},
});

const fileFilter = (req, file, cb) => {
  const mimeType = file.mimetype;

  const isImage = mimeType.startsWith("image/");

  const isPDF = mimeType === "application/pdf";

  if (isImage || isPDF) {
    return cb(null, true);
  } else {
    return cb(
      appErrors.create(400, "Only images and PDF files are allowed!", httpResponseText.FAIL),
      false
    );
  }
};

const upload = multer({ storage: diskStorage, fileFilter });
export default upload;
