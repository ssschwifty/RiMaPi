angular.module('riot.directives')
.directive('regionDirective', function() {
	return {
		restrict: 'E',
		templateUrl: './scripts/directives/regionView.html',
		replace: true,
		controller: 'RegionController',
		scope: {}
	}
});