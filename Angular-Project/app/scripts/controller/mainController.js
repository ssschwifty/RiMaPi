angular.module('riot.controller')
.controller('MainController', function($scope, StringConstants) {

	function initiate() {
		$scope.btnGrade = StringConstants.btnGrade;
		$scope.btnMastery = StringConstants.btnMastery;
		$scope.btnLevel = StringConstants.btnLevel;
		$scope.btnCompare = StringConstants.btnCompare;
		$scope.btnDocu = StringConstants.btnDocu;
		$scope.btnProceedAnyway = StringConstants.btnProceedAnyway;
	}
	
	initiate();

	// fixes bootstraps dropdown problem
	$(document).ready(function() {
		$(".dropdown-toggle").dropdown();
	});
});