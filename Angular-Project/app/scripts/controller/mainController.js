angular.module('riot.controller')
.controller('MainController', function($scope, $uibModal, $location, $state) {

	function initiate() {
		$scope.btnDocu = "Documentation";
		$scope.btnProceedAnyway = "Proceed and enter information later";
		$scope.btnEnter = "Enter";
		$scope.welcomeText = "Welcome, Summoner!";
		$scope.requestsExceededMessage = "The Request Limit of our Riot api key has been reached. Please wait 5 secons and try again!";
		$scope.unknownError = 'An error has occured. Please try again!';
		$scope.summonerNotFound = "Oops! The name you entered could not be resolved to a summoner in the selected region. Please check if you have spelled your summonername correctly and if you have selected the correct region! Then try again!";
		$scope.enterSummonerNames = "Whoa... slow down, my friend! You should enter the names of two summoners instead of sending empty Emails.";
		$scope.enterEmail = "Please enter a Email address";
		var hash = $location.search();
		if(hash != undefined) {
			$state.go('page.compare', {a: hash["a"], b: hash["b"]});
		} else {
			$state.go('splashScreen');
		}
	}

	initiate();

	$scope.headerButtonsArray = [
		{name: 'improve', text: 'Improve yourself!'},
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
