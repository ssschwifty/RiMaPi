// import packages.
var express = require('express');
var app = express();
var Promise = require('bluebird');
var http = require('http');

var riotServer = {
  host:'na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/RiotSchmick?'
}

// starting a http listener on port 3000 (http://domain:3000).
app.listen(3000, function() {});

function GetSummonerId(req, res){

}


// getter function "http://domain:3000/GetAllChampionMasteries/p/:platform/u/:userId"
// req.params:  p(String) platform id.
//              u(String) player ID
app.get('/GetAllChampionMasteries/p/:playerPlatform/u/:userName', function(req,res) {
  var platform = req.params.playerPlatform;
  var user = req.params.userName;

});
