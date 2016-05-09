/*
 * provides a controller for loot view
 */
angular.module('riot.controller.ui')
    .controller('LootController', function($scope, SharedProperties, Sort, UserData) {

        $scope.grantedChests = "";
        $scope.notGranted = "";
        $scope.championsShown = false;
        $scope.shownPotential;
        $scope.sorted = false;
        $scope.champions = [];



        var unsortedChampions = [];
        var sortedChampions = [];

        $('html').on('region:change', function(region) {
            setTimeout(function() {
                getLootData();
            }, 20);
        });
        $('html').on('summoner:change', function() {
            getLootData();
        });
        $scope.$on('$stateChangeSuccess', function() {
            getLootData();
        });

		$scope.$on('$destroy', function() {
			$('html').off('region:change');
			$('html').off('summoner:change');
		});

        function getLootData() {
            if (UserData.regionId != undefined && UserData.summoner != undefined && UserData.summoner != "") {
                SharedProperties.getAllChampionMasteries(UserData.regionId, UserData.summoner)
                    .then(function(response) {
                        if (response.data == "429") {
                            $scope.openPopup({ message : $scope.requestsExceededMessage});
                            return;
                        }
                        if (response.data == "NoDataFound") {
                            $scope.openPopup({ message : $scope.summonerNotFound});
                            return;
                        }
                        var testresult = response.data;
                        var granted = 0;
                        var notGranted = 0;
                        var potential = [];
                        for (var i = 0; i < testresult.length; i++) {
                            testresult[i].nameId = SharedProperties.getChampionNameIdById(testresult[i].championId);
                            testresult[i].displayName = SharedProperties.getChampionDisplayNameById(testresult[i].championId);
                            testresult[i].championMaxImageCount = SharedProperties.getChampionImageCountById(testresult[i].championId);
                            testresult[i].currentImageCount = 0;
                            testresult[i].imageLink = createImageLink(testresult[i].nameId, testresult[i].currentImageCount);
                            if (testresult[i].highestGrade == undefined) {
                                testresult[i].highestGrade = "N/A";
                            }
                            if (testresult[i].chestGranted) {
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
                        setHower();
                        $scope.championsShown = true;
                    });
            }
        }

        $scope.sortChampions = function() {
            $scope.sorted = !$scope.sorted;
            if ($scope.sorted) {
                Sort.sortByGradeThenChampionPoints(sortedChampions);
            }
            setChampions($scope.sorted);
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

        function setChampions(showSorted) {
            if (showSorted) {
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
