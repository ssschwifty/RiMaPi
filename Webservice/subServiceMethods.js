(function() {
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

    var riotApiKey = require('./riotApiKey.json').key;
    var googleApiKey = require('./googleApiKey.json').key;



    //------------------------------------------------------
    // Function to create a HTTP request for the http module
    // params:  -subrequest: Link to the requested api function
    //                        eg: /api/lol/euw/v1.4/summoner/by-name/Narmor
    //------------------------------------------------------
    function createRiotApiHttpRequest(subrequest) {
        var riotApiRequest = {
            uri: 'https://euw.api.pvp.net' + subrequest + '?' + riotApiKey,
            timeout: 2500,
            json: true
        }
        return riotApiRequest;
    }

    function createGoogleApiHttpRequest(subrequest) {
        var googleAPIRequest = {
            uri: 'https://maps.googleapis.com/' + subrequest + '&' + googleApiKey,
            timeout: 2500,
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
                    reject(noDataErrorResp);
                    dbAccess.logServiceError('GetSummonerData',error);
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
                    reject(noDataErrorResp);
                    dbAccess.logServiceError('GetSummonerMasteryScore',error);
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
                    resolve(response);
                }, function(error) {
                    reject(noDataErrorResp);
                    dbAccess.logServiceError('GetSummonerTopChampions',error);
                });
            });
        });
    }

    //---------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------
    //-----------Module Export of all "public" functions

    module.exports.createRiotApiHttpRequest = function(subrequest) {
        return createRiotApiHttpRequest(subrequest);
    }

    module.exports.createGoogleApiHttpRequest = function(subrequest) {
        return createGoogleApiHttpRequest(subrequest);
    }

    module.exports.GetSummonerData = function(summonerName, platform) {
        return GetSummonerData(summonerName, platform);
    }

    module.exports.GetSummonerMasteryScore = function(platform, summonerId, summonerName) {
        return GetSummonerMasteryScore(platform, summonerId, summonerName);
    }

    module.exports.GetSummonerTopChampions = function(platform, summonerId, summonerName) {
        return GetSummonerTopChampions(platform, summonerId, summonerName);
    }
}());
