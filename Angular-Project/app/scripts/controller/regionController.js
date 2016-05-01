angular.module('riot.controller')
.controller('RegionController', function($scope, SharedProperties) {
	$scope.regions = [
						{id:"BR1", name:"Brazil"},
						{id:"EUN1", name:"EU Nordic & East"},
						{id:"EUW1", name:"EU West"},
						{id:"LA1", name:"Latin America North"},
						{id:"LA2", name:"Latin America South"},
						{id:"NA1", name:"North America"},
						{id:"OC1", name:"Oceania"},
						{id:"RU", name:"Russia"},
						{id:"TR1", name:"Turkey"},
						{id:"JP1", name:"Japan"},
						{id:"KR", name:"Republic of Korea"}
					];
	$scope.activeRegion = $scope.regions[0];
	$scope.regionSelected = function(region) {
		$scope.activeRegion = region;
	}
});