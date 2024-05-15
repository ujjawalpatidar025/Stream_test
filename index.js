const express = require("express");
const app = express();
const fs = require("fs");

const cors = require("cors");
app.use(cors());
app.get("/", function (req, res) {
  // res.sendFile(__dirname + "/index.html");
  res.send("hyy from the server and runnig fine");
});

const videomap = [
  "./uploads/ram.mp4",
  "./uploads/ample.mp4",
  "./uploads/test.mp4",
  "./uploads/test2.mp4",
];

let index = 0;

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
