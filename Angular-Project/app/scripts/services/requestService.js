angular.module('riot.services')
.factory('RequestService', function($http) {

	var championMasteries;

	return {
		getMockupData: function() {
			 return $http.get('../app/scripts/controller/narmor_test_result.json');
		},
		getAllChampionMasteries: function(playerId) {
			// TODO reeuest zu eigenem server
		}
	}

});