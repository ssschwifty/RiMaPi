angular.module('riot.services')
.service('UserData', function() {
	var summoner = "2CupsFlour";
	var regionId;
	return {
		summoner: summoner,
		regionId: regionId
	}
});