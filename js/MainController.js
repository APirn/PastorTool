//
//    HCA Shopping Cart.
//
//    Authors: Aadu Pirn, Eric Frick
//
//    LatestRevision: 11/18/15
//
//    Filename: CartController.js
//

angular
	.module('shoppingApp')
	.controller('CartController', CartController);

CartController.$inject = ['$filter', 'CartFactory', 'NotificationFactory', 'CheckoutFactory'];

function CartController ($filter, CartFactory, NotificationFactory, CheckoutFactory) {
	var vm = this;
	vm.sort = 'productId'; //set initial sorting method to price descending
	vm.search = ""; //initial search is blank
	vm.currentPage = 0;    //initial page is set to 1 by setting currentPage to 0
	vm.pageSize = 12;	//initial page size is 12
	vm.items2 = vm.items;
	vm.count=0;    //items in cart set to 0
	vm.isLoading=true;  //page is initially loading

	for(i = 0; i < CheckoutFactory.quantities.length; i++){ //update count to number of items in checkout
		vm.count = vm.count + CheckoutFactory.quantities[i];
	}

	vm.resetPages = function(){    //Set current page to 0. Used if you change search settings
		vm.currentPage=0;
	};

	vm.updateCount = function(){    //update the number of items in checkout incase changes were made in other page
		vm.count=0;
		for(i = 0; i < CheckoutFactory.quantities.length; i++){
			vm.count = vm.count + CheckoutFactory.quantities[i];
		}
	}

	CartFactory
		.getData() //get items in cart factory
		.then(    //after http request is made and response is recieved set the items to the items from the data recieved
			function() {
				vm.items = CartFactory.items;
				vm.isLoading=false; //turn off loading circle

				if(vm.items.length < 1) {//display error if not items were imported
					NotificationFactory.error("Error in importing item list. No items imported.");
				}
			}
		);

	//start additem dialog if additem button is clicked on any product
	vm.addItemDialog = function(inItem) {
		NotificationFactory
			.addItem(inItem)
			.then(
				function() {
					vm.updateCount(); //update the product count after items are added.
				}
			);
	};
};
