angular.module('riot.controller.ui')
.controller('CompareController', function($scope, SharedProperties, UserData) {
  $scope.playerToCompareWithName;
  $scope.playerAImage;
  $scope.playerASummonerLevel;
  $scope.playerAName;
  $scope.donutLegend;
  var summonerStatisticData;

  $('html').on('region:load', function(region) {
		setTimeout(function() {
			$scope.getData();
		}, 20);
	});

	$scope.getData = function() {
    console.log(UserData.regionId);
    console.log(UserData.summoner);
		if(UserData.regionId != undefined && UserData.summoner != undefined) {
      console.log('hallo');
			SharedProperties.getComparisonStatistics(UserData.regionId, UserData.summoner)
			.then(function(response) {
        console.log(response);
        $scope.playerAName = response.data.Name;
        $scope.playerASummonerLevel = 'Summoner Level: ' + response.data.SummonerLevel;
        $scope.playerAImage = './sources/image/SummonerIcons/' + response.data.IconID + '.png';
        var chart = 'pieChart1';
        var chart2 = 'pieChart2';
        generatePieChart(chart, response);
        generatePieChart(chart2, response);
        $scope.donutLegend = "Highest grades earned this Season";

        console.log($scope.playerAImage);
      });
    }
  }






  function generateBarChart(chart, response){
    c3.generate({
      bindto: '#' + chart,
        data: {
            columns: [
                ['S', response.data.highestGradeStatistic.S ]
                ['A', response.data.highestGradeStatistic.A]
            ],
            type : 'donut'
        },
        donut: {
            title: ""
        }
    });
  }


  function generatePieChart(chart, response){
    c3.generate({
      bindto: '#' + chart,
        data: {
            columns: [
                ['S', response.data.highestGradeStatistic.S ],
                ['A', response.data.highestGradeStatistic.A],
                ['B', response.data.highestGradeStatistic.B],
                ['C', response.data.highestGradeStatistic.C],
                ['D', response.data.highestGradeStatistic.D],
            ],
            type : 'donut'
        },
        donut: {
            title: ""
        }
    });
  }

  $scope.$on('$stateChangeSuccess', function() {
    $scope.getData();
  });
});
