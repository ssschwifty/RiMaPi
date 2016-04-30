angular.module('riot.controller')
.controller('MainController', ['$scope', '$state', 'stringConstants', function($scope, $state, stringConstants) {

	function initiate() {
		$state.go('home');
	}
	initiate();
	$scope.openView= function(view) {
		$state.go(view);
	}
}]);