angular.module('riot.services')
.factory('RequestService', function($http) {

	var championMasteries;
	var baseUrl = 'http://v22016053572334167.supersrv.de:3002/';
	var continent;
	function _getContinent(response) {
		return $http.get('test');
	}

	return {
		getAllChampionMasteries: function(region, summoner) {
			return $http.get(baseUrl + 'GetAllChampionMasteries/p/' + region + '/u/' + summoner);
		},
		// if no region was found via geolocation it returns null, else it returns the region id
		getContinent: function(response) {
			navigator.geolocation.getCurrentPosition(_getContinent);
			console.log(response);
		}
	}

});