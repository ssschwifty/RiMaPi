/*
* provides a controller for the region dropdwon directive
*/
angular.module('riot.controller')
.controller('RegionController', function($scope, SharedProperties, UserData) {

	$scope.userData = UserData;
	$scope.regions = SharedProperties.getRegions();
	$scope.activeIcon = SharedProperties;

	// check for region on load
	$('#regionDropdown').load(defineRegion());

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
	// if the position of the user can be evaluated via geolocation, the active region is set to their position
	// default is North America
	function defineRegion() {
		if($scope.userData.regionId == undefined || $scope.userData.regionId == null) {
			$scope.userData.regionId = 'na';
			getContinent().then(function(response){
				var platform = angular.lowercase(response);
				if(platform == null) {
					$scope.userData.regionId = 'na';
					$scope.activeIcon.regionIconState = "earth";
					$scope.$apply();
					$('html').trigger('region:change');
				} else {
					$scope.userData.regionId = platform;
					$scope.activeIcon.regionIconState = "earth";
					$scope.$apply();
					$('html').trigger('region:change');
				}
			}, function() {
				$scope.userData.regionId = 'na';
				$scope.activeIcon.regionIconState = "earth";
				$scope.$apply();
				$('html').trigger('region:change');
			});
		}
	}

	$scope.regionSelected = function(id) {
		$scope.userData.regionId = id;
	}
});