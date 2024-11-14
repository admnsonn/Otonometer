var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync(__dirname+'/letsencrypt/live/otonometer.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/letsencrypt/live/otonometer.com/cert.pem', 'utf8');
var ca = fs.readFileSync(__dirname+'/letsencrypt/live/otonometer.com/chain.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate, ca: ca};
const express = require('express');
const path = require('path');
const app = express();
const none_ssl = express();
none_ssl.get('/', function(req, res){
  res.redirect('https://otonometer.com');
});
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var httpServer = http.createServer(none_ssl);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);
// httpsServer.listen(443);
// app.listen(8080);
// app.listen(8443);
