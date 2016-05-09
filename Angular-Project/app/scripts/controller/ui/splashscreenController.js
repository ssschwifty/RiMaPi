angular.module('riot.controller.ui')
.controller('SplashscreenController', function($scope, $state) {
	$('#summonerInput').on('keypress', function(e) {
		if (e.keyCode == 13) {
			$state.go('page.home');
			$('#compareSummonerInput').blur();
		}
	});
});