angular.module('riot.services')
.factory('SharedProperties', function(RequestService, Mapping) {

	var championId;
	var playerId;

	return {
		getAllChampionMasteries: function() {
			RequestService.getAllChampionMasteries(playerId);
		},

		getMockupData: function() {
			return RequestService.getMockupData();
		}
	}
	
});