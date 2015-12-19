//
//    HCA Shopping Cart.
//
//    Authors: Aadu Pirn, Eric Frick
//
//    LatestRevision: 11/18/15
//
//    Filename: app.js
//

//Initialize module shoppingApp using Material and ngRoute to control which partial is showing
angular.module('shoppingApp', ['ngMaterial','ngRoute'])

//Create config constant to hold different constants
.constant('config', {
  iqpayURL: "https://paymentgateway-iqtestapps.rhcloud.com/#/?merchantId=4&orderId=",
  shoppingCartIP: "http://hca.dyndns-office.com:11181/"
})

//configure shopping cart theme copied from IQPay and setup routeProvider
.config(function($mdThemingProvider, $routeProvider){
    $mdThemingProvider.definePalette('IQpayPalette', {
        '50': '0047BA',
        '100': '0047BA',
        '200': '0047BA',
        '300': '0047BA',
        '400': '0047BA',
        '500': '0047BA',
        '600': '0047BA',
        '700': '0047BA',
        '800': '0047BA',
        '900': '0047BA',
        'A100': '00A1DF',
        'A200': '00A1DF',
        'A400': '00A1DF',
        'A700': '00A1DF',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.theme('default')
        .primaryPalette('IQpayPalette')
        .accentPalette('IQpayPalette');

	$routeProvider
	.when('/',{    //Default is cart.html
		templateUrl: 'partials/cart.html',
		controller: 'CartController',
		controllerAs: 'cart'
	})
	.when('/checkout',{    //setup redirect to checkout partial
		templateUrl: 'partials/checkout.html',
		controller: 'CheckoutController',
		controllerAs: 'check'
	})
  .when('/place_order',{  //setup redirect to place order partial
    templateUrl: 'partials/place_order.html',
    controller: 'PlaceController',
    controllerAs: 'place'
  })
	.otherwise({   //all other url's in domain redirect to cart.html
		redirectTo: '/shoppingcart'
	});
})

//create custom filter for sorting product list with pages
.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
