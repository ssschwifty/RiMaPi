angular.module('riot.controller')
.controller('MainController', function($scope, StringConstants) {

	function initiate() {
		$scope.btnGrade = StringConstants.btnGrade;
		$scope.btnLoot = StringConstants.btnLoot;
		$scope.btnScore = StringConstants.btnScore;
		$scope.btnDocu = StringConstants.btnDocu;
		$scope.btnProceedAnyway = StringConstants.btnProceedAnyway;
	}
	
	initiate();

	// fixes bootstraps dropdown problem
	$(document).ready(function() {
		$(".dropdown-toggle").dropdown();
	});
});