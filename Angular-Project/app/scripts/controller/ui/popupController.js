angular.module('riot.controller.ui')
.controller('PopupController', function ($scope, $uibModalInstance, message) {
	$scope.message = message;
	$scope.close = function() {
		$uibModalInstance.close();
	}
});