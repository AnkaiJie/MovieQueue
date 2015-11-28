var app = angular.module('app', []);

app.controller('UserRegController', function($scope, $log, $http) {
	$scope.go = function(){
		$http.get('/auth/facebook').then(function(response) {
			$log.log(response.data);
		});
	}
});