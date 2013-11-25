// -----------------AngularJS Yeah

var shoppingCart = /**
* dawgPizzaShoppingCart Module
*
* A shopping cart app for Dawg Pizza
*/
angular.module('dawgPizzaShoppingApp', []);

shoppingCart.factory('Menu', function() {
	return com.dawgpizza.menu;
});

shoppingCart.factory('Categories', function() {
	return com.dawgpizza.menuCategories;
})

shoppingCart.service('BizHours', function() {
	this.isOperating = function() {
		var day = new Date();
		var weekday = day.getDay();
		var hour = day.getHours();
		var minute = day.getMinutes();

		if (hour >= 10 && hour < 23) {
			if (day != 0) {
				return true;
			}
		}

		return false;
	}

	this.isDelivering = function() {
		var day = new Date();
		var weekday = day.getDay();
		var hour = day.getHours();
		var minute = day.getMinutes();

		if (hour >= 12 && hour < 23) {
			if (day != 0) {
				return true;
			}
		}

		return false;
	}


})

shoppingCart.service('Cart', function() {

	var items = [];

	// adds an item to cart
	this.addItem = function(type, name, size, price) {

		var idx = 0;
		var item;
		var quantity;
		var found = false;

			// increments quantity by 1 
			// if existing item found in cart
			for (idx; idx < items.length; ++idx) {
				item = items[idx];
				if (item.type === type && item.name === name && item.size === size) {
					quantity = (item.quantity || 0);
					item.quantity = quantity + 1;

					found = true;
					break;
				}
			}

			// otherwise adds a new item to cart
			if (!found) {
				items.push({
					"type": type,
					"name": name,
					"quantity": 1,
					"price": price,
					"size": size
				});
			}

			console.log(items);
	} // end of addItem

		// completely remove all entries of the an item from the 
		// cart
	this.removeItem = function(type, name, size) {
		var idx;
		var item;

		for (idx = 0; idx < items.length; ++idx) {
			item = items[idx];
			if (item.type === type && item.name === name && item.size === size) {
				items.splice(idx, 1);
			}
		}
	} // end of removeItem

	this.removeAll = function() {
		items = [];
	};

	this.subTotal = function() {
		var result = 0;

		angular.forEach(items, function(item, key) {
			result += (item.price * item.quantity);
		});

		return result;
	}

	this.getItems = function() {
		return items;
	}

	this.isEmpty = function() {
		return (items.length == 0);
	}
})

function bizHourControl ($scope, BizHours) {
	$scope.bizHours = BizHours;
}

function listingControl ($scope, Menu, Categories, Cart) {

	$scope.cart = Cart;
	$scope.menu = Menu;
	$scope.categories = Categories;
}

function orderControl ($scope, Cart, BizHours) {
	$scope.enabled = false;

	$scope.bizHours = BizHours;

	$scope.cart = Cart;
	$scope.orderInfo = {};
	$scope.orderInfo.items = Cart.getItems();
	$scope.stringifiedOrder = JSON.stringify($scope.orderInfo);

	$scope.taxRate = 9.5 / 100;

	$scope.updateStringifiedOrder = function() {
		$scope.orderInfo.subtotal = $scope.subTotal();
		$scope.orderInfo.tax = $scope.tax();
		$scope.orderInfo.grandtotal = $scope.grandTotal();
		$scope.stringifiedOrder =  JSON.stringify($scope.orderInfo);
		alert(stringifiedOrder);
	}

	$scope.resetItems = function() {
		Cart.removeAll();
	}

	$scope.subTotal = function() {
		return Cart.subTotal();
	};

	$scope.tax = function() {
		return $scope.subTotal() * ($scope.taxRate);
	}

	$scope.grandTotal = function() {
		return $scope.subTotal() + $scope.tax();
	}

	$scope.orderInvalid = function() {
		return ($scope.subTotal() < 20);
	};

	$scope.enableCart = function() {
		$scope.enabled = true;
	}


}

















// -----------------jQuery Stuff

// $(function() {
// 	renderPizza();
// 	renderDrink();
// 	renderDessert();
// });

// function renderPizza() {
// 	var idx;
// 	var template = $('.template');
// 	var pizza;
// 	for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
// 		var instance = template.clone();
// 		pizza = com.dawgpizza.menu.pizzas[idx];

// 		var name = pizza.name;
// 		var otherInfo = " ";
// 		if (pizza.vegetarian) {
// 			otherInfo = "Vegetarian. "
// 		}

// 		var smallPrice = pizza.prices[0];
// 		var mediumPrice = pizza.prices[1];
// 		var largePrice = pizza.prices[2];

// 		var priceText = "Price: Small: " + smallPrice + 
// 						". Medium: " + mediumPrice + 
// 						". Large: " + largePrice + ". ";
// 		var description = pizza.description + "." + otherInfo + priceText;

// 	    instance.find('.item-name').find('h3').html(name);
// 	    instance.find('.item-description').find('p').html(description);
// 	    instance.removeClass('template');

// 	    $('.pizza-list').append(instance);
// 	}
// }

// function renderDrink() {
// 	var idx;
// 	var template = $('.template');
// 	var drink;
// 	for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
// 		var instance = template.clone();
// 	    drink = com.dawgpizza.menu.drinks[idx];

// 	    var name = drink.name;
// 	    var price = drink.price;

// 	    var description = "Price: " + price + ". ";

// 	    instance.find('.item-name').find('h3').html(name);
// 	    instance.find('.item-description').find('p').html(description);
// 	    instance.removeClass('template');

// 	    $('.drink-list').append(instance);

// 	} //for each drink            
// }

// function renderDessert() {
// 	var idx;
// 	var template = $('.template');
// 	var drink;
// 	for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
// 		var instance = template.clone();
// 	    dessert = com.dawgpizza.menu.desserts[idx];

// 	    var name = dessert.name;
// 	    var price = dessert.price;

// 	    var description = "Price: " + price + ". ";

// 	    instance.find('.item-name').find('h3').html(name);
// 	    instance.find('.item-description').find('p').html(description);
// 	    instance.removeClass('template');

// 	    $('.dessert-list').append(instance);

// 	} //for each drink            
// }