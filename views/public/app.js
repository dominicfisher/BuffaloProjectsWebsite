(function() {

	var app = angular.module('bpwebsiteApp', ['ngRoute']);
	
	app.config(
		  function($routeProvider, $locationProvider) {
		    $routeProvider.
		      when('/home', {
		        templateUrl: '/views/public/templates/home.html',
		        controller: 'HomeController',
		        title: 'Buffalo Projects'
		      }).
		      when('/aboutus', {
		        templateUrl: '/views/public/templates/aboutus.html',
		        controller: 'AboutUsController',
		        title: 'Buffalo Projects - About Us'
		      }).
		      when('/careers', {
			    templateUrl: '/views/public/templates/careers.html',
			    controller: 'CareersController',
			    title: 'Buffalo Projects - Careers'
			  }).
			  when('/contact', {
				templateUrl: '/views/public/templates/contact.html',
				controller: 'ContactController',
				title: 'Buffalo Projects - Contact'
			  }).
			  when('/apps', {
				templateUrl: '/views/public/templates/apps.html',
				controller: 'AppsController',
				title: 'Buffalo Projects - Apps'
			  }).
			  when('/blog', {
				templateUrl: '/views/public/templates/blog.html',
				controller: 'BlogController',
				title: 'Buffalo Projects - Blog'
			  }).
			  when('/news', {
				templateUrl: '/views/public/templates/news.html',
				controller: 'NewsController',
				title: 'Buffalo Projects - News'
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

