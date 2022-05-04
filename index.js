const express = require("express");
const fs = require("fs");
const app = express();
app.set("view engine", "ejs");

//Reading json data
let data;
fs.readFile("./OpenDay.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file", err);
    return;
  }
  try {
    data = JSON.parse(jsonString);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});

app.get("/", function (req, res) {
  res.render("home", { data: data });
});

app.get("/:id", function (req, res) {
  let id = req.params.id;
  let programData;
  for (let i = 0; i < data.topics.length; i++) {
    if (data.topics[i].id == id) {
      programData = data.topics[i].programs;
    }
  }
  res.render("programs", { programData: programData });
});

app.listen(5000);
