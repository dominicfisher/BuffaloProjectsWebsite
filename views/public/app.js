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
			    templateUrl: 'templates/careers.html',
			    controller: 'CareersController'
			  }).
			  when('/contact', {
				templateUrl: 'templates/contact.html',
				controller: 'ContactController'
			  }).
			  when('/apps', {
				templateUrl: 'templates/apps.html',
				controller: 'AppsController'
			  }).
			  when('/blog', {
				templateUrl: 'templates/blog.html',
				controller: 'BlogController'
			  }).
			  when('/news', {
				templateUrl: 'templates/news.html',
				controller: 'NewsController'
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

