(function() {

	var app = angular.module('bpwebsiteApp', ['ngRoute']);
	
	app.config(
		  function($routeProvider, $locationProvider) {
		    $routeProvider.
		      when('/home', {
		        templateUrl: '/views/public/templates/home.html',
		        controller: 'HomeController'
		      }).
		      when('/aboutus', {
		        templateUrl: 'templates/aboutus.html',
		        controller: 'AboutUsController'
		      }).
		      when('/careers', {
			    templateUrl: 'templates/aboutus.html',
			    controller: 'CareersController'
			  }).
			  when('/contact', {
				templateUrl: 'templates/aboutus.html',
				controller: 'ContactController'
			  }).
		      otherwise({
		        redirectTo: '/home'
		      });
		    $locationProvider.html5Mode(true);
		    $locationProvider.hashPrefix('!');
		  });
	


	
	app.controller('HomeController', function($scope) {
	     
	    //$scope.message = 'This is Add new order screen';
	     
	});
	
	app.controller('AboutUsController', function($scope) {
	     
	    //$scope.message = 'This is Add new order screen';
	     
	});
	
	app.controller('CareersController', function($scope) {
	     
	    //$scope.message = 'This is Add new order screen';
	     
	});
	
	app.controller('ContactController', function($scope) {
	     
	    //$scope.message = 'This is Add new order screen';
	     
	});

})()

