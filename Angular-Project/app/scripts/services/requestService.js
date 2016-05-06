angular.module('riot.services')
.factory('RequestService', function($http) {

	var championMasteries;
	var baseUrl = 'http://v22016053572334167.supersrv.de:3002/';


	return {
		getAllChampionMasteries: function(region, summoner) {
			return $http.get(baseUrl + 'GetAllChampionMasteries/p/' + region + '/u/' + summoner);
		},
		// if no region was found via geolocation it returns null, else it returns the region id
		getContinent: function(lat, lng) {
			return $http.get(baseUrl + 'GetSummonerContinent/la/'+lat+'/lo/'+lng);
		},
		getGeolocation: function(success) {
			navigator.geolocation.getCurrentPosition(success);
		},

		getComparisonStatistics: function(region, summoner){
			return $http.get(baseUrl + 'GetComparissonStatistic/p/' + region + '/u/' + summoner);
		}
	}

});
