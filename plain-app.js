var http = require("http");
var express = require("express");
var app = express();
var port = process.env["PORT"] || 8080;

var url = "ign-apis.herokuapp.com";
var videosLink = url + "/videos";
var articlesLink = url + "/articles";

var videoOpt = {
	host: url,
	port: 80,
	path: videosLink + "?startIndex=0&count=20",
	method: "GET"
};
var articleOpt = {
	host: url,
	port: 80,
	path: articlesLink + "?startIndex=0&count=20",
	method: "GET"
};
app.get("/videos", function(req, resp) {
	var buffer = "";
	var fetch = http.request(videoOpt, function(res) {
		res.on("data", function(chunk) {
			buffer += chunk;
		});
		res.on("end", function() {
			buffer = JSON.parse(buffer);
			var arrangement = [];
			buffer.data.map(function(elem) {
				//console.log(elem.metadata);
				arrangement.push(JSON.stringify(elem.metadata));
			});
			resp.send( arrangement.join("<br><br>") );
		});
	});
	fetch.end();
});
app.get("/articles", function(req, resp) {
	var buffer = "";
	var fetch = http.request(articleOpt, function(res) {
		res.on("data", function(chunk) {
			buffer += chunk;
		});
		res.on("end", function() {
			buffer = JSON.parse(buffer);
			var arrangement = [];
			buffer.data.map(function(elem) {
				//console.log(elem.metadata);
				arrangement.push(JSON.stringify(elem.metadata));
			});
			resp.send( arrangement.join("<br><br>") );
		});
	});
	fetch.end();
});


app.listen(port);
console.log("listening on port " + port)