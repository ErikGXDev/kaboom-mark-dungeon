const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, ".", "index.html"));
});

app.use("/dist", express.static(path.join(__dirname, "./dist")));
app.use("/sounds", express.static(path.join(__dirname, "./sounds")))
app.use("/sprites", express.static(path.join(__dirname, "./sprites")))

app.listen(8000, () => {
    console.log("Started server! http://localhost:8000");
});