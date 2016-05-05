angular.module('riot.services')
.factory('SharedProperties', function(RequestService, Mapping) {

	var summoner ="Narmor";
	// holds user selected region
	var activeRegionId;
	var regions = Mapping.regions;
	var champions = Mapping.champions;

	return {
		getAllChampionMasteries: function() {
			return RequestService.getAllChampionMasteries(activeRegionId, summoner);
		},
		// if no region was found via geolocation it returns null, else it returns the region id
		getContinent: function(lat, lng) {
			var test = RequestService.getContinent(lat, lng);
			return test;
		},
		getGeolocation: function(success) {
			RequestService.getGeolocation(success);
		},

		getChampionById: function(id) {
			return champions[id];
		},
		getChampions: function() {
			return champions;
		},
		getSummoner: function() {
			return summoner;
		},
		setSummoner: function(_summoner) {
			summoner = _summoner;
		},
		getActiveRegionId: function() {
			return activeRegionId;
		},
		setActiveRegionId: function(_regionId) {
			activeRegionId = _regionId;
		},
		getRegions: function() {
			return regions;
		}
	}
});