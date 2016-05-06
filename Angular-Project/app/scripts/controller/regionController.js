angular.module('riot.controller')
.controller('RegionController', function($scope, SharedProperties, UserData) {

	$scope.userData = UserData;
	$scope.regions = SharedProperties.getRegions();

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

	function defineRegion() {
		if($scope.userData.regionId == undefined || $scope.userData.regionId == null) {
			getContinent().then(function(response){
				var platform = angular.lowercase(response);
				if(platform != null) {
					$scope.userData.regionId = platform;
					$scope.$apply();
					$('html').trigger('region:load');
				} else {
					$scope.userData.regionId = 'na';
					$scope.$apply();
					$('html').trigger('region:load');
				}
			}, function() {
				$scope.userData.regionId = 'na';
				$scope.$apply();
				$('html').trigger('region:load');
			});
		}
	}

	$scope.regionSelected = function(id) {
		$scope.userData.regionId = id;
	}
});