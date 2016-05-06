angular.module('riot.controller')
.controller('MainController', function($scope, StringConstants) {

	function initiate() {
		$scope.btnDocu = StringConstants.btnDocu;
		$scope.btnProceedAnyway = StringConstants.btnProceedAnyway;
		$scope.btnEnter = StringConstants.btnEnter;
		$scope.welcomeText = StringConstants.welcomeText;
	}
	
	initiate();

	// fixes bootstraps dropdown problem
	$(document).ready(function() {
		$(".dropdown-toggle").dropdown();
	});
});