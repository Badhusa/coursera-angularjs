(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope', '$filter'];

  function LunchCheckController($scope, $filter) {
    $scope.lunchItems = "";
    $scope.message = "";
    $scope.suggestions = "";

    $scope.checkLunchItems = function () {
      var lunchItems = $scope.lunchItems.trim();
      var lunchItemArray = lunchItems.split(',');

      // Remove empty elements from the array
      lunchItemArray = $filter('filter')(lunchItemArray, function (item) {
        return item.trim() !== "";
      });

      if (lunchItemArray.length === 0) {
        $scope.message = "Please enter data first";
        $scope.suggestions = "";
      } else {
        $scope.message = (lunchItemArray.length <= 3) ? "Enjoy!" : "Too much!";

        var healthyOptions = getHealthyOptions(lunchItemArray);
        if (healthyOptions.length === 0) {
          $scope.suggestions = "No healthy options found";
        } else {
          $scope.suggestions = "Healthy options: " + healthyOptions.join(", ");
        }
      }
    };

    function getHealthyOptions(lunchItemArray) {
      var healthyOptions = [];
      var unhealthyItems = ["cookie", "cake", "chips", "fries", "soda", "burger", "pizza"];

      for (var i = 0; i < lunchItemArray.length; i++) {
        var item = lunchItemArray[i].trim().toLowerCase();
        if (unhealthyItems.indexOf(item) === -1) {
          healthyOptions.push(lunchItemArray[i].trim());
        }
      }

      return healthyOptions;
    }
  }
})();
