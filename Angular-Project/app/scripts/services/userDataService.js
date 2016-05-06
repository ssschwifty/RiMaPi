angular.module('riot.services')
.service('UserData', function() {
	var summoner = 'Edelmarzipan';
	var regionId;
	return {
		summoner: summoner,
		regionId: regionId
	}
});
