/*
* provides the controller to a popup modal
*/
angular.module('riot.controller.ui')
.controller('PopupController', function ($scope, $uibModalInstance, popUpParameters) {
	$scope.message = popUpParameters.message;
	$scope.windowHeader = 'Something went wrong';
	$scope.image = './sources/image/Tiles/Amumu_Splash_Tile_8.jpg';

	if(popUpParameters.windowHeader != undefined){
		$scope.windowHeader = popUpParameters.windowHeader;
	}

	if(popUpParameters.image != undefined){
		$scope.image = popUpParameters.image;
	}

	$scope.close = function() {
		$uibModalInstance.close();
	}
});
