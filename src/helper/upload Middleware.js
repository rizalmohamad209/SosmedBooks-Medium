const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/books_image");
  },

  filename: (req, file, callback) => {
    console.log("====================================");
    console.log(file);
    console.log("====================================");
    const NameFormat = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    callback(null, NameFormat);
  },
});

const upload = multer({
  storage: storage,
  limits: 2 * 1000 * 1000,
});

const singleUpload = (req, res, next) => {
  const uploadBooks = upload.single("cover__book");
  uploadBooks(req, res, (err) => {
    if (err) {
      res.status(500).send({
        message: "Error Multer",
        status: 400,
        err,
      });
    } else {
      next();
    }
  });
};

module.exports = singleUpload;
