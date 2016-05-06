angular.module('riot.directives')
.directive('summonerDirective', function() {
	return {
		restrict: 'E',
		templateUrl: './scripts/directives/summonerView.html',
		replace: true,
		controller: 'SummonerController',
		scope: {}
	}
});