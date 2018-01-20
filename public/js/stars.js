var wizeGrowth = angular.module('wizeGrowth', []);

function mainController($scope, $http) {
  $http.get('/api/star')
    .success(function (data) {
      $scope.stars = data;
    });

	$scope.saveStar = function() {
		$scope.formData.jobs = [18265, 18263, 18292, 18316];
		$http.post('/api/star', $scope.formData)
		.success(function(data) {
			$scope.formData = {};
			$scope.stars.push(data);

			$('#myModal').modal('toggle');

			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
}
