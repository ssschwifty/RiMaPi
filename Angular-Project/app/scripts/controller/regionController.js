angular.module('riot.controller')
.controller('RegionController', function($scope, SharedProperties) {
	
	$scope.$on('$stateChangeSuccess', function() {
		// needs to be handled differently!
		defineRegion();
	});

	$scope.regions = SharedProperties.getRegions();

	function defineRegion() {		
		var activeRId = SharedProperties.getActiveRegionId();
		if(activeRId != undefined && activeRId != null) {
			//debugging
			//$scope.activeRegionId = 'euw';
			var gpsRegion = SharedProperties.getContinent();
			$scope.activeRegionId = $scope.regions[gpsRegion];
		} else {
			$scope.activeRegionId = 'euw';
		}
		SharedProperties.setActiveRegionId($scope.activeRegionId);
	}

	$scope.regionSelected = function(_regionId) {
		$scope.activeRegionId = _regionId;
		SharedProperties.setActiveRegionId(_regionId);
	}

});