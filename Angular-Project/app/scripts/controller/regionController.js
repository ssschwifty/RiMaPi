angular.module('riot.controller')
.controller('RegionController', function($scope, SharedProperties) {
	$scope.activeRegion = $scope.regions[0];
	$scope.regionSelected = function(region) {
		$scope.activeRegion = region;
	}
});