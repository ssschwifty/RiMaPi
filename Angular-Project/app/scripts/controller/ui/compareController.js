/*
* porvides functions and attributes for the compareView
* depends on SharedProperties, UserData, $location
*/

angular.module('riot.controller.ui')
.controller('CompareController', function($scope, SharedProperties, UserData, $location) {

	// initially declare variables
	$scope.userData = UserData;
	$scope.donutLegend;
	$scope.comparable = false;
	$scope.email;
	var summonerAResponse;
	var summonerBResponse;
	var highestScore;
	var highestLevel;

	// get summoner names from url if they are undefined until now
	if (UserData.summoner == undefined) {
		UserData.summoner = $location.search()["a"];
	}
	if (UserData.compareSummoner == undefined) {
		UserData.compareSummoner = $location.search()["b"];
	}

	// listen for changes regarding the region
	$('html').on('region:change', function(region) {
		setTimeout(function() {
			$scope.getAData();
		}, 20);
	});
	// listen for the event that gets triggered when the route state changes
	$scope.$on('$stateChangeSuccess', function() {
		$scope.getAData();
	});
	// listen for changes regarding summoner
	$('html').on('summoner:change', function() {
		$scope.getAData();
	});
	// listen for changes regarding the summoner to compare to
	$('html').on('compareSummoner:change', function() {
		$scope.getBData();
	});
	// trigger event, that compareSummoner changed when the enter key is hit
	$('#compareSummonerInput').on('keypress', function(e) {
		if (e.keyCode == 13) {
			$('#summonerInput').blur();
			$('html').trigger('compareSummoner:change');
		}
	});
	// Helper function to determine if <data> is defined or an empty string
	function isDefined(data) {
		if(data != undefined && data != "" && data != null) {
			return true;
		} else {
			return false;
		}
	}
	// retrieves comparissonStatistics for summoner A
	// if request limit is hit or no data was found, an error popup opens
	// if no error occurs the data is displayed in charts
	// if summoner B's is already defined, update those charts, too
	$scope.getAData = function() {
		if (UserData.regionId != undefined && isDefined(UserData.summoner)) {
			SharedProperties.getComparisonStatistics(UserData.regionId, UserData.summoner)
			.then(function(response) {
				try {
					if (response.data == "429") {
						$scope.openPopup($scope.requestsExceededMessage);
						return;
					}
					if (response.data == "NoDataFound") {
						$scope.openPopup($scope.summonerNotFound);
						return;
					}
					$scope.comparable = false;
					$scope.playerAName = response.data.Name;
					$scope.playerASummonerLevel = 'Summoner Level ' + response.data.SummonerLevel;
					$scope.playerAImage = './sources/image/SummonerIcons/' + response.data.IconID + '.png';
					var playerATopChampions = response.data.TopChamps;
					for (var i = 0; i < playerATopChampions.length; i++) {
						playerATopChampions[i].nameId = SharedProperties.getChampionNameIdById(playerATopChampions[i].championId);
						playerATopChampions[i].displayName = SharedProperties.getChampionDisplayNameById(playerATopChampions[i].championId);
						if (playerATopChampions[i].highestGrade == undefined) {
							playerATopChampions[i].highestGrade = "N/A";
						}
					}
					$scope.playerATopChamps = playerATopChampions;
					summonerAResponse = response;
					if (isDefined(summonerBResponse)) {
						populateLeftChart(response);
						populateRightChart(summonerBResponse);
					} else {
						populateLeftChart(response);
					}
				} catch (e) {
					$scope.openPopup($scope.unknownError);
				}
			});
		}
	}
	// retrieves comparissonStatistics for summoner B
	// if request limit is hit or no data was found, an error popup opens
	// if no error occurs the data is displayed in charts
	// if summoner A's is already defined, update those charts, too
	$scope.getBData = function() {
		if (UserData.regionId != undefined && isDefined(UserData.compareSummoner)) {
			SharedProperties.getComparisonStatistics(UserData.regionId, UserData.compareSummoner)
			.then(function(response) {
				try {
					if (response.data == "429") {
						$scope.openPopup($scope.requestsExceededMessage);
						return;
					}
					if (response.data == "NoDataFound") {
						$scope.openPopup($scope.summonerNotFound);
						return;
					}
					$scope.playerBName = response.data.Name;
					$scope.playerBSummonerLevel = 'Summoner Level ' + response.data.SummonerLevel;
					$scope.playerBImage = './sources/image/SummonerIcons/' + response.data.IconID + '.png';
					var playerBTopChampions = response.data.TopChamps;
					for (var i = 0; i < playerBTopChampions.length; i++) {
						playerBTopChampions[i].nameId = SharedProperties.getChampionNameIdById(playerBTopChampions[i].championId);
						playerBTopChampions[i].displayName = SharedProperties.getChampionDisplayNameById(playerBTopChampions[i].championId);
						if (playerBTopChampions[i].highestGrade == undefined) {
							playerBTopChampions[i].highestGrade = "N/A";
						}
					}
					$scope.playerBTopChamps = playerBTopChampions;
					summonerBResponse = response;
					if (isDefined(summonerAResponse)) {
						populateRightChart(response);
						populateLeftChart(summonerAResponse);
					} else {
						populateRightChart(response);
					}
				} catch (e) {
					$scope.openPopup($scope.unknownError);
				}
			});
		}
	}
	// populates charts with the response from getAData
	// @param response: ComparissonStatistic from getAData
	function populateLeftChart(response) {
		if (summonerBResponse != undefined) {
			highestScore = Math.max(response.data.TotalScore, summonerBResponse.data.TotalScore);
			highestLevel = Math.max(response.data.TotalLevels, summonerBResponse.data.TotalLevels);
		} else {
			highestScore = response.data.TotalScore;
			highestLevel = response.data.TotalLevels;
		}

		var scoreADescription = "Total Mastery Score";
		var levelADescription = "Total Mastery Levels";
		$scope.donutALegend = "Highest grades earned this Season";

		var chart = 'pieChart1';
		var barChart = 'lbarChart1';
		var barChart2 = 'lbarChart2';
		generatePieChart(chart, response);
		generateBarChart(barChart, response.data.TotalScore, scoreADescription, highestScore, "#1F77B4");
		generateBarChart(barChart2, response.data.TotalLevels, levelADescription, highestLevel, "#FF7F0E");
	}
	// populates charts with the response from getBData
	// @param response: ComparissonStatistic from getBData
	function populateRightChart(response) {
		if (summonerAResponse != undefined) {
			highestScore = Math.max(summonerAResponse.data.TotalScore, response.data.TotalScore);
			highestLevel = Math.max(summonerAResponse.data.TotalLevels, response.data.TotalLevels);
		} else {
			highestScore = response.data.TotalScore;
			highestLevel = response.data.TotalLevels;
		}

		var scoreBDescription = "Total Mastery Score";
		var levelBDescription = "Total Mastery Levels";
		$scope.donutBLegend = "Highest grades earned this Season";

		var chart2 = 'pieChart2';
		var barChart3 = 'rbarChart1';
		var barChart4 = 'rbarChart2';

		generatePieChart(chart2, response);
		generateBarChart(barChart3, response.data.TotalScore, scoreBDescription, highestScore, "#1F77B4");
		generateBarChart(barChart4, response.data.TotalLevels, levelBDescription, highestLevel, "#FF7F0E");
	}
	// generates bar chart
	// @param chart:        id of HTML element to bind to
	// @param response:     int, either TotalScore or TotalLevels
	// @param description:  string, text to display as a description
	// @param max:          int, max value of x-axis
	function generateBarChart(chart, response, description, max, color) {
		c3.generate({
			bindto: '#' + chart,
			data: {
				columns: [
					[description, response]
				],
				type: 'bar',
				colors: {
					'Total Mastery Levels': "#FF7F0E"
				},
				labels: true
			},
			axis: {
				y: {
					max: max
				},
				x: {
					tick: {
						format: function(x) {
							return '';
						}
					}
				}
			}
		});
	}
	// generates pie chart
	// @param chart:        id of HTML element to bind to
	// @param response:     ComparissonStatistic obj
	function generatePieChart(chart, response) {
		c3.generate({
			bindto: '#' + chart,
			data: {
				columns: [
					['S', response.data.highestGradeStatistic.S],
					['A', response.data.highestGradeStatistic.A],
					['B', response.data.highestGradeStatistic.B],
					['C', response.data.highestGradeStatistic.C],
					['D', response.data.highestGradeStatistic.D],
				],
				type: 'donut'
			},
			donut: {
				title: ""
			}
		});
	}
	$scope.sendEmail = function(address) {
		if (summonerAResponse != undefined && summonerBResponse != undefined) {
			html2canvas($(".summoners")[0], {
				onrendered: function(canvas) {
					// canvas is the final rendered <canvas> element
					var myImage = canvas.toDataURL();
					SharedProperties.sendCompareEmail(address, $scope.userData.summoner, $scope.userData.compareSummoner, myImage)
						.then(
							function(response) {
							},
							function(respnse) {
								$scope.openPopup($scope.unknownError);
							}
						);
				}
			});
		} else {
			$scope.openPopup($scope.enterSummonerNames);
		}
	}

	$scope.getAData();
});