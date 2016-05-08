angular.module('riot.controller')
.controller('MainController', function($scope, $uibModal) {

	function initiate() {
		$scope.btnDocu = "Documentation";
		$scope.btnProceedAnyway = "Proceed and enter information later";
		$scope.btnEnter = "Enter";
		$scope.welcomeText = "Welcome, Summoner!";
		$scope.requestsExceededMessage = "request limit";
		$scope.summonerNotFound = "Oops! The name you entered could not be resolved to a summoner in the selected region.";
		$scope.enterSummonerNames = "Whoa... slow down, my friend! You should enter the names of two summoners instead of sending empty Emails.";
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
	$scope.openPopup = function(_message) {
		var popup = $uibModal.open({
			templateUrl: './views/popupView.html',
			controller: 'PopupController',
			resolve: {
				message: function() {return _message;}
			}
		});
	}
	// fixes bootstraps dropdown problem
	$(document).ready(function() {
		$(".dropdown-toggle").dropdown();
	});
});