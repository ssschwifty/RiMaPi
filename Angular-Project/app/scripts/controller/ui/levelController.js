/*
* provides a controller for level up view
*/
angular.module('riot.controller.ui')
.controller('LevelController', function($scope, SharedProperties, UserData, Sort) {
	$scope.champions = [];

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
					$scope.openPopup({ message : $scope.requestsExceededMessage});
					return;
				}
				if(response.data == "NoDataFound") {
					$scope.openPopup({ message : $scope.summonerNotFound});
					return;
				}
				var testresult = response.data;
				for (var i = 0; i < testresult.length; i++) {
					testresult[i].nameId = SharedProperties.getChampionNameIdById(testresult[i].championId);
					testresult[i].displayName = SharedProperties.getChampionDisplayNameById(testresult[i].championId);
					testresult[i].championMaxImageCount = SharedProperties.getChampionImageCountById(testresult[i].championId);
					testresult[i].currentImageCount = 0;
					testresult[i].imageLink = createImageLink(testresult[i].nameId, testresult[i].currentImageCount);
					if(testresult[i].championPointsUntilNextLevel > 0) {
						$scope.champions.push(testresult[i]);
					}
				}
				setHower();
				Sort.sortByPointsUntilNextLevel($scope.champions);
			});
		}
	}



	function setHower() {
		setTimeout(function() {
			$('.championContainer').each(function(index) {
				var hover = false;
				$(this).hover(
					function() {
						hover = true;
						var champIndex = this.id;
						var champ = $scope.champions[this.id];
						var max = champ.championMaxImageCount;
						if (hover) {
							$scope.champions[champIndex].imageLink = createImageLink(champ.nameId, 1);
							$scope.$apply();
							fade(2);
						}
						function fade(i) {
							setTimeout(function() {
								if (hover) {
									$scope.champions[champIndex].imageLink = createImageLink(champ.nameId, i);
									$scope.$apply();
									if(i < max){
										i++
									}
									if (i == max) {
										i = 0;
									}
									fade(i);
								}
							}, 900);
						}
					},
					function() {
						hover = false;
						$scope.champions[this.id].imageLink = createImageLink($scope.champions[this.id].nameId, 0);
						$scope.$apply();
					}
				);
			});
		}, 1000);
	}

	function createImageLink(championName, championImageCount) {
		return './sources/image/champions/' + championName + '_' + championImageCount + '.jpg';
	}
});
