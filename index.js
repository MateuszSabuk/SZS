const express = require("express");
const dbh = require("./dbHandler");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
dbh.connectToDB("mongodb://mongo:27017/szs");

// Set up a route for the homepage
app.get("/", (req, res) => {
  dbh.getAllJars().then((items) => {
    res.render("index", { items });
  });
});

// Set up a route to add a batch
app.get("/addbatch", (req, res) => {
  dbh.addBatch(3, "Śliwki", "Wpadły jak śliwki w kompot").then((items) => {
    res.redirect("/");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
