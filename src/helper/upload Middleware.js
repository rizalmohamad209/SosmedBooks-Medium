const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/books_image");
  },

  fileName: (req, file, callback) => {
    console.log("====================================");
    console.log(file);
    console.log("====================================");
    const nameFormat = `${Date.now()}-${file.fileName}${path.extname(
      file.originalname
    )}`;
    callback(null, nameFormat);
  },
});

const upload = multer({
  storage: storage,
  limits: 2 * 1000 * 1000,
});

const singleUpload = (req, res, next) => {
  const uploadBooks = upload.single("cover_book");
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
