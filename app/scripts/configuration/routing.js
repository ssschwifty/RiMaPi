angular.module('riot')
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'index.html'
		})
		.state('grade', {
			url:'/grade',
			templateUrl: 'views/gradeView.html',
			controller: 'GradeController'
		})
		.state('score', {
			url:'/score',
			templateUrl: 'views/scoreView.html',
			controller: 'ScoreController'
		})
		.state('loot', {
			url:'/loot',
			templateUrl: 'views/lootView.html',
			controller: 'LootController'
		});

	$urlRouterProvider.otherwise('/');
});