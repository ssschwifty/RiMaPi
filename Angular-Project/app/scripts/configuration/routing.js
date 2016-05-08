/*
* configures routing between pages
*/
angular.module('riot')
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('splashScreen', {
			url: '/entry',
			templateUrl: 'views/splashScreen.html'
		})

		.state('page', {
			abstract: true,
			templateUrl: 'views/pageView.html'
		})
			.state('page.home', {
				url: '/home',
				templateUrl: 'views/homeView.html'
			})
			.state('page.improve', {
				url:'/improve',
				templateUrl: 'views/improveView.html',
				controller: 'GradeController'
			})
			.state('page.level', {
				url:'/level',
				templateUrl: 'views/levelUpView.html',
				controller: 'LevelController'
			})
			.state('page.loot', {
				url:'/loot',
				templateUrl: 'views/lootView.html',
				controller: 'LootController'
			})
			.state('page.compare', {
				url:'/compare/?a&b',
 				templateUrl: 'views/compareView.html',
				controller: 'CompareController'
			});

	$urlRouterProvider.otherwise('/entry');
});
