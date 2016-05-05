angular.module('riot.controller')
.controller('RegionController', function($scope, SharedProperties) {

	$scope.activeRegionId = 'na';
	var header = $('#regionDropdown');
	header.load(defineRegion());

	$scope.regions = SharedProperties.getRegions();
	function getGeolocationSuccess(response) {
		return SharedProperties.getContinent(response.coords.latitude, response.coords.longitude);
	}

	function getContinent() {
		return new Promise(function(resolve){
			SharedProperties.getGeolocation(function(response){
				getGeolocationSuccess(response).then(function(response2){
					resolve(response2.data);
				});
			});
		}) 
	}

	function defineRegion() {
		var activeRId = SharedProperties.getActiveRegionId();
		if(activeRId == undefined || activeRId == null) {
			getContinent().then(function(response){
				var platform = angular.lowercase(response);
				if(platform != null) {
					$scope.activeRegionId = platform;
					SharedProperties.setActiveRegionId($scope.activeRegionId);
					$scope.$apply();
				} else {
					$scope.activeRegionId = 'na';
					SharedProperties.setActiveRegionId($scope.activeRegionId);
					$scope.$apply();
				}
			}, function() {
				SharedProperties.setActiveRegionId($scope.activeRegionId);
			});
		} else {
			$scope.activeRegionId = activeRId;
			SharedProperties.setActiveRegionId($scope.activeRegionId);
		}
		
	}

	$scope.regionSelected = function(_regionId) {
		$scope.activeRegionId = _regionId;
		SharedProperties.setActiveRegionId(_regionId);
	}

});