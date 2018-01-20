var wizeGrowth = angular.module('wizeGrowth', []);

function mainController($scope, $http) {
  $http.get('/api/star')
    .success(function (data) {
      console.log(data);
      $scope.stars = data;
    })
    .error(function (error) {
      console.log(error);
    });

  $http.get('/api/user')
    .success(function (data) {
      console.log(data);
      $scope.users = data;
    })
    .error(function (error) {
      console.log(error);
    });

  $scope.assign = function() {
    $scope.formData = {
      wizer: {
        email: $scope.wizer.workEmail,
        displayName: $scope.wizer.displayName,
        jobTitle: $scope.wizer.jobTitle
      },
      star: $scope.star
    };
    $http.post('/api/assign', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.wizer = undefined;
        $scope.star = undefined;

        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}