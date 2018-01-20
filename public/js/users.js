var wizeGrowth = angular.module('wizeGrowth', []);

function mainController($scope, $http) {
  $http.get('/api/user/26')
    .success(function (data) {
    	console.log(data);
      $scope.user = data;
      $scope.user.bronzestars = 0;
      $scope.user.silverstars = 0;
      $scope.user.goldstars = 0;
      $scope.user._doc.stars.forEach(function (star) {
      	switch (star.rate) {
					case 'BRONZE':
						$scope.user.bronzestars++;
						break;
					case 'SILVER':
            $scope.user.silverstars++;
						break;
					case 'GOLD':
            $scope.user.goldstars++;
						break;
				}
			})
    });
}
