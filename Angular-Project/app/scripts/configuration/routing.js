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
		// page is abstract because it includes the elements that are the same on every page beneath
		.state('page', {
			abstract: true,
			templateUrl: 'views/pageView.html'
		})
		// one of the following routes (or the splashscreen) has to be active
			.state('page.home', {
				url: '/home',
				templateUrl: 'views/homeView.html'
			})
			.state('page.improve', {
				url:'/improve',
				templateUrl: 'views/improveView.html',
				controller: 'ImproveController'
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
	// fallback to entry page
	$urlRouterProvider.otherwise('/entry');
});
