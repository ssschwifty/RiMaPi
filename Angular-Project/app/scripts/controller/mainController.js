/*
* defines the main Controller that provides strings, pagetransition functions and other useful stuff
*/
angular.module('riot.controller')
.controller('MainController', function($scope, $uibModal, $location, $state, UserData) {

	

	function initialize() {
		$scope.btnDocu = "Documentation";
		$scope.btnProceedAnyway = "Proceed and enter information later";
		$scope.btnEnter = "Enter";
		$scope.welcomeText = "Welcome, Summoner!";
		$scope.requestsExceededMessage = "The Request Limit of our Riot api key has been reached. Please wait 5 secons and try again!";
		$scope.unknownError = 'An error has occured. Please try again!';
		$scope.mailSuccessfullySent = 'Yaaaaay! Heimerdinger has done his job well. The e-mail is on its way to your friend! Thanks for using RiMaPi!';
		$scope.summonerNotFound = "Oops! The name you entered could not be resolved to a summoner in the selected region. Please check if you have spelled your summonername correctly and if you have selected the correct region! Then try again!";
		$scope.enterSummonerNames = "Whoa... slow down, my friend! You should enter the names of two summoners instead of sending empty Emails.";
		$scope.enterEmail = "Please enter a Email address";
	}
	initialize();

	$scope.headerButtonsArray = {
				home: {name: 'home', text: 'Home'},
				improve: {name: 'improve', text: 'Improve yourself!'},
				loot: {name: 'loot', text: 'Mystery Chests'},
				level: {name: 'level', text: 'Level Up!'},
				compare: {name: 'compare', text: 'Compare Yourself'}
			};

	$scope.setActivePage = function(index) {
		if(index != "entry") {
			for(var tab in $scope.headerButtonsArray) {
				$scope.headerButtonsArray[tab].active = false;
			}
			$scope.headerButtonsArray[index].active = true;
		}
	}
	var hash = $location.search();
	var url = $location.path().replace(/\//g, '');
	if(url == "entry") {
		$state.go('splashScreen'); 
	} else {
		$scope.setActivePage(url);
		$state.go('page.'+url, {as: hash["as"], ar: hash["ar"], ba: hash["ba"], br: hash["br"]});
	}

	// get summoner names from url if they are undefined until now
	if (UserData.summoner == undefined) {
		UserData.summoner = $location.search()["as"];
		UserData.regionId = $location.search()["ar"];
	}
	if (UserData.compareSummoner == undefined) {
		UserData.compareSummoner = $location.search()["bs"];
		UserData.compareRegionId = $location.search()["br"];
	}

	$scope.openPopup = function(popUpParameters) {
		var popup = $uibModal.open({
			templateUrl: './views/popupView.html',
			controller: 'PopupController',
			resolve: {
				popUpParameters: function() {return popUpParameters;}
			}
		});
	}
	// fixes bootstraps dropdown problem
	$(document).ready(function() {
		$(".dropdown-toggle").dropdown();
	});
});
