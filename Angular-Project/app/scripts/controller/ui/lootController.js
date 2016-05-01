angular.module('riot.controller.ui')
.controller('LootController', function($scope, SharedProperties) {

	$scope.grantedChests = "";
	$scope.notGranted = "";
	$scope.potential;

	$scope.getData = function() {
		SharedProperties.getMockupData()
		.then(function(response) {
			var testresult = response.data;
			var granted = 0;
			var notGranted = 0;
			var potential = [];
			for (var i = 0; i < testresult.length; i++) {
				testresult[i].championName = SharedProperties.getChampionById(testresult[i].championId);
				if(testresult[i].chestGranted) {
					granted++;
				} else {
					potential.push(testresult[i]);
					notGranted++;
				}
			}
			$scope.grantedChests = granted.toString();
			$scope.notGranted = notGranted.toString();
			$scope.potential = potential;
		});
	}

});



