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
var subService = require('./subServiceMethods.js');
var mailer = require('./MailingService.js')

var riotApiKey;
var googleApiKey;

var noDataErrorResp = 'NoDataFound';

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


//-----------------------------------------------------
// getter function "http://domain:3000/GetAllChampionMasteries/p/:platform/u/:userId"
// req.params:  p(String) platform id.
//              u(String) player ID
//------------------------------------------------------
app.get('/GetSummonerContinent/la/:latitude/lo/:longitude', function(req, res) {
    try {
        var latitude = req.params.latitude;
        var longitude = req.params.longitude;
        if (latitude == 'undefined' || longitude == 'undefined') {
            res.send(null);
        }
        var googleAPIRequestOptions = subService.createGoogleApiHttpRequest('maps/api/geocode/json?latlng=' + latitude + ',' + longitude);
        rp(googleAPIRequestOptions).then(function(response) {
            var countryCode = searchByKey(response.results[0].address_components, 'country');
            dbAccess.getLolContinentCodeLocalFromDB(countryCode,
                function(resp) {
                    res.send(resp);
                }
            );
        }, function(error) {
            res.send(noDataErrorResp);
            dbAccess.logServiceError('GetSummonerContinent', error);
        });
    } catch (e) {
      res.send(noDataErrorResp);
      dbAccess.logServiceError('GetSummonerContinent',e);
    }

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
    try {
        var platform = req.params.playerPlatform;
        var summonerName = req.params.summonerName.toLowerCase();
        if (summonerName == 'undefined' || platform == 'undefined') {
            res.send(null);
        }
        subService.GetSummonerData(summonerName, platform).then(function(summonerData) {
            var id = summonerData.id;
            var requestOptions = subService.createRiotApiHttpRequest('/championmastery/location/' + platform + '1/player/' + id + '/champions');
            rp(requestOptions).then(function(response) {
                res.send(response);
            }, function(error) {
              res.send(noDataErrorResp);
              dbAccess.logServiceError('GetAllChampionMasteries', error);
            });
        });
    } catch (e) {
      res.send(noDataErrorResp);
      dbAccess.logServiceError('GetAllChampionMasteries',e);
    }
});



//------------------------------------------------------
// getter function "http://domain:3000/GetAllChampionMasteries/p/:platform/u/:userId"
// req.params:  p(String) platform id.
//              u(String) player ID
//------------------------------------------------------
app.get('/GetComparissonStatistic/p/:playerPlatform/u/:summonerName', function(req, res) {
    try {
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
        //dbAccess.logServiceInfo('GetComparissonStatistic', 'SummonerName: ' + summonerName); // Used for debugging
        if (summonerName == 'undefined' || localPlatform == 'undefined') {
            res.send(noDataErrorResp);
        }
        subService.GetSummonerData(summonerName, localPlatform).then(function(summonerData) {

            summonerId = summonerData.id;
            compareResponse.IconID = summonerData.profileIconId;
            compareResponse.SummonerLevel = summonerData.summonerLevel;
            var requestOptions = subService.createRiotApiHttpRequest('/championmastery/location/' + localPlatform + '1/player/' + summonerId + '/champions');
            rp(requestOptions).then(function(summonerMasteryChampionsRepsonse) {
                var customChampionStatistic = helper.getTotalMasteryScoreAndGradeStatistic(summonerMasteryChampionsRepsonse);
                compareResponse.TotalScore = customChampionStatistic.totalMasteryScore;
                compareResponse.highestGradeStatistic = customChampionStatistic.ChampionGradeStatistic;
                subService.GetSummonerMasteryScore(localPlatform, summonerId, summonerName).then(function(summonerMasteryScoreResponse) {
                    compareResponse.TotalLevels = summonerMasteryScoreResponse;
                    subService.GetSummonerTopChampions(localPlatform, summonerId, summonerName).then(function(summonersTopChampions) {
                        compareResponse.TopChamps = summonersTopChampions;
                        res.send(compareResponse);
                    })
                });
            }, function(error) {
                res.send(noDataErrorResp);
                dbAccess.logServiceError('GetComparissonStatistic', error);
            });
        });
    } catch (e) {
      res.send(noDataErrorResp);
      dbAccess.logServiceError('GetComparissonStatistic',e);
    }
});


app.get('/sendComparison/r/:recipient/s/:senderSummonerName/i/:base64Image', function(req, res) {
    try {
        mailer.sendEmail(req.params.recipient, req.params.senderSummonerName , req.params.base64Image);
        res.send('Success')
    } catch (e) {
        dbAccess.logServiceError('sendComparison',e);
    }
});
