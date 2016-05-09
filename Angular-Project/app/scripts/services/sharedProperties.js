/*
* provides a service for handling porperties between controllers and defines an interface for external requests
*/
angular.module('riot.services')
.factory('SharedProperties', function(RequestService, Mapping) {

	// @see Mapping.js:regions
	var regions = Mapping.regions;
	// @see Mapping.js:champions
	var champions = Mapping.champions;
	// holds the global imagename for the icon inside of the regions dropdown button
	// can either be 'gps' or 'earth'
	var regionIconState = 'gps';

	// define public functions and attributes
	return {
		// @see requestService.js:getAllChampionMasteries
		getAllChampionMasteries: function(region, summoner) {
			return RequestService.getAllChampionMasteries(region, summoner);
		},
		// @see requestService.js:getComparisonStatistics
		getComparisonStatistics: function(region, summoner) {
			return RequestService.getComparisonStatistics(region, summoner);
		},
		// if no region was found via geolocation it returns null, else it returns the region id
		getContinent: function(lat, lng) {
			return RequestService.getContinent(lat, lng);
		},
		// @see requestService.js:getGeolocation
		getGeolocation: function(success) {
			RequestService.getGeolocation(success);
		},
		// @see requestService.js:sendCompareEmail
		sendCompareEmail: function(mailTo, sender, senderRegion, recipient, recipientRegion,  base64Image) {
			return RequestService.sendCompareEmail(mailTo, sender, senderRegion, recipient, recipientRegion,  base64Image);
		},

		// uses the mapping service to determine names by id
		getChampionNameIdById: function(id) {
			return champions[id].id;
		},
		getChampionDisplayNameById: function(id) {
			return champions[id].displayName;
		},
		getChampionImageCountById: function(id){
			return champions[id].championImageCount;
		},

		// returns their respective objects
		getChampions: function() {
			return champions;
		},
		getRegions: function() {
			return regions;
		},
		regionIconState: regionIconState
	}
});
