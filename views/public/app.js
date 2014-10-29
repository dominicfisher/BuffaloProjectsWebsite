(function() {



	var app = angular.module('bpwebsiteApp', ['ngRoute', 'leaflet-directive', 'ngCookies', 'angularFileUpload']);

	app.directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keydown keypress", function (event) {
				if(event.which === 13) {
					scope.$apply(function (){
						scope.$eval(attrs.ngEnter);
					});

					event.preventDefault();
				}
			});
		};
	});
	
	$('#file').change(function() {
        $(this).fileExif(function(exifObject) {
        	alert(exifObject.Model);
        });
    });

	/*app.directive('file', function() {
		  return {
		    restrict: 'AE',
		    scope: {
		      file: '@',
		    },
		    link: function(scope, el, attrs){
		      el.bind('change', function(event){
		        var files = event.target.files;
		        var file = files[0];
		        scope.file = file;
		        scope.$parent.file = file;
		        scope.$apply();
		      });
		    },
		    controller: function($scope) {
		    	alert('hello1')
		    	$scope.edit = function() {
		    		$scope.uploadWeatherImage();
		    	}
		    }
		  };
		});*/

	app.filter('unsafe', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
	});



	app.config(
			function($routeProvider, $locationProvider) {
				$routeProvider.
				when('/home', {
					templateUrl: '/views/public/templates/home.html',
					controller: 'HomeController',
					title: 'Buffalo Projects',
					isWeather : 'false'

				}).
				when('/aboutus', {
					templateUrl: '/views/public/templates/aboutus.html',
					controller: 'AboutUsController',
					title: 'About Us - Buffalo Projects',
					isWeather : 'false'
				}).
				when('/careers', {
					templateUrl: '/views/public/templates/careers.html',
					controller: 'CareersController',
					title: 'Careers - Buffalo Projects',
					isWeather : 'false'
				}).
				when('/contact', {
					templateUrl: '/views/public/templates/contact.html',
					controller: 'ContactController',
					title: 'Contact - Buffalo Projects',
					isWeather : 'false'
				}).
				when('/apps', {
					templateUrl: '/views/public/templates/apps.html',
					controller: 'AppsController',
					title: 'Apps - Buffalo Projects',
					isWeather : 'false'
				}).
				when('/blog', {
					templateUrl: '/views/public/templates/blog.html',
					controller: 'BlogController',
					title: 'Blog - Buffalo Projects',
					isWeather : 'false'
				}).
				when('/news', {
					templateUrl: '/views/public/templates/news.html',
					controller: 'NewsController',
					title: 'News - Buffalo Projects',
					isWeather : 'false'
				}).
				when('/weather', {
					templateUrl: '/views/public/templates/weather.html',
					controller: 'WeatherController',
					title: 'Weather - Buffalo Projects',
					isWeather : 'true'
				}).
				otherwise({
					redirectTo: '/home'
				});

				$locationProvider.html5Mode(true);
			});

	app.controller('appController', function( $scope, $route, $routeParams ){

		$scope.isWeather = true;

		render = function(){

			$scope.isWeather = $route.current.isWeather;
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

	app.run(['$location', '$rootScope', function($location, $rootScope, $scope) {
		$rootScope.isWeather = '';
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			$rootScope.title = current.$$route.title;

			$rootScope.isWeather = current.$$route.isWeather;
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

	app.controller('WeatherController', function($scope, $cookies, $upload) {

		$scope.previousUsers = [];
		if($cookies) {
			$scope.previousUsers = $cookies.previousUsers;
		}

		$scope.userpicture = "";
		$scope.username = "";
		$scope.password = "";
		$scope.login_error = "sdfdsfds";

		$scope.creds = {
			bucket: 'buffaloimages',
			access_key: '',
			secret_key: ''
		}

		$scope.sizeLimit      = 10585760; // 10MB in Bytes
		$scope.uploadProgress = 0;

		$scope.getIt = function() {
			alert('upload');
		}

		$scope.uploadWeatherImage = function($files) {
			$('.meter span').animate({width: '0%'}, 500, "easeOutQuart");
			// Configure The S3 Object 
			AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
			AWS.config.region = 'us-east-1';
			var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

			$scope.file = $files[0];
			
			$('#file').fileExif(function(exifObject) {
				alert(exifObject.GPSLatitude);
				alert(exifObject.GPSLongitude);
			})
			
			var uniqueFileName = $scope.uniqueWeatherFileName();
			//var fileName = $scope.file.name;
			//var fileEnding = fileName.lastIndexOf(".")
			uniqueFileName += $scope.file.name.substring($scope.file.name.lastIndexOf("."), $scope.file.name.length);
			
			if($scope.file) {
				var params = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256', ACL :'public-read-write'  };

				bucket.putObject(params, function(err, data) {
					if(err) {
						// There Was An Error With Your S3 Config
						alert(err.message);
						return false;
					}
					else {
						// Success!
						//alert('Upload Done');
						$('.meter span').animate({width: '0%'}, 500, "easeOutQuart");
					}
				})
				.on('httpUploadProgress',function(progress) {
					$('.meter span').animate({width: Math.round(progress.loaded / progress.total * 100) + '%'}, 500, "easeOutQuart");
					//$('.meter span').width(Math.round(progress.loaded / progress.total * 100) + '%');
					// Log Progress Information
					console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
				});
			}
			else {
				// No File Selected
				alert('No File Selected');
			}

		}
		
		$scope.uniqueWeatherFileName = function() {
		    var text     = "weatherbg_";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i=0; i < 30; i++ ) {
		      text += possible.charAt(Math.floor(Math.random() * possible.length));
		    }
		    return text;
		  }

		$scope.showSignup = function() {
			var parentWidth = $('#slideContainer').width();
			var newWidth = parentWidth/3;
			$('#loginContainer').css('display','none');
			$('#slideContainer').animate({left: -newWidth+'px'}, 1000, "easeOutQuart", function() {

			});

		}

		$scope.showLogin = function() {
			var parentWidth = $('#slideContainer').width();
			var newWidth = parentWidth/3;
			$('#signUpContainer').css('display','none');
			$('#slideContainer').animate({left: -newWidth+'px'}, 1000, "easeOutQuart", function() {

			});
		}

		$scope.addLoginUserToCookies = function(userObject) {

			var found = false;
			$scope.previousUsers.forEach(function(existingUser) {
				if(existingUser.username == userObject.username) {
					found = true;
				}
			})

			if(!found) {
				$scope.previousUsers.push(userObject);
			}

			$cookies.previousUsers = $scope.previousUsers;
		}

		$scope.changeUserPicture = function(path) {
			$scope.userpicture = path;
		}

		$scope.changeUserName = function(name) {
			$scope.name = name;
		}

		$scope.changeUserId = function(userid) {
			$scope.userid = userid;
		}
	})

	app.controller('LoginFormController', function($scope, $http) {

		$scope.weatherLogin = function() {
			if($.trim($scope.username) == "" && $.trim($scope.password) == "") {
				$scope.login_error = "We know it's weird, but we have to have a username and passord to get this going.";
				$('#loginError').fadeIn(500);
				return false;
			} else {
				$('#loginError').fadeOut(500);
				$('#loginLoader').css('display', 'inline-block');
				$("#loginChildren").animate({ opacity: 0.25 }, 1000, "easeOutQuart", function() {

					$http.post('/login', {username:$scope.username, password:$scope.password}).
					success(function(data, status, headers, config) {
						if(data.error == null) {
							$scope.changeUserPicture(data.data.profilePicture);
							$scope.changeUserName(data.data.name);
							$scope.changeUserId(data.data.userid);
							$('#loginLoader').fadeOut();
							$('#loginFormParent').fadeOut();
							$('#defaultUserPicture').fadeOut();
							$('#userPicture').css('display', 'inline-block');
							$('#userpicture').fadeIn();
							$("#loginChildren").animate({ opacity: 1}, {queue:false, duration:1000, easing : "easeOutQuart"});
							$('#userSideBar').fadeIn();
							$('#sidebar').animate({'left': '0px'}, {queue:false, duration:1000, easing : "easeOutQuart"});
							$('#sidebarHeight').animate({'margin-top' : '0%'}, {queue:false, duration:1000, easing : "easeOutQuart"});
							$('#loginChildren').animate({'top': '0%'}, {queue:false, duration:1000, easing : "easeOutQuart"});

							$('#sidebar').animate({backgroundColor: 'rgba(0,0,0,1.0)'}, 1000);

						} else {
							$("#loginChildren").animate({ opacity: 1 }, 1000, "easeOutQuart");
							$scope.login_error = data.error;
							$('#loginError').fadeIn(500);
							$('#loginLoader').fadeOut();
						}
					}).
					error(function(data, status, headers, config) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						$scope.login_error = "We know it's weird, but we have to have a username and passord to get this going.";
						$('#loginError').fadeIn(500);
					});

				});
			}
		}



		$scope.loginChange = function() {
			if($.trim($scope.username) != "" && $.trim($scope.password) != "") {
				$('#loginError').fadeOut(500);
			}
		}

	})

	app.controller('WeatherPhotosController', function($scope) {
		this.weatherPictures = [];
	})

	app.controller('HomeController', function($scope) {

		this.homepageSplash = homepageSplash;
		this.homeSlides = homepageSlides;

		$scope.load = function() {
			$('#homepageSplashText').css({
				position:'absolute',
				left: ($(window).width() - $('#homepageSplashText').outerWidth())/2,
				top: ($('#homepageSplashText').parent().height() - $('#homepageSplashText').outerHeight())/2
			});
			$('#header').animate({backgroundColor:'rgba(0,0,0,0.0)'});
		};


		$scope.load();

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

		$scope.load = function() {
			$('#header').animate({backgroundColor:'rgba(0,0,0,0.0)'});
		}

		$scope.load();

	});

	app.controller('CareersController', function($scope) {

		this.jobs = jobs;

		$scope.load = function() {
			$('#header').animate({backgroundColor:'rgba(0,0,0,0.0)'});
		}

		$scope.load();

	});

	app.controller('ContactController', [ '$scope', function($scope) {

		$scope.load = function() {
			$('#buffalomap').css('height', window.innerHeight);
			//$('#header').animate({backgroundColor:'rgba(0.0, 0.0, 0.0, 1.0)'});
			$('#header').animate({backgroundColor:'rgba(0,0,0,1.0)'});
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

		$scope.load = function() {
			$('#header').animate({backgroundColor:'rgba(0,0,0,0.0)'});
		}

		$scope.load();
	});

	app.controller('BlogController', function($scope) {

		$scope.load = function() {
			$('#header').animate({backgroundColor:'rgba(0,0,0,0.0)'});
		}

		$scope.load();

	});

	app.controller('NewsController', function($scope) {

		$scope.load = function() {
			$('#header').animate({backgroundColor:'rgba(0,0,0,0.0)'});
		}

		$scope.load();

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

