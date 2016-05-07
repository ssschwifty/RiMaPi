angular.module('riot.controller.ui')
.controller('CompareController', function($scope, SharedProperties, UserData) {
	$scope.playerToCompareWithName;
	$scope.playerAImage;
	$scope.playerASummonerLevel;
	$scope.playerAName;
	$scope.donutLegend;
	var summonerStatisticData;

	$('html').on('region:change', function(region) {
		setTimeout(function() {
			getData();
		}, 20);
	});
	$scope.$on('$stateChangeSuccess', function() {
		getData();
	});
	$('html').on('summoner:change', function() {
		getData();
	});

	getData = function() {
		if (UserData.regionId != undefined && UserData.summoner != undefined) {
			SharedProperties.getComparisonStatistics(UserData.regionId, UserData.summoner)
			.then(function(response) {
				$scope.playerAName = response.data.Name;
				$scope.playerASummonerLevel = 'Summoner Level: ' + response.data.SummonerLevel;
				$scope.playerAImage = './sources/image/SummonerIcons/' + response.data.IconID + '.png';
				var chart = 'pieChart1';
				var chart2 = 'pieChart2';
				var barChart = 'lbarChart1';
				var barChart2 = 'lbarChart2';
				var barChart3 = 'rbarChart1';
				var barChart4 = 'rbarChart2';
				var scoreDescription = "Total Mastery Score";
				var levelDescription = "Total Mastery Levels";
				generatePieChart(chart, response);
				generatePieChart(chart2, response);
				generateBarChart(barChart, response.data.TotalScore, scoreDescription, null, "#1F77B4");
				generateBarChart(barChart2, response.data.TotalLevels, levelDescription, null, "#FF7F0E");
				generateBarChart(barChart3, response.data.TotalScore, scoreDescription, null, "#1F77B4");
				generateBarChart(barChart4, response.data.TotalLevels, levelDescription, null, "#FF7F0E");
				$scope.donutLegend = "Highest grades earned this Season";
			});
		}
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
