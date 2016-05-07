angular.module('riot.controller.ui')
.controller('CompareController', function($scope, SharedProperties, UserData) {

	$scope.userData = UserData;
	$scope.playerAImage;
	$scope.playerASummonerLevel;
	$scope.playerAName;
	$scope.donutLegend;
	$scope.comparable = false;
	var summonerAScore;
	var summonerBScore;
	var summonerALevel;
	var summonerBLevel;

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
		$scope.getAData();
	});
	$('#compareSummonerInput').on('keypress', function(e) {
		if(e.keyCode == 13) {
			$('#compareSummonerInput').blur();
			$('html').trigger('compareSummoner:change');
		}
	});

	$scope.getAData = function() {
		if (UserData.regionId != undefined && UserData.summoner != undefined && UserData.summoner != "" && UserData.compareSummoner != undefined && UserData.compareSummoner != "") {
			SharedProperties.getComparisonStatistics(UserData.regionId, UserData.summoner)
			.then(function(response) {
				$scope.comparable = false;
				$scope.playerAName = response.data.Name;
				$scope.playerASummonerLevel = response.data.SummonerLevel;
				$scope.playerAImage = './sources/image/SummonerIcons/' + response.data.IconID + '.png';
				summonerAScore = response.data.TotalScore;
				summonerALevel = response.data.TotalLevels;
				var playerATopChampions = response.data.TopChamps;
				for (var i = 0; i < playerATopChampions.length; i++) {
					playerATopChampions[i].nameId = SharedProperties.getChampionNameIdById(playerATopChampions[i].championId);
					playerATopChampions[i].displayName = SharedProperties.getChampionDisplayNameById(playerATopChampions[i].championId);
				}
				$scope.playerATopChamps = playerATopChampions;
				getBData(response);
			});
		}
	}
	function getBData(_responseA) {
		if (UserData.regionId != undefined && UserData.compareSummoner != undefined && UserData.compareSummoner != "") {
			SharedProperties.getComparisonStatistics(UserData.regionId, UserData.compareSummoner)
			.then(function(response) {
				$scope.playerBName = response.data.Name;
				$scope.playerBSummonerLevel = response.data.SummonerLevel;
				$scope.playerBImage = './sources/image/SummonerIcons/' + response.data.IconID + '.png';
				summonerBScore = response.data.TotalScore;
				summonerBLevel = response.data.TotalLevels;
				var playerBTopChampions = response.data.TopChamps;
				for (var i = 0; i < playerBTopChampions.length; i++) {
					playerBTopChampions[i].nameId = SharedProperties.getChampionNameIdById(playerBTopChampions[i].championId);
					playerBTopChampions[i].displayName = SharedProperties.getChampionDisplayNameById(playerBTopChampions[i].championId);
				}
				$scope.playerBTopChamps = playerBTopChampions;
				populateCharts(response, _responseA);
			});
		}
	}

	function populateCharts(b, a) {
		var highestScore = Math.max(a.data.TotalScore, b.data.TotalScore);
		var highestLevel = Math.max(a.data.TotalLevels, b.data.TotalLevels);

		var scoreDescription = "Total Mastery Score";
		var levelDescription = "Total Mastery Levels";
		$scope.donutLegend = "Highest grades earned this Season";

		var chart = 'pieChart1';
		var chart2 = 'pieChart2';	
		var barChart = 'lbarChart1';
		var barChart2 = 'lbarChart2';			
		var barChart3 = 'rbarChart1';
		var barChart4 = 'rbarChart2';

		generatePieChart(chart, a);
		generatePieChart(chart2, b);

		generateBarChart(barChart, a.data.TotalScore, scoreDescription, highestScore, "#1F77B4");
		generateBarChart(barChart2, a.data.TotalLevels, levelDescription, highestLevel, "#FF7F0E");
		generateBarChart(barChart3, b.data.TotalScore, scoreDescription, highestScore, "#1F77B4");
		generateBarChart(barChart4, b.data.TotalLevels, levelDescription, highestLevel, "#FF7F0E");
		$scope.comparable = true;
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
});
