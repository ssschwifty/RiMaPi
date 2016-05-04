// import packages.
var express = require('express');
var app = express();
var Promise = require('bluebird');
var http = require('http');
var $ = require('./node_modules/jquery/dist/jquery.min.js')
var rp = require('request-promise');

var apikey;


//------------------------------------------------------
// Event that gets fired on service launch
// and can be used to run initializing steps for the service
//------------------------------------------------------
app.on('listening', function () {
  // Aquire the API Key and save it to the apikey variable

});

//------------------------------------------------------
// starting a http listener on port 3000 (http://domain:3000).
//------------------------------------------------------
app.listen(3002, function() {
  console.log('Listening on port 3002!');
  apikey = require('./apiKey.json').key;
  console.log(apikey);
});

//------------------------------------------------------
// Function to create a HTTP request for the http module
// params:  -subrequest: Link to the requested api function
//                        eg: /api/lol/euw/v1.4/summoner/by-name/Narmor
//------------------------------------------------------
function createRiotApiHttpRequest(subrequest){
  var riotApiRequest = {
    uri:'https://euw.api.pvp.net' +subrequest + '?' + apikey,
    json: true
  }
  return riotApiRequest;
}


//------------------------------------------------------
// TODO
//-------------------------------------------clear-----------
function GetSummonerId(summonerName, platform){
    return new Promise(function(resolve, reject){
      var requestOptions = createRiotApiHttpRequest('/api/lol/'+ platform +'/v1.4/summoner/by-name/' + summonerName);
      rp(requestOptions).then(function(response){
        resolve((response[summonerName.toString()].id));
      }, function(error){
        console.log('Error: GetSummonerId!!!!');
        console.log(error);
      });
    });
  }


//------------------------------------------------------
// getter function "http://domain:3000/GetAllChampionMasteries/p/:platform/u/:userId"
// req.params:  p(String) platform id.
//              u(String) player ID
//------------------------------------------------------
app.get('/GetAllChampionMasteries/p/:playerPlatform/u/:summonerName', function(req,res) {
  var platform = req.params.playerPlatform;
  var summonerName = req.params.summonerName.toLowerCase();
  GetSummonerId(summonerName, platform).then(function(id){
    var requestOptions = createRiotApiHttpRequest('/championmastery/location/'+ platform +'1/player/' + id + '/champions');
    rp(requestOptions).then(function(response){
      res.send(response);
    }, function(error){
      console.log('Error: GetAllChampionMasteries!!!!');
      console.log(error);
    });
  });
});
