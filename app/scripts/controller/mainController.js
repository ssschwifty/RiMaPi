angular.module('riot.controller')
.controller('MainController', ['$scope', '$state', 'stringConstants', function($scope, $state, stringConstants) {

	function initiate() {
		$state.go('home');
		$scope.btnGrade = stringConstants.btnGrade;
		$scope.btnLoot = stringConstants.btnLoot;
		$scope.btnScore = stringConstants.btnScore;
		$scope.btnDocu = stringConstants.btnDocu;
	}
	initiate();
	$scope.openView= function(view) {
		$state.go(view);
	}
}]);