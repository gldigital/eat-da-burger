var express = require("express");
var bodyParser = require("body-parser");

// Import routes and give the server access to them.
var burgers_Controller = require("./controllers/burgers_Controller.js");
var burger = require("./models/burger.js");


var port = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

app.use("/api/burgers", burgers_Controller);

app.listen(port);
