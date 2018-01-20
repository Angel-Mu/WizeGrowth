var wizeGrowth = angular.module('wizeGrowth', []);

function mainController($scope, $http) {
	$scope.saveStar = function() {
		$http.post('/api/star', $scope.formData)
		.success(function(data) {
			$scope.formData = {};
			$scope.stars = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.stars = [
		{
			id:1,
			name:'The hackathon Winner',
			desc:'Win a hackathon',
			prize:'1500 USD',
		},
		{
			id:2,
			name:'The hackathon Participant',
			desc:'Participate in a Hackathon',
			prize:'',
		},
		{
			id:3,
			name:'The buddy',
			desc:'Being a buddy',
			prize:'',
		},
		{
			id:4,
			name:'The internal lecturer',
			desc:'Give a lecture inside wizeline',
			prize:'',
		},
		{
			id:5,
			name:'The outsider',
			desc:'Give a lecture outside wizeline',
			prize:'',
		},
		{
			id:6,
			name:'',
			desc:'',
			prize:'',
		},
		{
			id:7,
			name:'',
			desc:'',
			prize:'',
		},
		{
			id:8,
			name:'',
			desc:'',
			prize:'',
		},
		{
			id:9,
			name:'',
			desc:'',
			prize:'',
		},
		{
			id:10,
			name:'',
			desc:'',
			prize:'',
		}
	];
}
