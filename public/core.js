const wizeGrowth = angular.module('wizeGrowth', []);

function mainController($scope, $http) {
  $http.get('/')
    .success((data) => {
      console.log(data);
    })
    .error((data) => {
      console.log(`Error: ${data}`);
    });
}
