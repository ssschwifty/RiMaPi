angular.module('riot.controller')
.controller('MainController', function($scope, StringConstants) {

	function initiate() {
		$scope.btnDocu = StringConstants.btnDocu;
		$scope.btnProceedAnyway = StringConstants.btnProceedAnyway;
		$scope.btnEnter = StringConstants.btnEnter;
		$scope.welcomeText = StringConstants.welcomeText;
	}
	
	initiate();

	$scope.headerButtonsArray = [
		{name: 'grade', text: 'Grade'},
		{name: 'loot', text: 'Mystery Chests'},
		{name: 'level', text: 'Level Up!'},
		{name: 'compare', text: 'Compare Yourself'}
	];
	$scope.setActivePage = function(index) {
		for (var i = 0; i < $scope.headerButtonsArray.length; i++) {
			$scope.headerButtonsArray[i].active = false;
		}
		$scope.headerButtonsArray[index].active = true;
	}

	// fixes bootstraps dropdown problem
	$(document).ready(function() {
		$(".dropdown-toggle").dropdown();
	});
});