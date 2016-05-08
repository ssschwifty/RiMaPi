(function() {
    //---------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------
    //----------- initializing of the Database Client
    var Client = require('mariasql');

    dbUsername = require('./dbAccessData.json').username;
    dbPassword = require('./dbAccessData.json').password;
    dbName = require('./dbAccessData.json').dbName;

    /// database connection initialisation
    var c = new Client({
        host: '127.0.0.1',
        user: dbUsername,
        password: dbPassword,
        db: dbName
    });

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//-----------Functions

    // Gets the local continent code form the DataBase using the google reversegeocoding apis Conutrycode
    function getLolContinentCodeLocalFromDB(countryCode, callback) {
        try {
            c.query('select lolContinentCodeLocal from countries where code = :country', {
                country: countryCode
            }, function(err, rows) {
                if (err) {
                    callback(null);
                }
                if (rows.length > 0) {
                    callback(rows[0].lolContinentCodeLocal);
                } else {
                    callback(null);
                }
            });
        } catch (e) {
            logServiceError('getLolContinentCodeLocalFromDB', e);
        }
    }


/// ----------------------------- riot api call continen code functions
    /// There are two kinds of continent codes for the riot api: old and new.
    /// Depending on the api call you need a certain one of these
    // Gets the new continent code using the given local continent code
    function getLolApiContinentCodeNewFromDB(platform, callback) {
        try {
            c.query('select lolContinentNew from continents where UPPER(code) = UPPER(:country)', {
                country: platform
            }, function(err, rows) {
                if (err) {
                    callback(null);
                }
                if (rows.length > 0) {
                    callback(rows[0].lolContinentNew);
                } else {
                    callback(null);
                }
            });
        } catch (e) {
            logServiceError('getLolApiContinentCodeNewFromDB', e);
        }
    }

    // Gets the old continent code using the given local continent code
    function getLolApiContinentCodeOldFromDB(platform, callback) {
        try {
            c.query('select lolContinentOld from continents where UPPER(code) = UPPER(:country)', {
                country: platform
            }, function(err, rows) {
                if (err) {
                    callback(null);
                }
                if (rows.length > 0) {
                    callback(rows[0].lolContinentOld);
                } else {
                    callback(null);
                }
            });
        } catch (e) {
            logServiceError('getLolApiContinentCodeOldFromDB', e);
        }
    }
/// -----------------------------


/// ----------------------------- Logging functions
/// logs an error of the service into the database
    function logServiceError(throwingMethod, stackTrace) {
        try {
            c.query('insert into RiotApiServiceErrorLog (MethodOccurred, ErrorOccurred) VALUES (:lvsMethodOccurred, :lvsErrorOccurred)', {
                lvsMethodOccurred: throwingMethod,
                lvsErrorOccurred: stackTrace
            }, function(err, rows) {

            });
        } catch (e) {
            console.log(e);
        }
    }

/// creates a normal log and logs it into the database
    function logServiceInfo(throwingMethod, info) {
        try {
            c.query('insert into RiotApiServiceNormalLog (Method, Status) VALUES (:lvsMethodOccurred, :lvsErrorOccurred)', {
                lvsMethodOccurred: throwingMethod,
                lvsErrorOccurred: info
            }, function(err, rows) {
            });
        } catch (e) {
            logServiceError('logServiceInfo', e);
        }
    }
/// -----------------------------

/// Function for closing the database connection
    function closeDBConnection() {
        c.end();
    }




    //---------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------
    //-----------Module Export of all "public" functions

    module.exports.logServiceError = function(throwingMethod, stackTrace) {
        logServiceError(throwingMethod, stackTrace);
    }

    module.exports.logServiceInfo = function(throwingMethod, info) {
        logServiceInfo(throwingMethod, info);
    }

    module.exports.getLolContinentCodeLocalFromDB = function(countryCode, callback) {
        return getLolContinentCodeLocalFromDB(countryCode, callback);
    }

    module.exports.getLolApiContinentCodeNewFromDB = function(platform, callback) {
        return getLolApiContinentCodeNewFromDB(platform, callback);
    }

    module.exports.getLolApiContinentCodeOldFromDB = function(platform, callback) {
        return getLolApiContinentCodeOldFromDB(platform, callback);
    }

    module.exports.closeDBConnection = function() {
        closeDBConnection();
    }
}());
