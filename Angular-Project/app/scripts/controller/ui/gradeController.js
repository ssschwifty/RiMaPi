angular.module('riot.controller.ui')
.controller('GradeController', function($scope, SharedProperties, UserData, Sort) {

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
				if(response.data != "NoDataFound") {
					var testresult = response.data;
					for (var i = 0; i < testresult.length; i++) {
						testresult[i].nameId = SharedProperties.getChampionNameIdById(testresult[i].championId);
						testresult[i].displayName = SharedProperties.getChampionDisplayNameById(testresult[i].championId);
						if(testresult[i].highestGrade == undefined){
							testresult[i].highestGrade = "N/A";
						}
						gradeSortedChampions.push(testresult[i]);
						pointSortedChampions.push(testresult[i]);
					}
					$scope.champions = pointSortedChampions;
					$scope.championsShown = true;
				} else if(response.status == "429"){
					$scope.openPopup($scope.requestsExceededMessage);
				} else {
					$scope.openPopup($scope.summonerNotFound);
				}			
			});
		}
	}
	$scope.descChampions = function() {
		$scope.desc = !$scope.desc;
		pointSortedChampions.reverse();
		setChampions($scope.sorted);
	}

	$scope.sortChampions = function() {
		$scope.sorted = !$scope.sorted;
		if($scope.sorted) {
			Sort.sortByGradeThenChampionPoints(gradeSortedChampions);
		}
		setChampions($scope.sorted);
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