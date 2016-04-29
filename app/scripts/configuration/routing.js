angular.module('riot')
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			abstract: true,
			url: '/',
			templateUrl: 'index.html'
		})

		.state('content.grade', {
			url:'/grade',
			templateUrl: 'views/gradeView.html',
			controller: 'MapController'
		})

		.state('content.score', {
			url:'/score',
			templateUrl: 'views/scroeView.html'
		})

		.state('content.loot', {
			url:'/loot',
			templateUrl: 'views/lootView.html'
		});

	$urlRouterProvider.otherwise('/');
});