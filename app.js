var app = angular.module('myapp', []);

app.controller('IndexController', [
	'$scope',
	function ($scope) {
		'use strict';

		var regions = [
			{id: 0, name: 'Egypt', selected: false},
			{id: 1, name: 'Ethiopia', selected: false},
			{id: 2, name: 'Kenya', selected: false}
		];
		var crops = [
			{id: 0, name: 'Corn', selected: false},
			{id: 1, name: 'Oat', selected: false},
			{id: 2, name: 'Wheat', selected: false}
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
			cropsCombine: false,
            regionsText: 'Select',
            cropsText: 'Select'
		};
        $scope.regionsSelect = {
            text: 'Select'
        }

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

        var selectDictionary = {
            regions: [],
            crops: []
        };
		$scope.generatePermutations = function () {
			$scope.models.permutations = [];

			//if (_.isEmpty($scope.models.crops) || _.isEmpty($scope.models.regions)) {
			if (_.isEmpty(selectDictionary.crops) || _.isEmpty(selectDictionary.regions)) {
				return;
			}

			var i, j, temp, _regions = '', _crops = '';

			if (!$scope.models.cropsCombine && !$scope.models.regionsCombine) {
				for (i = 0; i < selectDictionary.regions.length; i++) {
					for (j = 0; j < selectDictionary.crops.length; j++) {
						temp = '<' + selectDictionary.regions[i].name + ', ' + selectDictionary.crops[j].name + '>';
						$scope.models.permutations.push(temp);
					}
				}

			} else if ($scope.models.cropsCombine && $scope.models.regionsCombine) {
				_regions = combineSeries(selectDictionary.regions);
				_crops 	= combineSeries(selectDictionary.crops);

				$scope.models.permutations.push('<' + _regions + ', ' + _crops + '>');

			} else if ($scope.models.cropsCombine && !$scope.models.regionsCombine) {
				_crops = combineSeries(selectDictionary.crops);

				for (i = 0; i < selectDictionary.regions.length; i++) {
					temp = '<' + selectDictionary.regions[i].name + ', ' + _crops + '>';
					$scope.models.permutations.push(temp);
				}

			} else if (!$scope.models.cropsCombine && $scope.models.regionsCombine) {
				_regions = combineSeries(selectDictionary.regions);

				for (i = 0; i < selectDictionary.crops.length; i++) {
					temp = '<' + _regions + ', ' + selectDictionary.crops[i].name + '>';
					$scope.models.permutations.push(temp);
				}
			}
		};

        $scope.itemChanged = function (item, dataKey) {
            var i,
                temp = '',
                textKey = dataKey + 'Text';

            if (item.selected) {
                //selectDictionary[dataKey][item.id] = item.name;
                selectDictionary[dataKey].push(item);
            } else {
                var index = _.findIndex(selectDictionary[dataKey], function (arrayItem) { return arrayItem.id === item.id; });
                selectDictionary[dataKey].splice(index, 1);
            }

            /*for (i = 0; i < $scope.data[dataKey].length; i++) {
                if ($scope.data[dataKey][i].selected) {
                    temp += $scope.data[dataKey][i].name;

                    if (i < $scope.data[dataKey].length - 1) {
                        temp += ', ';
                    }
                }
            }*/
            // TODO: Check not empty
            /*selectDictionary[dataKey].forEach(function (selectItem, key) {
                console.log(key);
                temp += selectItem.name + ', ';
            });*/
            // Dictionary
            /*_.each(selectDictionary[dataKey], function (selectItem) {
                temp += selectItem + ', ';
            });*/
            for (i = 0; i < selectDictionary[dataKey].length; i++) {
                temp += selectDictionary[dataKey][i].name + ', ';
            }

            if (temp[temp.length - 2] === ',') {
                temp = temp.substring(temp.length - 2, -2);
            }

            if (!temp) {
                temp = 'Select';
            }

            $scope.models[textKey] = temp;
        }
	}
]);
