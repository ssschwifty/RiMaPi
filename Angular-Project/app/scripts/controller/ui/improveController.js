/*
* provides a controller for improveView
*/
angular.module('riot.controller.ui')
.controller('ImproveController', function($scope, SharedProperties, UserData, Sort) {

	$scope.champions = [];
	$scope.sorted = false;
	$scope.desc = false;
	$scope.championsShown = false;
	var gradeSortedChampions = [];
	var pointSortedChampions = [];

	$('html').on('region:change', function(region) {
		setTimeout(function() {
			getImproveData();
		}, 20);
	});
	$('html').on('summoner:change', function() {
		getImproveData();
	});
	$scope.$on('$stateChangeSuccess', function() {
		getImproveData();
	});

	function getImproveData() {
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
				gradeSortedChampions = [];
				pointSortedChampions = [];
				for (var i = 0; i < testresult.length; i++) {
					testresult[i].nameId = SharedProperties.getChampionNameIdById(testresult[i].championId);
					testresult[i].displayName = SharedProperties.getChampionDisplayNameById(testresult[i].championId);
					testresult[i].championMaxImageCount = SharedProperties.getChampionImageCountById(testresult[i].championId);
					testresult[i].currentImageCount = 0;
					testresult[i].imageLink = createImageLink(testresult[i].nameId, testresult[i].currentImageCount);
					if(testresult[i].highestGrade == undefined){
						testresult[i].highestGrade = "N/A";
					}
					gradeSortedChampions.push(testresult[i]);
					pointSortedChampions.push(testresult[i]);
				}
				$scope.champions = pointSortedChampions;
				$scope.championsShown = true;
				setHower();
			});
		}
	}
	// shows champions by champion points descending
	$scope.descChampions = function() {
		$scope.desc = !$scope.desc;
		pointSortedChampions.reverse();
		setChampions($scope.sorted);
	}
	// sorts champions by grade
	$scope.sortChampions = function() {
		$scope.sorted = !$scope.sorted;
		if($scope.sorted) {
			Sort.sortByGradeThenChampionPoints(gradeSortedChampions);
		}
		setChampions($scope.sorted);
	}

	/// Sorry that were havin this method duplicated in every controller. We know its bad practice since its duplicate code.
	/// but the challenge ends in a few hours and wed like to have this feature :D
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

	function setChampions(showSorted) {
		if(showSorted) {
			$scope.champions = [];
			for (var i = 0; i < gradeSortedChampions.length; i++) {
				$scope.champions.push(gradeSortedChampions[i]);
			}
		} else {
			$scope.champions = [];
			for (var i = 0; i < pointSortedChampions.length; i++) {
				$scope.champions.push(pointSortedChampions[i]);
			}
		}
	}
});
