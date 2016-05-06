angular.module('riot.controller.ui')
.controller('LevelController', function($scope, SharedProperties) {

	function getData() {
		if(UserData.regionId != undefined && UserData.summoner != undefined && UserData.summoner != "") {
			SharedProperties.getAllChampionMasteries(UserData.regionId, UserData.summoner)
			.then(function(response) {
				var testresult = response.data;
				for (var i = 0; i < testresult.length; i++) {
					console.log(testresult[i]);
					testresult[i].displayName = SharedProperties.getChampionDisplayNameById(testresult[i].championId);
				}
			});
		}
	}

});