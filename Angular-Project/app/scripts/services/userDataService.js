angular.module('riot.services')
.service('UserData', function() {
	var summoner = "Narmor";
	var regionId;
	return {
		summoner: summoner,
		regionId: regionId
	}
});
