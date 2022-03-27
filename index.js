const express = require("express");
const upload = require("express-fileupload");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();

app.use(upload());

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/image", (req, res) => {
    if(req.files) {
        //file is the name in input field
        var fileData = req.files.image.data;
        var imageData = fileData.toString("base64");
        res.render("image", {imageData: imageData});
    };
});

app.post("/file", (req, res) => {
    if(req.files) {
        // csv.mapFile("./Data/bigData.csv", function(err, data) {
        //     if(err) throw err;
        //     console.log(data);
        //     res.render("file", {fileData: data})
        // });
        const results = [];
        fs.createReadStream(__dirname + req.files.file.name)
            .pipe(csv({}))
            .on("data", (data) => {results.push(data)})
            .on("end", () => {
                console.log(results);
            });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port: 3000");
});