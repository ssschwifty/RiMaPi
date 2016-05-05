(function(){
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


  function getLolContinentCodeLocalFromDB(countryCode, callback){
    c.query('select lolContinentCodeLocal from countries where code = :country', {country : countryCode}, function(err, rows) {
      if (err){
        callback(null);
      }
      console.log(rows);
      console.log(rows.length);
      if(rows.length > 0){
        callback(rows[0].lolContinentCodeLocal);
      } else{
        callback(null);
      }
    });
  }

  function closeDBConnection(){
    c.end();
  }

  module.exports.getLolContinentCodeLocalFromDB = function(countryCode, callback) {
    return getLolContinentCodeLocalFromDB(countryCode, callback);
  }
}());
