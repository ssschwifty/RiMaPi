angular.module('riot.controller')
.controller('MainController', function($scope, $state, StringConstants) {

	function initiate() {
		$scope.btnGrade = StringConstants.btnGrade;
		$scope.btnLoot = StringConstants.btnLoot;
		$scope.btnScore = StringConstants.btnScore;
		$scope.btnDocu = StringConstants.btnDocu;
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
	$scope.openWelcomeView = function() {
		$state.go('home');
	}

	// fixes bootstraps dropdown problem
	$(document).ready(function() {
		$(".dropdown-toggle").dropdown();
	});
});