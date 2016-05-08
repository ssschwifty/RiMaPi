/*
* provides a controller for level up view
*/
angular.module('riot.controller.ui')
.controller('LevelController', function($scope, SharedProperties, UserData, Sort) {

	$scope.levelCap = [
		{cap: 0},
		{cap: 1800},
		{cap: 6000},
		{cap: 12600},
		{cap: 21600}
	];

	$('html').on('region:change', function(region) {
		setTimeout(function() {
			getLevelData();
		}, 20);
	});
	$('html').on('summoner:change', function() {
		getLevelData();
	});
	$scope.$on('$stateChangeSuccess', function() {
		getLevelData();
	});

	function getLevelData() {
		if(UserData.regionId != undefined && UserData.summoner != undefined && UserData.summoner != "") {
			SharedProperties.getAllChampionMasteries(UserData.regionId, UserData.summoner)
			.then(function(response) {
				if(response.data == "429"){
					$scope.openPopup($scope.requestsExceededMessage);
					return;
				}
				if(response.data == "NoDataFound") {
					$scope.openPopup($scope.summonerNotFound);
					return;
				}
				$scope.champions = [];
				var testresult = response.data;
				for (var i = 0; i < testresult.length; i++) {
					testresult[i].nameId = SharedProperties.getChampionNameIdById(testresult[i].championId);
					testresult[i].displayName = SharedProperties.getChampionDisplayNameById(testresult[i].championId);
					if(testresult[i].championPointsUntilNextLevel > 0) {
						$scope.champions.push(testresult[i]);
					}
				}
				Sort.sortByPointsUntilNextLevel($scope.champions);			
			});
		}
	}
});