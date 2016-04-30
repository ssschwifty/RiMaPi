angular.module('riot.controller')
.controller('MainController', ['$scope', '$state', 'stringConstants', function($scope, $state, stringConstants) {

	function initiate() {
		$scope.btnGrade = stringConstants.btnGrade;
		$scope.btnLoot = stringConstants.btnLoot;
		$scope.btnScore = stringConstants.btnScore;
		$scope.btnDocu = stringConstants.btnDocu;
		$state.go('home');
	}
	
	initiate();

	$scope.openGradeView = function() {
		$state.go('grade');
	}
	$scope.openLootView = function() {
		$state.go('loot');
	}
	$scope.openScoreView = function() {
		$state.go('score');
	}
	$scope.openDocuView = function() {
		$state.go('docu');
	}
}]);