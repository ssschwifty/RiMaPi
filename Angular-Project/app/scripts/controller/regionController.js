angular.module('riot.controller')
.controller('RegionController', function($scope, SharedProperties, UserData) {

	$scope.userData = UserData;

	// check for region on load
	$('#regionDropdown').load(defineRegion());

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
		console.log($scope.userData);
		if($scope.userData.region == undefined || $scope.userData.region == null) {
			getContinent().then(function(response){
				var platform = angular.lowercase(response);
				if(platform != null) {
					$scope.userData.region = platform;
					console.log($scope.userData);
					$('html').trigger('region:load');
				} else {
					$scope.userData.region = 'na';
					console.log($scope.userData);
					$('html').trigger('region:load');
				}
			}, function() {
				$scope.userData.region = 'na';
				console.log($scope.userData);
				$('html').trigger('region:load');
			});
		}
	}

});