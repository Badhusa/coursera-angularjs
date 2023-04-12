angular.module('ShoppingListCheckOff', [])
.service('ShoppingListCheckOffService', function() {
  var service = this;

  var itemsToBuy = [
    { name: "cookies", quantity: 10 },
    { name: "milk", quantity: 2 },
    { name: "bread", quantity: 1 },
    { name: "apples", quantity: 5 },
    { name: "eggs", quantity: 12 }
  ];
  
  var itemsBought = [];

  service.getItemsToBuy = function() {
    return itemsToBuy;
  };

  service.getItemsBought = function() {
    return itemsBought;
  };

  service.buyItem = function(index) {
    var item = itemsToBuy[index];
    itemsToBuy.splice(index, 1);
    itemsBought.push(item);
  };

  service.addItemToBuy = function(item) {
    itemsToBuy.push(item);
  };
})
.controller('ToBuyController', function($scope, ShoppingListCheckOffService) {
  $scope.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

  $scope.buyItem = function(index) {
    ShoppingListCheckOffService.buyItem(index);
  };

  $scope.addItem = function() {
    var newItem = {
      name: $scope.newItemName,
      quantity: $scope.newItemQuantity
    };
    ShoppingListCheckOffService.addItemToBuy(newItem);
    $scope.newItemName = '';
    $scope.newItemQuantity = '';
  };
})
.controller('AlreadyBoughtController', function($scope, ShoppingListCheckOffService) {
  $scope.itemsBought = ShoppingListCheckOffService.getItemsBought();
});
