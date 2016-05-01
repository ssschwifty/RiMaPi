angular.module('riot.services')
.factory('SharedProperties', function(RequestService, Mapping) {

	var playerId;
	var champions = Mapping.champions;

	return {
		getAllChampionMasteries: function() {
			RequestService.getAllChampionMasteries(playerId);
		},
		getMockupData: function() {
			return RequestService.getMockupData();
		},
		getChampionById: function(id) {
			return champions[id];
		},
		getChampions: function() {
			return champions;
		}

	}
	
});