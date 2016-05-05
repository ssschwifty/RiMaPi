angular.module('riot.directives')
.directive('summoner', function() {
	return {
		restrict: 'E',
		templateUrl: './scripts/directives/summonerView.html',
		replace: true,
		controller: 'SummonerController',
		scope: {}
	}
});