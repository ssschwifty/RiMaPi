angular.module('riot.services')
.factory('SharedProperties', function(RequestService, Mapping) {

	var regions = Mapping.regions;
	var champions = Mapping.champions;
	var regionIconState = 'gps';

	return {
		getAllChampionMasteries: function(region, summoner) {
			return RequestService.getAllChampionMasteries(region, summoner);
		},
		getComparisonStatistics: function(region, summoner) {
			return RequestService.getComparisonStatistics(region, summoner);
		},
		// if no region was found via geolocation it returns null, else it returns the region id
		getContinent: function(lat, lng) {
			return RequestService.getContinent(lat, lng);
		},
		getGeolocation: function(success) {
			RequestService.getGeolocation(success);
		},
		sendCompareEmail: function(mailTo, sender, base64Image) {
			return RequestService.sendCompareEmail(mailTo, sender, base64Image);
		},

		getChampionNameIdById: function(id) {
			return champions[id].id;
		},
		getChampionDisplayNameById: function(id) {
			return champions[id].displayName;
		},
		getChampions: function() {
			return champions;
		},
		getRegions: function() {
			return regions;
		},
		regionIconState: regionIconState
	}
});
