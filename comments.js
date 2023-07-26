// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Set up body parser to read request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set up static content
app.use(express.static('public'));

// Set up web server
app.listen(8080, function() {
    console.log('Server running at http://localhost:8080');
});

// Read in the comments file
var commentsFile = 'comments.json';
var comments = [];
var commentsFileExists = fs.existsSync(commentsFile);
if (commentsFileExists) {
    var commentsFileContents = fs.readFileSync(commentsFile, 'utf-8');
    comments = JSON.parse(commentsFileContents);
}

// Set up routes
app.get('/comments', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
});

app.post('/comments', function(req, res) {
    var name = req.body.name;
    var comment = req.body.comment;
    console.log('POST: ' + name + ' ' + comment);
    comments.push({name: name, comment: comment});
    fs.writeFileSync(commentsFile, JSON.stringify(comments));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
});