(function(){
  // The summonerdata Api returnst a body that contains the summonerName and
  // the real data below. So we cut out the SummonerName and return all child
  // elements of that summoner.
  function getRiotApiReponseBody(response, summonerName){
    return response[summonerName.toString().replace(" ", "")];
  }

  // Adds up all champions championPoints, since this value doesnt get returned
  // by the riot api. In Addition to that in creates a statistiv of how often
  // you got what grade as highestGrade this season
  //  Params:
  //   -> championArray:
  function getTotalMasteryScoreAndGradeStatistic(championArray){
    var returnValue = {
      totalMasteryScore:0,
      ChampionGradeStatistic:{
        S:0,
        A:0,
        B:0,
        C:0,
        D:0
      }
    }
    for (var i = 0; i < championArray.length; i++) {
      returnValue.totalMasteryScore += championArray[i].championPoints;
      if(championArray[i].highestGrade != undefined){
        switch(championArray[i].highestGrade.substring(0,1)){
          case "S":
              returnValue.ChampionGradeStatistic.S++;
              break;
          case "A":
              returnValue.ChampionGradeStatistic.A++;
              break;
          case "B":
              returnValue.ChampionGradeStatistic.B++;
              break;
          case "C":
              returnValue.ChampionGradeStatistic.C++;
              break;
          case "D":
              returnValue.ChampionGradeStatistic.D++;
              break;
        }
      }
    }
    return returnValue;
  }




//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//-----------Module Export of all "public" functions

  module.exports.getRiotApiReponseBody = function(response, summonerName) {
    return getRiotApiReponseBody(response, summonerName);
  }

  module.exports.getTotalMasteryScoreAndGradeStatistic = function(championArray) {
    return getTotalMasteryScoreAndGradeStatistic(championArray);
  }
}());
