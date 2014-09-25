var express = require('express');
var app = express();

//app.use(app.router);
app.use(express.static(__dirname));
app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile(__dirname + '/views/public/index.html');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});