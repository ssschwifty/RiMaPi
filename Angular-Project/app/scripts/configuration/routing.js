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
			.state('page.grade', {
				url:'/grade',
				templateUrl: 'views/gradeView.html',
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
				url:'/compare',
				templateUrl: 'views/compareView.html',
				controller: 'CompareController'
			})

		.state('docu', {
			url: '/docu',
			templateUrl: 'views/docuView.html'
		});

	$urlRouterProvider.otherwise('/entry');
});
