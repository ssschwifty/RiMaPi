/*
* provides a controller for the summoner name input directive
*/
angular.module('riot.controller')
.controller('SummonerController', function($scope, UserData) {
	$scope.userData = UserData;
	$('#summonerInput').on('keypress', function(e) {
		if(e.keyCode == 13) {
			$('#summonerInput').blur();
			$('html').trigger('summoner:change');
		}
	});
});