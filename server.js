const express = require("express");
const hbs = require("hbs");  // wrapper for handlebars, a dynamic templates renderer
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

// app.use is how you register middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = now + ": " + req.method + " " + req.url;
	console.log(log);
	fs.appendFile("server.log", log + "\n", (err) => {
		if (err) {
			console.log("Unable to append to server.log.");
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render("maintenance.hbs", {
// 		pageTitle: "Maintenance"
// 	});
// });

// directory for static files
// __dirname refers to the root of the project
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
	return text.toUpperCase();
});

app.get("/", (req, res) => {
	// res.send("<h1>Hello, Express!</h1>");
	res.render("home.hbs", {
		pageTitle: "Home Page",
		welcomeMessage: "Welcome to this starter website!",
		currentYear: new Date().getFullYear()
	});
});

app.get("/about", (req, res) => {
	res.render("about.hbs", {
		pageTitle: "About Page",
	});
});

app.listen(port, () => {
	console.log("Server is up and listening to port " + port + ".");
});