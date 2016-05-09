angular.module('riot.controller.ui')
.controller('SplashscreenController', function($scope, $state) {
	$('html').on('summoner:change', function() {
		$state.go("page.home");
	});
});
