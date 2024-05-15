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

app.get("/video/:stat", (req, res) => {
  if (req.params.stat == "forward") {
    index++;
    if (index == 4) {
      index = 0;
    }
  } else {
    index--;
    if (index == -1) index = 3;
  }

  const filePath = videomap[index];
  res.setHeader("content-type", "video/mp4");

  fs.stat(filePath, (err, stat) => {
    if (err) {
      console.error(`File stat error for ${filePath}.`);
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.setHeader("content-length", stat.size);

    const fileStream = fs.createReadStream(filePath);
    fileStream.on("error", (error) => {
      console.log(`Error reading file ${filePath}.`);
      console.log(error);
      res.sendStatus(500);
    });

    fileStream.pipe(res);
  });
});
app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
