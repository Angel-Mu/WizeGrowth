var wizeGrowth = angular.module('wizeGrowth', []);

function mainController($scope, $http) {
	$scope.user = {
		name: 'Jose Luis Hernandez',
		job: 'Software Engineer',
		goldstars: 1,
		silverstars: 2,
		bronzestars: 3
	};
}
