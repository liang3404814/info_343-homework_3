$(function() {
	renderPizza();
	renderDrink();
	renderDessert();
});

function renderPizza() {
	var idx;
	var template = $('.template');
	var pizza;
	for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
		var instance = template.clone();
		pizza = com.dawgpizza.menu.pizzas[idx];

		var name = pizza.name;
		var otherInfo = " ";
		if (pizza.vegetarian) {
			otherInfo = "Vegetarian. "
		}

		var smallPrice = pizza.prices[0];
		var mediumPrice = pizza.prices[1];
		var largePrice = pizza.prices[2];

		var priceText = "Price: Small: " + smallPrice + 
						". Medium: " + mediumPrice + 
						". Large: " + largePrice + ". ";
		var description = pizza.description + "." + otherInfo + priceText;

	    instance.find('.item-name').find('h3').html(name);
	    instance.find('.item-description').find('p').html(description);
	    instance.removeClass('template');

	    $('.pizza-list').append(instance);
	}
}

function renderDrink() {
	var idx;
	var template = $('.template');
	var drink;
	for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
		var instance = template.clone();
	    drink = com.dawgpizza.menu.drinks[idx];

	    var name = drink.name;
	    var price = drink.price;

	    var description = "Price: " + price + ". ";

	    instance.find('.item-name').find('h3').html(name);
	    instance.find('.item-description').find('p').html(description);
	    instance.removeClass('template');

	    $('.drink-list').append(instance);

	} //for each drink            
}

function renderDessert() {
	var idx;
	var template = $('.template');
	var drink;
	for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
		var instance = template.clone();
	    dessert = com.dawgpizza.menu.desserts[idx];

	    var name = dessert.name;
	    var price = dessert.price;

	    var description = "Price: " + price + ". ";

	    instance.find('.item-name').find('h3').html(name);
	    instance.find('.item-description').find('p').html(description);
	    instance.removeClass('template');

	    $('.dessert-list').append(instance);

	} //for each drink            
}