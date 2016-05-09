/*
* Provides the service-object UserData.  
*/
angular.module('riot.services')
.service('UserData', function() {
	// holds the summoner name
	var summoner;
	// holds the selected region
	var regionId;

	// holds the summoner name to compare to
	var compareSummoner;
	var compareRegionId;

	

	// defines public attributes
	return {
		summoner: summoner,
		compareSummoner: compareSummoner,
		regionId: regionId,
		compareRegionId: compareRegionId
	}
});
