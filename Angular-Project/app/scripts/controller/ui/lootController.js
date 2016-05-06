angular.module('riot.controller.ui')
.controller('LootController', function($scope, SharedProperties, Sort, UserData) {

	$scope.grantedChests = "";
	$scope.notGranted = "";
	$scope.championsShown = false;
	$scope.shownPotential;
	$scope.sorted = false;;
	$scope.champions = [];
	var unsortedChampions = [];
	var sortedChampions = [];
	
	$('html').on('region:load', function(region) {
		setTimeout(function() {
			$scope.getData();
		}, 20);
	});
	$('html').on('summoner:change', function() {
		$scope.getData();
	});
	$scope.$on('$stateChangeSuccess', function() {
		$scope.getData();
	});

	$scope.getData = function() {
		if(UserData.regionId != undefined && UserData.summoner != undefined) {
			SharedProperties.getAllChampionMasteries(UserData.regionId, UserData.summoner)
			.then(function(response) {
				var testresult = response.data;
				var granted = 0;
				var notGranted = 0;
				var potential = [];
				for (var i = 0; i < testresult.length; i++) {
					testresult[i].nameId = SharedProperties.getChampionNameIdById(testresult[i].championId);
					testresult[i].displayName = SharedProperties.getChampionDisplayNameById(testresult[i].championId);
					if(testresult[i].highestGrade == undefined){
						testresult[i].highestGrade = "N\\A";
					}
					if(testresult[i].chestGranted) {
						granted++;
					} else {
						potential.push(testresult[i]);
						notGranted++;
					}
				}
				unsortedChampions = [];
				sortedChampions = [];
				$scope.sorted = false;
				for (var i = 0; i < potential.length; i++) {
					unsortedChampions.push(potential[i]);
					sortedChampions.push(potential[i]);
				}
				$scope.champions = unsortedChampions;
				$scope.grantedChests = granted.toString();
				$scope.notGranted = notGranted.toString();

				$scope.championsShown = true;
			});
		}
	}

	$scope.sortChampions = function() {
		$scope.sorted = !$scope.sorted;
		Sort.sortByGradeThenChampionPoints(sortedChampions);
		setChampions($scope.sorted);
	}

	function setChampions(showSorted) {
		if(showSorted) {
			$scope.champions = [];
			for (var i = 0; i < sortedChampions.length; i++) {
				$scope.champions.push(sortedChampions[i]);
			}
		} else {
			$scope.champions = [];
			for (var i = 0; i < unsortedChampions.length; i++) {
				$scope.champions.push(unsortedChampions[i]);
			}
		}
	}
});
