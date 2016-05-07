//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//----------- oragnizing imports + declaring globalVariables
var express = require('express');
var app = express();
var Promise = require('bluebird');
var http = require('http');
var $ = require('./node_modules/jquery/dist/jquery.min.js')
var rp = require('request-promise');
var cors = require('cors');
var jsonQuery = require('json-query');
var dbAccess = require('./MariaDBService.js');
var helper = require('./helper.js');

var riotApiKey;
var googleApiKey;

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//----------- initializing of the Service
app.use(cors());

// starting a http listener on port 3000 (http://domain:3000).
// load needed apiKeys from local jsonFiles
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
function createRiotApiHttpRequest(subrequest) {
    var riotApiRequest = {
        uri: 'https://euw.api.pvp.net' + subrequest + '?' + riotApiKey,
        json: true
    }
    return riotApiRequest;
}

function createGoogleApiHttpRequest(subrequest) {
    var googleAPIRequest = {
        uri: 'https://maps.googleapis.com/' + subrequest + '&' + googleApiKey,
        json: true
    }
    return googleAPIRequest;
}


//------------------------------------------------------
// TODO
//-------------------------------------------clear-----------
function GetSummonerData(summonerName, platform) {
    return new Promise(function(resolve, reject) {
        // For some reason the http Request didnt encode spaces automatically, so here is a manual replace space with %20(which is encoded space)
        dbAccess.getLolApiContinentCodeOldFromDB(platform, function(actualPlatform) {
            var requestOptions = createRiotApiHttpRequest('/api/lol/' + actualPlatform + '/v1.4/summoner/by-name/' + summonerName);
            rp(requestOptions).then(function(response) {
                resolve(helper.getRiotApiReponseBody(response, summonerName));
            }, function(error) {
                console.log('Error: GetSummonerData!!!!');
                console.log(error.href);
            });
        });
    });
}


function GetSummonerMasteryScore(platform, summonerId, summonerName) {
    return new Promise(function(resolve, reject) {
        // For some reason the http Request didnt encode spaces automatically, so here is a manual replace space with %20(which is encoded space)
        dbAccess.getLolApiContinentCodeNewFromDB(platform, function(actualPlatform) {
            var requestOptions = createRiotApiHttpRequest('/championmastery/location/' + actualPlatform + '/player/' + summonerId + '/score');
            rp(requestOptions).then(function(response) {
                resolve(response);
            }, function(error) {
                console.log('Error: GetSummonerData!!!!');
                console.log(error.href);
            });
        });
    });
}

function GetSummonerTopChampions(platform, summonerId, summonerName) {
    return new Promise(function(resolve, reject) {
        // For some reason the http Request didnt encode spaces automatically, so here is a manual replace space with %20(which is encoded space)
        dbAccess.getLolApiContinentCodeNewFromDB(platform, function(actualPlatform) {
            var requestOptions = createRiotApiHttpRequest('/championmastery/location/' + actualPlatform + '/player/' + summonerId + '/topchampions');
            rp(requestOptions).then(function(response) {
                resolve(helper.getRiotApiReponseBody(response, summonerName));
            }, function(error) {
                console.log('Error: GetSummonerData!!!!');
                console.log(error.href);
            });
        });
    });
}

//-----------------------------------------------------
// getter function "http://domain:3000/GetAllChampionMasteries/p/:platform/u/:userId"
// req.params:  p(String) platform id.
//              u(String) player ID
//------------------------------------------------------
app.get('/GetSummonerContinent/la/:latitude/lo/:longitude', function(req, res) {
    var latitude = req.params.latitude;
    var longitude = req.params.longitude;
    if (latitude == 'undefined' || longitude == 'undefined') {
        res.send(null);
    }
    var googleAPIRequestOptions = createGoogleApiHttpRequest('maps/api/geocode/json?latlng=' + latitude + ',' + longitude);
    rp(googleAPIRequestOptions).then(function(response) {
        var countryCode = searchByKey(response.results[0].address_components, 'country');
        dbAccess.getLolContinentCodeLocalFromDB(countryCode,
            function(resp) {
                res.send(resp);
            }
        );
    }, function(error) {
        console.log('Error: GetSummonerContinent!!!!');
        console.log(error.href);
    });

});

function searchByKey(array, key) {
    for (var i = 0, l = array.length; i < l; i++) {
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
app.get('/GetAllChampionMasteries/p/:playerPlatform/u/:summonerName', function(req, res) {
    var platform = req.params.playerPlatform;
    var summonerName = req.params.summonerName.toLowerCase();
    if (summonerName == 'undefined' || platform == 'undefined') {
        res.send(null);
    }
    GetSummonerData(summonerName, platform).then(function(summonerData) {
        var id = summonerData.id;
        var requestOptions = createRiotApiHttpRequest('/championmastery/location/' + platform + '1/player/' + id + '/champions');
        rp(requestOptions).then(function(response) {
            res.send(response);
        }, function(error) {
            console.log('Error: GetAllChampionMasteries!!!!');
            console.log(error.href);
        });
    });
});



//------------------------------------------------------
// getter function "http://domain:3000/GetAllChampionMasteries/p/:platform/u/:userId"
// req.params:  p(String) platform id.
//              u(String) player ID
//------------------------------------------------------
app.get('/GetComparissonStatistic/p/:playerPlatform/u/:summonerName', function(req, res) {
    var localPlatform = req.params.playerPlatform;
    var compareResponse = {
        "Name": req.params.summonerName,
        "SummonerLevel": "",
        "TotalLevels": "",
        "TotalScore": "",
        "highestGradeStatistic": "",
        "IconID": "",
        "TopChamps": ""
    }
    var summonerName = req.params.summonerName.toLowerCase();
    console.log(summonerName);
    if (summonerName == 'undefined' || localPlatform == 'undefined') {
        res.send(null);
    }
    GetSummonerData(summonerName, localPlatform).then(function(summonerData) {
        summonerId = summonerData.id;
        compareResponse.IconID = summonerData.profileIconId;
        compareResponse.SummonerLevel = summonerData.summonerLevel;
        var requestOptions = createRiotApiHttpRequest('/championmastery/location/' + localPlatform + '1/player/' + summonerId + '/champions');
        rp(requestOptions).then(function(summonerMasteryChampionsRepsonse) {
            var customChampionStatistic = helper.getTotalMasteryScoreAndGradeStatistic(summonerMasteryChampionsRepsonse);
            compareResponse.TotalScore = customChampionStatistic.totalMasteryScore;
            compareResponse.highestGradeStatistic = customChampionStatistic.ChampionGradeStatistic;
            GetSummonerMasteryScore(localPlatform, summonerId, summonerName).then(function(summonerMasteryScoreResponse) {
                console.log(summonerMasteryScoreResponse);
                compareResponse.TotalLevels = summonerMasteryScoreResponse;
                GetSummonerTopChampions(localPlatform, summonerId, summonerName).then(function(summonersTopChampions) {
                    compareResponse.TopChamps = summonersTopChampions;
                    res.send(compareResponse);
                })
            });
        }, function(error) {
            console.log('Error: GetAllChampionMasteries!!!!');
            console.log(error.href);
        });
    });
});
