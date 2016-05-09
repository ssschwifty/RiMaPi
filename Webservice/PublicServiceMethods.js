//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//----------- oragnizing imports + declaring globalVariables
var express = require('express');
var app = express();
var Promise = require('bluebird');
var fs = require('fs');
var http = require('http');
var https = require('https');
var $ = require('./node_modules/jquery/dist/jquery.min.js')
var bodyParser = require('body-parser');
var rp = require('request-promise');
var cors = require('cors');
var jsonQuery = require('json-query');
var dbAccess = require('./MariaDBService.js');
var helper = require('./helper.js');
var subService = require('./subServiceMethods.js');
var mailer = require('./MailingService.js')

var privateKey = fs.readFileSync('sslcert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
var credentials = {
    key: privateKey,
    cert: certificate
};
var httpsServer = https.createServer(credentials, app);

var riotApiKey;
var googleApiKey;

var noDataErrorResp = 'NoDataFound';

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//----------- initializing of the Service
app.use(cors());

// starting a http listener on port 3000 (http://domain:3000).
// load needed apiKeys from local jsonFiles
httpsServer.listen(3002, function() {
    console.log('Listening on port 443!');
    riotApiKey = require('./riotApiKey.json').key;
    googleApiKey = require('./googleApiKey.json').key;
});

app.use(bodyParser.json({
    limit: '50mb'
})); // for parsing application/json
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
})); // for parsing application/x-www-form-urlencoded




//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//----------- Public Service Methods of the Service





//-----------------------------------------------------
// getter function "http://domain:3000/GetAllChampionMasteries/p/:platform/u/:userId"
// req.params:  la(number) Latitude of the users Position.
//              lo(number) Latitude of the users Position.
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
            /// Checks if the thrown error is of type 429, which means the api rates of the riot api key is exceeded
            /// responds the error if so, responds no data otherwise
            if (error.statusCode == "429") {
                res.send("429");
            } else {
                res.send(noDataErrorResp);
            }
        });
    } catch (e) {
        dbAccess.logServiceError('GetSummonerContinent', e);
    }

});


/// Sorting FUnction to determine the uesrs country from the google api
/// it iterates over every element of an array and returns it, if its
/// name matches the given key
/// Params:
/// array(array) : array to be searched
/// key(string) : key to be matched
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
        var localPlatform = req.params.playerPlatform;
        var summonerName = req.params.summonerName.toLowerCase();
        if (summonerName == 'undefined' || platform == 'undefined') {
            res.send(null);
        }
        subService.GetSummonerData(summonerName, localPlatform).then(function(summonerData) {
            var id = summonerData.id;
            dbAccess.getLolApiContinentCodeOldFromDB(localPlatform, function(actualOldPlatform) {
                dbAccess.getLolApiContinentCodeNewFromDB(localPlatform, function(actualNewPlatform) {
                    var requestOptions = subService.createRiotApiHttpRequest('/championmastery/location/' + actualNewPlatform + '/player/' + id + '/champions', actualOldPlatform);
                    //console.log(requestOptions);
                    rp(requestOptions).then(function(response) {
                        res.send(response);
                    }, function(error) {
                        /// Checks if the thrown error is of type 429, which means the api rates of the riot api key is exceeded
                        /// responds the error if so, responds no data otherwise
                        if (error.statusCode == "429") {
                            res.send("429");
                        } else {
                            res.send(noDataErrorResp);
                        }
                    });
                });
            });
        });
    } catch (e) {
        dbAccess.logServiceError('GetAllChampionMasteries', e);
    }
});



//------------------------------------------------------
// getter function "http://domain:3000/GetComparissonStatistic/p/:platform/u/:userId"
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
            dbAccess.getLolApiContinentCodeOldFromDB(localPlatform, function(actualOldPlatform) {
                dbAccess.getLolApiContinentCodeNewFromDB(localPlatform, function(actualNewPlatform) {
                    summonerId = summonerData.id;
                    compareResponse.IconID = summonerData.profileIconId;
                    compareResponse.SummonerLevel = summonerData.summonerLevel;
                    var requestOptions = subService.createRiotApiHttpRequest('/championmastery/location/' + actualNewPlatform + '/player/' + summonerId + '/champions', actualOldPlatform);
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
                        /// Checks if the thrown error is of type 429, which means the api rates of the riot api key is exceeded
                        /// responds the error if so, responds no data otherwise
                        if (error.statusCode == "429") {
                            res.send("429");
                        } else {
                            res.send(noDataErrorResp);
                        }
                    });
                });
            });
        });
    } catch (e) {
        dbAccess.logServiceError('GetComparissonStatistic', e);
    }
});

//------------------------------------------------------
// post function "http://domain:3000/sendComparison/r/:recipientMail/s/:senderSummonerName/rs/:recipientSummonerName"
// req.params:  r(String) recipients Mail adress.
//              s(String) Summoner name of the sender,
//              rs(String) summonername of the recipient
//------------------------------------------------------
app.post('/sendComparison/r/:recipientMail/s/:senderSummonerName/rs/:recipientSummonerName', function(req, res) {
    try {
        // string generated by canvas.toDataURL()
        var img = req.body.data;
        // strip off the data: url prefix to get just the base64-encoded bytes
        var data = img.replace(/^data:image\/\w+;base64,/, "");
        mailer.sendEmail(req.params.recipientMail, req.params.senderSummonerName, req.params.recipientSummonerName, data);
        res.send('Success')
    } catch (e) {
        dbAccess.logServiceError('sendComparison', e);
    }
});
