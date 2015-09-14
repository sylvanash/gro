var app = angular.module('myapp', []);

app.controller('IndexController', [
	'$scope',
	function ($scope) {
		'use strict';

		var regions = [
			{id: 0, name: 'Egypt'},
			{id: 1, name: 'Ethiopia'},
			{id: 2, name: 'Kenya'}
		];
		var crops = [
			{id: 0, name: 'Corn'},
			{id: 1, name: 'Oat'},
			{id: 2, name: 'Wheat'}
		];

		$scope.data = {
			regions: regions,
			crops: crops
		};
		$scope.models = {
			regions: [],
			crops: [],
			permutations: [],
			regionsCombine: false,
			cropsCombine: false
		};

		function combineSeries(data) {
			var i, combinedRegions = '';
			for (i = 0; i < data.length; i++) {
				combinedRegions += data[i].name;

				if (i < data.length - 1) {
					combinedRegions += ' + ';
				}
			}

			return combinedRegions;
		}

		$scope.generatePermutations = function () {
			if (_.isEmpty($scope.models.crops) || _.isEmpty($scope.models.regions)) {
				return;
			}
			$scope.models.permutations = [];

			var i, j, temp, _regions = '', _crops = '';

			if (!$scope.models.cropsCombine && !$scope.models.regionsCombine) {
				for (i = 0; i < $scope.models.regions.length; i++) {
					for (j = 0; j < $scope.models.crops.length; j++) {
						temp = '<' + $scope.models.regions[i].name + ', ' + $scope.models.crops[j].name + '>';
						$scope.models.permutations.push(temp);
					}
				}

			} else if ($scope.models.cropsCombine && $scope.models.regionsCombine) {
				_regions = combineSeries($scope.models.regions);
				_crops 	= combineSeries($scope.models.crops);

				$scope.models.permutations.push('<' + _regions + ', ' + _crops + '>');

			} else if ($scope.models.cropsCombine && !$scope.models.regionsCombine) {
				_crops = combineSeries($scope.models.crops);

				for (i = 0; i < $scope.models.regions.length; i++) {
					temp = '<' + $scope.models.regions[i].name + ', ' + _crops + '>';
					$scope.models.permutations.push(temp);
				}

			} else if (!$scope.models.cropsCombine && $scope.models.regionsCombine) {
				_regions = combineSeries($scope.models.regions);

				for (i = 0; i < $scope.models.crops.length; i++) {
					temp = '<' + _regions + ', ' + $scope.models.crops[i].name + '>';
					$scope.models.permutations.push(temp);
				}
			}
		};
	}
]);
