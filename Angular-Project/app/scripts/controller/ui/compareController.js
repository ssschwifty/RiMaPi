angular.module('riot.controller.ui')
.controller('CompareController', function($scope, SharedProperties, UserData) {

	$scope.userData = UserData;
	$scope.donutLegend;
	$scope.comparable = false;

	$scope.email;

	var summonerAResponse;
	var summonerBResponse;
	var highestScore;
	var highestLevel;

	$('html').on('region:change', function(region) {
		setTimeout(function() {
			$scope.getAData();	
		}, 20);
	});
	$scope.$on('$stateChangeSuccess', function() {
		$scope.getAData();
	});
	$('html').on('summoner:change', function() {
		$scope.getAData();
	});
	$('html').on('compareSummoner:change', function() {
		$scope.getBData();
	});

	$('#compareSummonerInput').on('keypress', function(e) {
		if(e.keyCode == 13) {
			$('#summonerInput').blur();
			$('html').trigger('compareSummoner:change');
		}
	});

	function isDefined(data) {
		if(data != undefined && data != "") {
			return true;
		} else {
			return false;
		}
	}
	$scope.getAData = function() {
		if (UserData.regionId != undefined && isDefined(UserData.summoner)) {
			SharedProperties.getComparisonStatistics(UserData.regionId, UserData.summoner)
			.then(function(response) {
				if(response.data != "NoDataFound") {
					$scope.comparable = false;
					$scope.playerAName = response.data.Name;
					$scope.playerASummonerLevel = 'Summoner Level ' + response.data.SummonerLevel;
					$scope.playerAImage = './sources/image/SummonerIcons/' + response.data.IconID + '.png';
					var playerATopChampions = response.data.TopChamps;
					for (var i = 0; i < playerATopChampions.length; i++) {
						playerATopChampions[i].nameId = SharedProperties.getChampionNameIdById(playerATopChampions[i].championId);
						playerATopChampions[i].displayName = SharedProperties.getChampionDisplayNameById(playerATopChampions[i].championId);
						if(playerATopChampions[i].highestGrade == undefined){
							playerATopChampions[i].highestGrade = "N/A";
						}
					}
					$scope.playerATopChamps = playerATopChampions;
					summonerAResponse = response;
					if(isDefined(summonerBResponse)){
						populateLeftChart(response);
						populateRightChart(summonerBResponse);
					} else {
						populateLeftChart(response);
					}
				} else if(response.status == "429"){
					$scope.openPopup($scope.requestsExceededMessage);
				} else {
					$scope.openPopup($scope.summonerNotFound);
				}
			});
		}
	}
	$scope.getBData = function() {
		if (UserData.regionId != undefined && isDefined(UserData.compareSummoner)) {
			SharedProperties.getComparisonStatistics(UserData.regionId, UserData.compareSummoner)
			.then(function(response) {
				if(response.data != "NoDataFound") {
					$scope.playerBName = response.data.Name;
					$scope.playerBSummonerLevel = 'Summoner Level ' + response.data.SummonerLevel;
					$scope.playerBImage = './sources/image/SummonerIcons/' + response.data.IconID + '.png';
					var playerBTopChampions = response.data.TopChamps;
					for (var i = 0; i < playerBTopChampions.length; i++) {
						playerBTopChampions[i].nameId = SharedProperties.getChampionNameIdById(playerBTopChampions[i].championId);
						playerBTopChampions[i].displayName = SharedProperties.getChampionDisplayNameById(playerBTopChampions[i].championId);
						if(playerBTopChampions[i].highestGrade == undefined){
							playerBTopChampions[i].highestGrade = "N/A";
						}
					}
					$scope.playerBTopChamps = playerBTopChampions;
					summonerBResponse = response;
					if(isDefined(summonerAResponse)){
						populateRightChart(response);
						populateLeftChart(summonerAResponse);
					} else {
						populateRightChart(response);
					}
				} else if(response.status == "429"){
					$scope.openPopup($scope.requestsExceededMessage);
				} else {
					$scope.openPopup($scope.summonerNotFound);
				}
			});
		}
	}

	function populateLeftChart(response) {
		if(summonerBResponse != undefined) {
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

	function populateRightChart(response) {
		if(summonerAResponse != undefined) {	
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
				}
			}
		});
	}

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
		SharedProperties.sendEmailTo(address)
		.then(
			function(response) {
				//popup: alles ok
			},
			function(respnse) {
				//popup nochmla versuchen
			}
		);
	}


	$scope.getAData();
});
