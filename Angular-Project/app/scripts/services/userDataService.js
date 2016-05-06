angular.module('riot.services')
.service('UserData', function() {
	var summoner;
	var regionId;
	return {
		summoner: summoner,
		regionId: regionId
	}
});