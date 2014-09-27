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
	
	app.filter('unsafe', function($sce) {
	    return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	});
	
	app.filter('trusted', ['$sce', function ($sce) {
	    return function(url) {
	        return $sce.trustAsResourceUrl(url);
	    };
	}]);
	
	app.controller('HomeController', function($scope) {
	     
		this.homepageSplash = homepageSplash;
	    this.homeSlides = homepageSlides;
	     
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

})();

var tempBodyCopy = 'Letterpress mlkshk wayfarers, kogi retro ugh before they sold out viral flannel mustache. Swag aliqua cupidatat distillery. Pork belly Odd Future gluten-free tousled, lo-fi Shoreditch plaid. Salvia PBR synth dolore. Exercitation shabby chic McSweeney&apos;s cred 90&apos;s laboris. Cornhole accusamus street art slow-carb YOLO semiotics iPhone, salvia voluptate.'

var homepageSplash = {
	id				:	'0',
	videoPath		:	'http://s3-us-west-2.amazonaws.com/jaci.judelson/Ikea_hello_eng.webm',
	title			:	'Love life',
	bodyCopy		:	tempBodyCopy,
	learnMoreAction	:	''
};

var homepageSlides = [
	{
		id				:	'1',
		videoPath		:	'http://s3-us-west-1.amazonaws.com/tool.digital/tori-500-ios-app.webm',
		title			:	'Simple, redefined',
		bodyCopy		:	tempBodyCopy,
		learnMoreAction	:	''
	},
	{
		id				:	'2',
		videoPath		:	'http://s3-us-west-2.amazonaws.com/jason.zada/rct_casestudy.webm',
		title			:	'Creating moments',
		bodyCopy		:	tempBodyCopy,
		learnMoreAction	:	''
	},
	{
		id				:	'3',
		videoPath		:	'http://s3.amazonaws.com/tool.test/tool-reel.webm',
		title			:	'Classic craftmanshsip',
		bodyCopy		:	tempBodyCopy,
		learnMoreAction	:	''
	},
	{
		id				:	'4',
		videoPath		:	'http://s3-us-west-2.amazonaws.com/ben.tricklebank/first-love-casestudy.webm',
		title			:	'Classic craftmanshsip',
		bodyCopy		:	tempBodyCopy,
		learnMoreAction	:	''
	},
	];

