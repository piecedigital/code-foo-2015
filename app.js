var http = require("http");
var express = require("express");
var app = express();
var path = require("path");
var MongoClient = require("mongodb");
var port = process.env["PORT"] || 8080;

// configure
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set("view options", { layout: "layout" });
app.use(express.static(path.join(__dirname, 'public')));
var Server = MongoClient.Server,
Db = MongoClient.Db,
db = new Db( "code-foo", new Server( "localhost", 27017 ) );

var url = "ign-apis.herokuapp.com";
var videosLink = url + "/videos";
var articlesLink = url + "/articles";

var videosOpt = {
	host: url,
	port: 80,
	path: videosLink + "?startIndex=30&count=5",
	method: "GET"
};
var articlesOpt = {
	host: url,
	port: 80,
	path: articlesLink + "?startIndex=30&count=5",
	method: "GET"
};

app.get("/", function(req, resp) {
	db.collection("videos").find({}).toArray( function(err, doc) {
		if (err) throw err;
		console.log("Loaded page: videos");
		db.collection("articles").find({}).toArray( function(err, doc2) {
			if (err) throw err;
			console.log("Loaded page: articles");

			var fullArray = [];
			doc[0]["video-data"].map(function(elem) {
				var date = new Date(elem.publishDate);
				elem.year = date.getFullYear();
				elem.month = date.getMonth()+1;
				elem.day = date.getDate();
				time = Math.floor( elem.duration / 60 );
				time2 = Math.round( 60 * ( ( ( elem.duration / 60 ).toFixed(2) ) % 1 ) );
				fullTime = time + ":" + time2;
				elem.fullTime = fullTime;
				console.log(fullTime);
				if(elem.month < 10) { elem.month = "0" + elem.month; }
				if(elem.day < 10) { elem.day = "0" + elem.day; }
				fullArray.push(elem);
			});
			doc2[0]["article-data"].map(function(elem) {
				var date = new Date(elem.publishDate);
				elem.year = date.getFullYear();
				elem.month = date.getMonth()+1;
				elem.day = date.getDate();
				if(elem.month < 10) { elem.month = "0" + elem.month; }
				if(elem.day < 10) { elem.day = "0" + elem.day; }
				fullArray.push(elem);
			});
			fullArray.sort(function(a, b) {
				return a.publishDate < b.publishDate;
			});
			resp.render( "index", { title : "Videos and Articles", items : fullArray } );
			//console.log(fullArray)
		} );
	} );
});
app.get("/videos", function(req, resp) {
	console.log("getting page...");
	db.collection("videos").find({}).toArray( function(err, doc) {
		if (err) throw err;
		resp.send(doc);
		console.log("Loaded page: videos");
	} );
});
app.get("/articles", function(req, resp) {
	console.log("getting page...");
	db.collection("articles").find({}).toArray( function(err, doc) {
		if (err) throw err;
		resp.send( JSON.stringify( doc ) );
		console.log("Loaded page: articles");
	} );
});

db.open(function(err, db) {
	app.listen(port);
	console.log("listening on port " + port)
});