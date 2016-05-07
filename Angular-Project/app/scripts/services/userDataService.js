angular.module('riot.services')
.service('UserData', function() {
	var summoner;
	var compareSummoner;
	var regionId;
	return {
		summoner: summoner,
		compareSummoner: compareSummoner,
		regionId: regionId
	}
});
