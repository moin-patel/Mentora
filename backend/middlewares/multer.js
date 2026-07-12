// import multer from "multer";

// const storage = multer.memoryStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public");
//   },

//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 500, // 500 MB
//   },
// });

// export default upload;

// import multer from "multer";

// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits:{
//     fileSize:1024 * 1024 * 500 // 500MB
//   }
// });

// export default upload;

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 500, // 500 MB
  },
});

export default upload;

// diskstorage jab req.file.path less time use krta he 
