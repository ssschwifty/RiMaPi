// import packages.
var express = require('express');
var app = express();
var Promise = require('bluebird');
var http = require('http');
var $ = require('./node_modules/jquery/dist/jquery.min.js')
var rp = require('request-promise');
var cors = require('cors');
var jsonQuery = require('json-query');
var dbAccess = require('./MariaDBService.js');


var riotApiKey;
var googleApiKey;


//------------------------------------------------------
// Event that gets fired on service launch
// and can be used to run initializing steps for the service
//------------------------------------------------------
app.use(cors());
app.on('listening', function () {
  // Aquire the API Key and save it to the riotApiKey variable

});

//------------------------------------------------------
// starting a http listener on port 3000 (http://domain:3000).
//------------------------------------------------------
app.listen(3002, function() {
  console.log('Listening on port 3002!');
  riotApiKey = require('./riotApiKey.json').key;
  googleApiKey = require('./googleApiKey.json').key;
});

//------------------------------------------------------
// Function to create a HTTP request for the http module
// params:  -subrequest: Link to the requested api function
//                        eg: /api/lol/euw/v1.4/summoner/by-name/Narmor
//------------------------------------------------------
function createRiotApiHttpRequest(subrequest){
  var riotApiRequest = {
    uri:'https://euw.api.pvp.net' + subrequest + '?' + riotApiKey,
    json: true
  }
  return riotApiRequest;
}

function createGoogleApiHttpRequest(subrequest){
  var googleAPIRequest = {
    uri:'https://maps.googleapis.com/' + subrequest + '&' + googleApiKey,
    json: true
  }
  return googleAPIRequest;
}


//------------------------------------------------------
// TODO
//-------------------------------------------clear-----------
function GetSummonerId(summonerName, platform){
    return new Promise(function(resolve, reject){
      // For some reason the http Request didnt encode spaces automatically, so here is a manual replace space with %20(which is encoded space)
      var requestOptions = createRiotApiHttpRequest('/api/lol/'+ platform +'/v1.4/summoner/by-name/' + summonerName);
      console.log(requestOptions);
      rp(requestOptions).then(function(response){
        console.log(response);
        // Spaces need to be replaced with nothing, since the api doesnt put spaces into the summonernames
        resolve((response[summonerName.toString().replace(" ", "")].id));
      }, function(error){
        console.log('Error: GetSummonerId!!!!');
        console.log(error);
      });
    });
  }

  //-----------------------------------------------------
  // getter function "http://domain:3000/GetAllChampionMasteries/p/:platform/u/:userId"
  // req.params:  p(String) platform id.
  //              u(String) player ID
  //------------------------------------------------------
  app.get('/GetSummonerContinent/la/:latitude/lo/:longitude', function(req,res) {
    var latitude = req.params.latitude;
    var longitude = req.params.longitude;
    if(latitude == 'undefined' || longitude == 'undefined'){
      res.send(null);
    }
    var googleAPIRequestOptions = createGoogleApiHttpRequest ('maps/api/geocode/json?latlng=' + latitude + ',' + longitude);
    rp(googleAPIRequestOptions).then(function(response){
      var countryCode = searchByKey(response.results[0].address_components, 'country');
      dbAccess.getLolContinentCodeLocalFromDB(countryCode,
        function (resp){
          res.send(resp);
        }
      );
    }, function(error){
      console.log('Error: GetSummonerContinent!!!!');
      console.log(error);
    });

  });

  function searchByKey(array, key) {
    for (var i = 0, l = array.length; i < l; i++){
      if (array[i]['types'][0] === key) {
        return array[i]['short_name'];
      }
    }
    return false;
  }


//------------------------------------------------------
// getter function "http://domain:3000/GetAllChampionMasteries/p/:platform/u/:userId"
// req.params:  p(String) platform id.
//              u(String) player ID
//------------------------------------------------------
app.get('/GetAllChampionMasteries/p/:playerPlatform/u/:summonerName', function(req,res) {
  var platform = req.params.playerPlatform;
  var summonerName = req.params.summonerName.toLowerCase();
  console.log(summonerName);
  if(summonerName == 'undefined' || platform == 'undefined'){
    res.send(null);
  }
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
