angular.module('riot.controller')
.controller('SummonerController', function($scope, UserData) {
	$scope.userData = UserData;
});