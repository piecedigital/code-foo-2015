var http = require("http");
var express = require("express");
var app = express();
var path = require("path");
var port = process.env["PORT"] || 8080;

// configure
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set("view options", { layout: "layout" });
app.use(express.static(path.join(__dirname, 'public')));

var url = "ign-apis.herokuapp.com";
var videosLink = url + "/videos";
var articlesLink = url + "/articles";
var index = 0;

app.get("/", function(req, resp) {
	resp.redirect( "/videos" );
});

app.get("/videos", function(req, resp) {
	if(req.query.startindex) {
		index = parseInt(req.query.startindex);
	} else {
		index = 0;
	}
	console.log(index);
	var startIndex = index,
	count = 20,
	query = "";
	query += "?startIndex=" + startIndex || "";
	query += "&count=" + count || "";
	var fetch = http.request({
		host: url,
		port: 80,
		path: videosLink + query,
		method: "GET"
	}, function(res) {
		var buffer = "";
		res.on("data", function(chunk) {
			buffer += chunk;
		});
		res.on("end", function() {
			buffer = JSON.parse(buffer);
			console.log("Loaded page: videos");
			var fullArray = [];
			//console.log(buffer);
			buffer.data.map(function(elem, ind) {
				var date = new Date(elem.metadata.publishDate);
				elem.metadata.year = date.getFullYear();
				elem.metadata.month = date.getMonth()+1;
				elem.metadata.day = date.getDate();
				time = Math.floor( elem.metadata.duration / 60 );
				time2 = Math.round( 60 * ( ( ( elem.metadata.duration / 60 ).toFixed(2) ) % 1 ) );
				if(time2 < 10) { time2 = "0" + time2; }
				fullTime = time + ":" + time2;
				elem.metadata.fullTime = fullTime;
				elem.metadata.index = index + 1 + ind;
				if(elem.metadata.index < 10) { elem.metadata.index = "0" + elem.metadata.index; }
				//console.log(fullTime);
				if(elem.metadata.month < 10) { elem.metadata.month = "0" + elem.metadata.month; }
				if(elem.metadata.day < 10) { elem.metadata.day = "0" + elem.metadata.day; }
				fullArray.push(elem.metadata);
			});
			//console.log(fullArray);
			resp.render( "index", { title : "IGN API App", items : fullArray, videoClass : "selected", articleClass : "", page : "VIDEOS" } );
		});
	});
	fetch.end();
});
app.get("/articles", function(req, resp) {
	if(req.query.startindex) {
		index = parseInt(req.query.startindex);
	} else {
		index = 0;
	}
	var startIndex = index,
	count = 20,
	query = "";
	query += "?startIndex=" + startIndex || "";
	query += "&count=" + count || "";
	var fetch = http.request({
		host: url,
		port: 80,
		path: articlesLink + query,
		method: "GET"
	}, function(res) {
		var buffer = "";
		res.on("data", function(chunk) {
			buffer += chunk;
		});
		res.on("end", function() {
			buffer = JSON.parse(buffer);
			console.log("Loaded page: articles");
			var fullArray = [];
			//console.log(buffer);
			buffer.data.map(function(elem, ind) {
				var date = new Date(elem.metadata.publishDate);
				elem.metadata.year = date.getFullYear();
				elem.metadata.month = date.getMonth()+1;
				elem.metadata.day = date.getDate();
				elem.metadata.index = index + 1 + ind;
				if(elem.metadata.index < 10) { elem.metadata.index = "0" + elem.metadata.index; }
				//console.log(fullTime);
				if(elem.metadata.month < 10) { elem.metadata.month = "0" + elem.metadata.month; }
				if(elem.metadata.day < 10) { elem.metadata.day = "0" + elem.metadata.day; }
				fullArray.push(elem.metadata);
			});
			resp.render( "index", { title : "IGN API App", items : fullArray, videoClass : "", articleClass : "selected", page : "ARTICLES" } );
		});
	});
	fetch.end();
});

app.listen(port);
console.log("listening on port " + port)