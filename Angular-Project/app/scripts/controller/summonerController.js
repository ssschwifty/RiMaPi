angular.module('riot.controller')
.controller('SummonerController', function($scope, UserData) {
	$scope.userData = UserData;
	$('#summonerInput').on('keypress', function(e) {
		if(e.keyCode == 13) {
			console.log('trigger enter');
			$('html').trigger('summoner:change');
		}
	})
});