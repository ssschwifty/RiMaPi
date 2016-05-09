angular.module('riot.services')
.factory('RequestService', function($http) {

	var championMasteries;
	var baseUrl = 'https://www.narmor.com:3002/';


	return {
		// returns a promise holding the api response in form of List[ChampionMasteryDTO];
		// ChampionMasteryDTO: This object contains single Champion Mastery information for player and champion combination.
		// @param region: String, value should represent one of riots regions
		// @param summoner: String, name of the summoner, which champion masteries should be returned
		// @return ChampionMasteryDTO:
		// 		{
		// 			championPoints
		// 			playerId
		// 			championPointsUntilNextLevel
		// 			chestGranted
		// 			championLevel
		// 			championId
		// 			championPointSinceLastLevel
		// 			lastPlayTime
		// 		}
		getAllChampionMasteries: function(region, summoner) {
			return $http.get(baseUrl + 'GetAllChampionMasteries/p/' + region + '/u/' + summoner);
		},

		// if no region was found via geolocation it returns null, else it returns the region id
		// @param lat: latitude
		// @param lng: longitude
		// return string @see Mapping.js:regions
		getContinent: function(lat, lng) {
			return $http.get(baseUrl + 'GetSummonerContinent/la/' + lat + '/lo/' + lng);
		},

		// gets HTML5 geolocation and calls getContitent if successfull
		// @param success: success callback
		// getContinent is called with response.coords.latitude and response.coords.longitude
		getGeolocation: function(success) {
			navigator.geolocation.getCurrentPosition(success);
		},

		// returns a promise holding the webservice response in form of List[ComparisonStatistic];
		// @param region: String, value should represent one of riots regions
		// @param summoner: String, name of the summoner, which champion masteries should be returned
		// @return 	ComparisonStatistics:
		//		{
		// 			IconId: 				icon image source name
		// 			Name: 					summoner name
		// 			SummonerLevel: 			level of summoner
		// 			TopChamps: 				List[ChampionMasteryDTO], limited to 3
		// 			TotalLevels: 			summoner's total champion mastery score (yes, the name is misleading)
		// 			TotalScore: 			summoner's total champion points (also not a very descriptive name)
		// 			highestGradeStatistics:	{
		// 				S: amount of S graded champions
		// 				A: amount of A graded champions
		// 				B: amount of B graded champions
		// 				C: amount of C graded champions
		// 				D: amount of D graded champions
		// 			}
		// 		}
		getComparisonStatistics: function(region, summoner){
			return $http.get(baseUrl + 'GetComparissonStatistic/p/' + region + '/u/' + summoner);
		},

		// returns a promise holding the webservice call to send an Email to a friend
		// @param mailTomailTo: String, the Email-adress of the recipient of the Email
		// @param sender: String, name of the summoner who has send the email
		// @param recipient: String, name of the summoner who receives the email
		// @param base64Image: Base64String, Image of the summoner comparisscion view as base 64 string
		sendCompareEmail: function(mailTo, sender, recipient,  base64Image) {
			return $http.post(baseUrl + 'sendComparison/r/' + mailTo + '/s/' + sender + "/rs/" + recipient, '{"data":"' + base64Image + '"}');
		}
	}

});
