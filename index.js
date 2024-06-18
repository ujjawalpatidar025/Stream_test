const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const videomap = require("./videoMap");
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", function (req, res) {
  // res.sendFile(__dirname + "/index.html");
  res.status(200).json({ message: "Server is running fine ", vdSize });
});

app.post("/check",(req,res)=>{
 
  console.log("lat:",req.body.lat);
  console.log("long:",req.body.long);
  return res.status(200).json({message:"success check"});
});

let index = 0;
let vdSize = videomap.length;

// app.get("/video/:stat", (req, res) => {
//   if (req.params.stat == "forward") {
//     index++;
//     if (index == 4) {
//       index = 0;
//     }
//   } else {
//     index--;
//     if (index == -1) index = 3;
//   }

//   const filePath = videomap[index];
//   res.setHeader("content-type", "video/mp4");

//   fs.stat(filePath, (err, stat) => {
//     if (err) {
//       console.error(`File stat error for ${filePath}.`);
//       console.error(err);
//       res.sendStatus(500);
//       return;
//     }

//     res.setHeader("content-length", stat.size);

//     const fileStream = fs.createReadStream(filePath);
//     fileStream.on("error", (error) => {
//       console.log(`Error reading file ${filePath}.`);
//       console.log(error);
//       res.sendStatus(500);
//     });

//     fileStream.pipe(res);
//   });
// });

app.post("/video/upload", upload.single("video"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  console.log(`Uploaded file: ${req.file.originalname}`);
  const newVideoPath = `./uploads/${req.file.originalname}`;
  videomap.push(newVideoPath);

  // Save the updated array back to videoMap.js
  const updatedVideoMapContent = `const videomap = ${JSON.stringify(
    videomap,
    null,
    2
  )};\n\nmodule.exports = videomap;\n`;
  fs.writeFileSync(
    path.join(__dirname, "videoMap.js"),
    updatedVideoMapContent,
    "utf8"
  );

  res.json({ file: req.file, message: "File Uploaded Successfully" });
});

app.get("/video/:stat", (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
    return;
  }

  // if (req.params.stat === "forward") {
  //   // index = (index + 1) % videomap.length;
  //   index++;
  // } else {
  //   // index = (index - 1 + videomap.length) % videomap.length;
  //   index--;
  // }
  index = req.params.stat;

  const filePath = videomap[index];
  const videoSize = fs.statSync(filePath).size;

  // Parse Range
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // Create video read stream for this particular chunk
  const videoStream = fs.createReadStream(filePath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});
