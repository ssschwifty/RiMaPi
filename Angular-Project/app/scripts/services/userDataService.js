angular.module('riot.services')
.service('UserData', function() {
	var summoner = "2CupsFlour";
	var region;
	return {
		summoner: summoner,
		region: region
	}
});