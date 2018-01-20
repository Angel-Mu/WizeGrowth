var wizeGrowth = angular.module('wizeGrowth', []);

function mainController($scope, $http) {
  $http.get('/')
    .success(function(data) {
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
}
