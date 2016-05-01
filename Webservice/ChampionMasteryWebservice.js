// import packages.
var express = require('express');
var app = express();
var Promise = require('bluebird');
var http = require('http');
var $ = require('jQuery');

var apikey;


//------------------------------------------------------
// Event that gets fired on service launch
// and can be used to run initializing steps for the service
//------------------------------------------------------
app.on('listening', function () {
  // Aquire the API Key and save it to the apikey variable
  $.getJSON("apiKey.json", function(json) {
    apikey = json.key;
  });
});



//------------------------------------------------------
// Function to create a HTTP request for the http module
// params:  -subrequest: Link to the requested api function
//                        eg: /api/lol/euw/v1.4/summoner/by-name/Narmor
//------------------------------------------------------
function createRiotApiHttpRequest(subrequest){
  var riotApiRequest = {
    host:'na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/RiotSchmick?' + apikey,
    port: 443,
    path: 'subrequest'
  }
  return riotApiRequest;
}







//------------------------------------------------------
// starting a http listener on port 3000 (http://domain:3000).
//------------------------------------------------------
app.listen(3000, function() {});

//------------------------------------------------------
// TODO
//------------------------------------------------------
function GetSummonerId(summonerName, platform){
  return new Promise(function(response) {
    var requestOptions = createRiotApiHttpRequest('/api/lol/'+ platform +'/v1.4/summoner/by-name/' + summonerName);
    http.get(requestOptions, response);
  }
}


//------------------------------------------------------
// getter function "http://domain:3000/GetAllChampionMasteries/p/:platform/u/:userId"
// req.params:  p(String) platform id.
//              u(String) player ID
//------------------------------------------------------
app.get('/GetAllChampionMasteries/p/:playerPlatform/u/:userName', function(req,res) {
  var platform = req.params.playerPlatform;
  var user = req.params.userName;
  GetSummonerId(summonerName, platform).then(response){

  }
});
