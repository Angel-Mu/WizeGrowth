const wizeGrowth = angular.module('wizeGrowth', []);

function mainController($scope, $http) {
  $http.get('/api/topten')
    .success(function(data) {
      $scope.topten = data;
      console.log(data);
    })
    .error((data) => {
      console.log(`Error: ${data}`);
    });
}
