(function() {

	var app = angular.module('bpwebsiteApp', ['ngRoute', 'leaflet-directive']);
	
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
				controller: 'ContactController',
				title: 'Contact - Buffalo Projects'
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

	app.controller('appController', function( $scope, $route, $routeParams ){
		
		render = function(){

            switch($route.current.title) {
            	case 'Buffalo Projects':
            		
            		break
            }

        };

        // Listen for changes to the Route. When the route
        // changes, let's set the renderAction model value so
        // that it can render in the Strong element.
        $scope.$on(
            "$routeChangeSuccess",
            function( $currentRoute, $previousRoute ){

                // Update the rendering.
                render();

            }
        );
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
	    
		$scope.load = function() {
		       // do your $() stuff here

			$('#homepageSplashText').css({
    	        position:'absolute',
    	        left: ($(window).width() - $('#homepageSplashText').outerWidth())/2,
    	        top: ($('#homepageSplashText').parent().height() - $('#homepageSplashText').outerHeight())/2
    	    });

		};
		   
		
		$scope.load();
		this.homepageSplash = homepageSplash;
	    this.homeSlides = homepageSlides;
	    
	    $scope.playHomePageVideo = function(videoId) {
	    	$("video").each(function(){
	    		if(!$(this).prop('muted')) {
	    			$(this).get(0).pause();
	    			var playingIdText = $(this).attr('id');
	    			var playingId = playingIdText.substring(5, playingIdText.length);
	    			$("#videoOverlay" + playingId).fadeIn();
	    	    	$("#videoOverlayText" + playingId).fadeIn();
	    	    	$("#video" + playingId).prop('muted', true);
	    	    	$("#video" + playingId).get(0).pause();
	    	    	$("#video" + playingId).get(0).currentTime = 0;
	    	    	$("#video" + playingId).get(0).play();
	    		}
	    	});
	    	$("#videoOverlay" + videoId).fadeOut();
	    	$("#videoOverlayText" + videoId).fadeOut();
	    	$("#video" + videoId).prop('muted', false);
	    	$("#video" + videoId).get(0).pause();
	    	$("#video" + videoId).get(0).currentTime = 0;
	    	$("#video" + videoId).get(0).play();
	    	
	    	//if( ! $("video").prop('muted') ) 
	    	//$('#videoId').get(0).prop('muted', false)
		}
	     
	});
	
	
	
	app.controller('QuotesController', function($scope) {
		this.quotes = [];
		this.quotes = quotes;
		var firstItem = this.quotes[0];
		
		var position = 1;
		
		$scope.load = function() {
			setTimeout(animateSlide, 3000);
		}
		
		function animateSlide() {
			var newPosition = -(position * 301);
			
			$('#quoteContainer').animate({top:newPosition + 'px'}, 1000, function() {
				position++;
				if(position == quotes.length) {
					position = 1;
					$('#quoteContainer').css({top:'0px'});
				}
				setTimeout(animateSlide, 3000);
			});
			
			
		}
		
		$scope.load();
	})
	
	app.controller('AboutUsController', function($scope) {
	     
	    //$scope.message = 'This is Add new order screen';
	     
	});
	
	app.controller('CareersController', function($scope) {
	     
	    this.jobs = jobs;
	     
	});
	
	app.controller('ContactController', [ '$scope', function($scope) {
		
		$scope.load = function() {
			$('#buffalomap').css('height', window.innerHeight);
		}
		
		$scope.load();
		
		var tilesDict = {
			mapbox_streets: {
                name: 'Mapbox Streets',
                url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                type: 'xyz',
                options: {
                    apikey: 'pk.eyJ1IjoiY2hsb2Vwcm9qZWN0IiwiYSI6Ims2aDRPNVUifQ.JWpm-PqK8m676TNUAbQaWQ',
                    mapid: 'chloeproject.map-gnfkv8ht'
                }
            }
        };

     
        angular.extend($scope, {
            london: {
                lat: 39.001676741504525,
                lng: -94.59741353988647,
                zoom: 16
            },
            defaults: {
                zoomControl: false,
                scrollWheelZoom: false
            },
            tiles: tilesDict.mapbox_streets
        });

        $scope.markers = new Array();
        
        $scope.markers.push({
            lat: 39.001676741504525,
            lng: -94.59741353988647
        });
   }]);
	
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
	videoPath		:	'http://www.beamtv.com/archive/file/RsMtCdstcS/hd?width=1280&height=720',
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

var jobs = [];

var quotes = [
	{
		quote	:	'Finally my conversations simplified',
		author	:	'Adrienne Fisher',
	},
	{
		quote	:	'I just replaced 15 apps with one.',
		author	:	'Paul Gordon',
	},
	{
		quote	:	'Wow, just wow!',
		author	:	'Justin Watkins',
	},
	{
		quote	:	'Finally my conversations simplified',
		author	:	'Adrienne Fisher',
	}
	]
