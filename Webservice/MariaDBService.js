(function(){
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //----------- initializing of the Database Client
  var Client = require('mariasql');

  dbUsername = require('./dbAccessData.json').username;
  dbPassword = require('./dbAccessData.json').password;
  dbName = require('./dbAccessData.json').dbName;

  var c = new Client({
    host: '127.0.0.1',
    user: dbUsername,
    password: dbPassword,
    db:dbName
  });

  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //-----------Functions

  // Gets the local continent code form the DataBase using the google reversegeocoding apis Conutrycode
  function getLolContinentCodeLocalFromDB(countryCode, callback){
    c.query('select lolContinentCodeLocal from countries where code = :country', {country : countryCode}, function(err, rows) {
      if (err){
        callback(null);
      }
      if(rows.length > 0){
        callback(rows[0].lolContinentCodeLocal);
      } else{
        callback(null);
      }
    });
  }


  // Gets the local continent code form the DataBase using the google reversegeocoding apis Conutrycode
  function getLolApiContinentCodeNewFromDB(platform, callback){
    console.log('db: ' + platform);
    c.query('select lolContinentNew from continents where UPPER(code) = UPPER(:country)', {country : platform}, function(err, rows) {
      if (err){
        callback(null);
      }
      if(rows.length > 0){
        callback(rows[0].lolContinentNew);
      } else{
        callback(null);
      }
    });
  }

  // Gets the local continent code form the DataBase using the google reversegeocoding apis Conutrycode
  function getLolApiContinentCodeOldFromDB(platform, callback){
    c.query('select lolContinentOld from continents where UPPER(code) = UPPER(:country)', {country : platform}, function(err, rows) {
      if (err){
        callback(null);
      }
      if(rows.length > 0){
        callback(rows[0].lolContinentOld);
      } else{
        callback(null);
      }
    });
  }




  function closeDBConnection(){
    c.end();
  }




  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //-----------Module Export of all "public" functions

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
