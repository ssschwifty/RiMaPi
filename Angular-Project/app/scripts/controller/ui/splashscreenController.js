angular.module('riot.controller.ui')
.controller('SplashscreenController', function($scope, $state) {
	$('html').on('summoner:change', function() {
		$scope.setActivePage('home');
		$state.go("page.home");
	});
});
