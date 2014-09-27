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
		        title: 'About Us - Buffalo Projects'
		      }).
		      when('/careers', {
			    templateUrl: '/views/public/templates/careers.html',
			    controller: 'CareersController',
			    title: 'Careers - Buffalo Projects'
			  }).
			  when('/contact', {
				templateUrl: '/views/public/templates/contact.html',
				controller: 'ContactController - Buffalo Projects',
				title: 'Contact'
			  }).
			  when('/apps', {
				templateUrl: '/views/public/templates/apps.html',
				controller: 'AppsController - Buffalo Projects',
				title: 'Apps'
			  }).
			  when('/blog', {
				templateUrl: '/views/public/templates/blog.html',
				controller: 'BlogController - Buffalo Projects',
				title: 'Blog'
			  }).
			  when('/news', {
				templateUrl: '/views/public/templates/news.html',
				controller: 'NewsController - Buffalo Projects',
				title: 'News'
			  }).
			  otherwise({
			        redirectTo: '/home'
		      });
		    
		    $locationProvider.html5Mode(true);
		  });

	app.run(['$location', '$rootScope', function($location, $rootScope) {
	    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	        $rootScope.title = current.$$route.title;
	    });
	}]);
	
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
	
	app.controller('AppsController', function($scope) {
	     
	    //$scope.message = 'This is Add new order screen';
	     
	});
	
	app.controller('BlogController', function($scope) {
	     
	    //$scope.message = 'This is Add new order screen';
	     
	});
	
	app.controller('NewsController', function($scope) {
	     
	    //$scope.message = 'This is Add new order screen';
	     
	});

})()

