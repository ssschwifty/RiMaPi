/*
* configures routing between pages
*/
angular.module('riot')
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('splashScreen', {
			url: '/entry',
			templateUrl: 'views/splashScreen.html',
			controller: 'SplashscreenController'
		})
		// page is abstract because it includes the elements that are the same on every page beneath
		.state('page', {
			abstract: true,
			templateUrl: 'views/pageView.html'
		})
		// one of the following routes (or the splashscreen) has to be active
			.state('page.home', {
				url: '/home/?as&ar&bs&br',
				templateUrl: 'views/homeView.html'
			})
			.state('page.improve', {
				url:'/improve/?as&ar&bs&br',
				templateUrl: 'views/improveView.html',
				controller: 'ImproveController'
			})
			.state('page.level', {
				url:'/level/?as&ar&bs&br',
				templateUrl: 'views/levelUpView.html',
				controller: 'LevelController'
			})
			.state('page.loot', {
				url:'/loot/?as&ar&bs&br',
				templateUrl: 'views/lootView.html',
				controller: 'LootController'
			})
			.state('page.compare', {
				url:'/compare/?as&ar&bs&br',
 				templateUrl: 'views/compareView.html',
				controller: 'CompareController'
			});
	// fallback to entry page
	$urlRouterProvider.otherwise('/entry');
});
