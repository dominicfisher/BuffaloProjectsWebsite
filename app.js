(function () {



    var app = angular.module('bpwebsiteApp', ['ngRoute', 'leaflet-directive', 'ngCookies', 'angularFileUpload', 'auth0', 'angular-storage', 'angular-jwt']);

    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

    app.directive('fadeIn', function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element, attrs) {
                $element.addClass("ng-hide-remove");
                $element.on('load', function () {
                    $element.addClass("ng-hide-add");
                });
            }
        };
    });

    app.directive('myRepeatDirective', function () {
        return function (scope, element, attrs) {
            if (scope.$last) {
                scope.imagesLoaded = 0;

                var startWidth = 0;
                var startHeight = 0;

                $(".slide").each(function () {
                    $(this).load(function () {
                        if ($(this).width() < $('#weatherBackgroundSlideshowContainer').width()) {

                            startWidth = $(this).width();
                            startHeight = $(this).height();
                            $(this).width($('#weatherBackgroundSlideshowContainer').width());
                            $(this).height(($('#weatherBackgroundSlideshowContainer').width() / startWidth) * startHeight);
                        }

                        if ($(this).height() < $('#weatherBackgroundSlideshowContainer').height()) {

                            startWidth = $(this).width();
                            startHeight = $(this).height();

                            $(this).height($('#weatherBackgroundSlideshowContainer').height());
                            $(this).width(($('#weatherBackgroundSlideshowContainer').height() / startHeight) * startWidth);
                        }
                        scope.imagesLoaded++;
                        if (scope.imagesLoaded === scope.homeWeatherImages.length - 1) {
                            scope.startSlideshow();
                        }

                    });

                });
            }
        };
    });

    app.filter('unsafe', function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    });

    app.filter('trusted', ['$sce',
        function ($sce) {
            return function (url) {
                return $sce.trustAsResourceUrl(url);
            };
 }]);

    app.run(['$location', '$rootScope',
        function ($location, $rootScope, $scope) {
            $rootScope.isWeather = '';
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

                if (current.$$route) {
                    $rootScope.title = current.$$route.title;
                } else {
                    $rootScope.title = 'Buffalo Projects;';
                }

                $rootScope.isWeather = current.$$route.isWeather;
                if ($rootScope.isWeather == 'false') {
                    $('#header').show();
                } else {
                    $('#header').hide();
                }
            });
 }]);

    app.config(function ($routeProvider, $locationProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController',
            title: 'Buffalo Projects',
            isWeather: 'false'

        }).
        when('/aboutus', {
            templateUrl: 'templates/aboutus.html',
            controller: 'AboutUsController',
            title: 'About Us - Buffalo Projects',
            isWeather: 'false'
        }).
        when('/careers', {
            templateUrl: 'templates/careers.html',
            controller: 'CareersController',
            title: 'Careers - Buffalo Projects',
            isWeather: 'false'
        }).
        when('/contact', {
            templateUrl: 'templates/contact.html',
            controller: 'ContactController',
            title: 'Contact - Buffalo Projects',
            isWeather: 'false'
        }).
        when('/apps', {
            templateUrl: 'templates/apps.html',
            controller: 'AppsController',
            title: 'Apps - Buffalo Projects',
            isWeather: 'false'
        }).
        when('/blog', {
            templateUrl: 'templates/blog.html',
            controller: 'BlogController',
            title: 'Blog - Buffalo Projects',
            isWeather: 'false'
        }).
        when('/news', {
            templateUrl: 'templates/news.html',
            controller: 'NewsController',
            title: 'News - Buffalo Projects',
            isWeather: 'false'
        }).
        when('/weather', {
            templateUrl: 'templates/weather.html',
            controller: 'WeatherController',
            title: 'Weather1222 - Buffalo Projects',
            isWeather: 'true'
        }).
        when('/weatherterms', {
            templateUrl: 'templates/weatherterms.html',
            controller: 'WeatherTermsController',
            title: 'Weather - Buffalo Projects',
            isWeather: 'false'
        }).
        otherwise({
            redirectTo: '/home'
        });

        $locationProvider.html5Mode(true);

        authProvider.init({
            domain: 'buffaloprojects.auth0.com',
            clientID: 'iGcC29FY463ceuL7OUNxwv1LUTQieXkn',
            callbackURL: location.href,
            loginUrl: '/weather'
        });

        jwtInterceptorProvider.tokenGetter = function (store) {
            return store.get('token');
        };

        $httpProvider.interceptors.push('jwtInterceptor');
    }).run(function ($rootScope, auth, store, jwtHelper, $location) {
        $rootScope.$on('$locationChangeStart', function () {
            if (!auth.isAuthenticated) {
                var token = store.get('token');
                if (token) {
                    if (!jwtHelper.isTokenExpired(token)) {
                        auth.authenticate(store.get('profile'), token);
                    } else {
                        $location.path('/weather');
                    }
                }
            }

        });
    });

    app.controller('appController', function ($scope, $route, $routeParams) {

        $scope.isWeather = true;

    });

    app.controller("WeatherTermsController", function ($scope) {
        $scope.currentWeatherTermsSection = 'terms';
        $scope.weatherTermsSections = termsSections;
        $scope.weatherTermsSummary = termsSummary;
        $('#header').css({
            backgroundColor: 'rgba(0,0,0,1.0)'
        });

        setTermsSection();

        $scope.weatherheaderClick = function (sectionToShow) {

            $scope.currentWeatherTermsSection = sectionToShow;
            setTermsSection();
        };

        function setTermsSection() {
            $(".terms").each(function () {

                if ($scope.currentWeatherTermsSection == $(this).text().toLowerCase()) {
                    $(this).addClass('selected');
                } else {
                    $(this).removeClass('selected');
                }

            });

            switch ($scope.currentWeatherTermsSection) {
            case 'terms':
                $scope.weatherTermsSections = termsSections;
                $scope.weatherTermsSummary = termsSummary;
                break;
            case 'privacy':
                $scope.weatherTermsSections = privacySections;
                $scope.weatherTermsSummary = privacySummary;
                break;
            default:
                $scope.weatherTermsSections = termsSections;
                $scope.weatherTermsSummary = termsSummary;

            }
        }
    });

    app.controller('WeatherController', function ($scope, $cookies, $upload, leafletData, auth, store, $http) {

        $scope.homeWeatherImages = homeImages;
        $scope.currentPicturePath = 'cherry_blossoms.jpg';
        $scope.currentPictureSeason = '';
        $scope.currentPictureLocationLabel = '';
        $scope.currentPictureLocationLatLon = '';
        $scope.currentPictureWeatherTags = [];
        $scope.weatherTagToAdd = '';
        $scope.suggestedAddresses = [];
        $scope.defaultLat = '39.001676741504525';
        $scope.defaultLon = '-94.59741353988647';
        $scope.email_verified = false;

        $scope.weatherFirstLoad = true;

        if ($scope.weatherFirstLoad) {

            getUserLocation();
            $scope.weatherFirstLoad = false;
        }

        $scope.startSlideshow = function () {
            $('#sidebar').animate({
                'opacity': 1
            }, 2000, "easeOutQuart");
            $('.fadein').animate({
                'opacity': 1
            }, 2000, "easeOutQuart");
            $('.fadein p:gt(0)').hide();
            setInterval(function () {
                $('.fadein > :first-child').fadeOut(2000).next('p').fadeIn(2000).end().appendTo('.fadein');
            }, 7000);
        };



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
                scrollWheelZoom: true
            },
            tiles: tilesDict.mapbox_streets
        });


        $scope.previousUsers = [];
        if ($cookies) {
            $scope.previousUsers = $cookies.previousUsers;
        }

        $scope.weatherPictures = [];

        $scope.userpicture = "";
        $scope.username = "";
        $scope.password = "";
        $scope.login_error = "sdfdsfds";

        $scope.firstWeatherImage = true;

        $scope.sizeLimit = 10585760; // 10MB in Bytes
        $scope.uploadProgress = 0;


        $scope.showImageDetail = function (path) {
            if ($('#weatherImageDetail').css('display') == "none") {
                $('#weatherImageDetail').fadeIn();
                $('#detailMap').height($('#detailMap').width());
                leafletData.getMap().then(function (map) {
                    map.invalidateSize();
                });
                $('.fadein').animate({
                    'opacity': 0
                }, 2000, "easeOutQuart");
                $('#weatherImageDetailScroller').height($('#weatherImageDetail').height() - 51);
            }

            $('#weatherbackgroundContainer').fadeOut(function () {

                $('#weatherbackground').remove();

                $scope.currentPicture = {};
                $scope.currentPicturePath = '';
                $scope.currentPictureLocationLabel = '';
                $scope.currentPictureSeason = '';
                $scope.currentPictureWeatherTags = [];

                var j = 0;
                for (var i = 0; i < $scope.weatherPictures.length; i++) {
                    if ($scope.weatherPictures[i].path == path) {
                        j = i;
                        $scope.currentPicture = $scope.weatherPictures[i];

                        $scope.currentPicturePath = $scope.currentPicture.path;

                        if ($scope.weatherPictures[i].address) {
                            $scope.currentPictureLocationLabel = $scope.weatherPictures[i].address;
                        }

                        if ($scope.weatherPictures[i].season) {
                            $scope.currentPictureSeason = $scope.weatherPictures[i].season;
                        } else {
                            $scope.currentPictureSeason = '';
                        }

                        if ($scope.weatherPictures[i].tags) {
                            $scope.currentPictureWeatherTags = $scope.weatherPictures[i].tags;
                        }
                    }
                }

                $('#weatherbackgroundContainer').append('<img id="weatherbackground"  src="' + $scope.currentPicture.signedPath + '"  />');
                $('#weatherbackground').load(function () {
                    resizeBackgroundImage();
                    $('#weatherbackgroundContainer').fadeIn();
                });



                var a = 0;
                $(".thumbnail").each(function () {
                    if (a == j) {
                        $(this).addClass('selected');
                    } else {
                        $(this).removeClass('selected');
                    }
                    a++;
                });


                $scope.markers = new Array();



                if ($scope.currentPicture.lat) {
                    if ($scope.currentPicture.locationLabel) {
                        $scope.currentPictureLocationLabel = $scope.currentPicture.locationLabel;
                    } else {
                        $scope.currentPictureLocationLabel = $scope.currentPicture.lat + ", " + $scope.currentPicture.lon;
                    }
                    $scope.currentPictureLocationLatLon = $scope.currentPicture.lat + ", " + $scope.currentPicture.lon;

                    angular.extend($scope, {
                        london: {
                            lat: Number($scope.currentPicture.lat),
                            lng: Number($scope.currentPicture.lon),
                            zoom: 16,
                            animate: true
                        }
                    });

                    $scope.markers.push({
                        lat: Number($scope.currentPicture.lat),
                        lng: Number($scope.currentPicture.lon),
                        draggable: true
                    });

                } else {
                    console.log('does not has a lat');

                    angular.extend($scope, {
                        london: {
                            lat: Number($scope.defaultLat),
                            lng: Number($scope.defaultLon),
                            zoom: 16,
                            animate: true
                        }
                    });

                    $scope.markers.push({
                        lat: Number($scope.defaultLat),
                        lng: Number($scope.defaultLon),
                        draggable: true
                    });

                    $scope.currentPictureLocationLabel = $scope.defaultLat + ', ' + $scope.defaultLat;
                    $scope.currentPictureLocationLatLon = $scope.defaultLat + ', ' + $scope.defaultLat;

                };
            });

            $scope.$on('leafletDirectiveMarker.dragend', function (e, args) {
                $scope.currentPictureLocationLabel = $scope.markers[0].lat + ', ' + $scope.markers[0].lng;
                $scope.currentPictureLocationLatLon = $scope.markers[0].lat + ', ' + $scope.markers[0].lng;
            });

        };

        $scope.searchForAddress = function () {
            $http({
                method: 'GET',
                url: 'http://open.mapquestapi.com/geocoding/v1/address',
                params: {
                    key: '',
                    location: $scope.currentPictureLocationLabel
                }
            }).
            success(function (data, status, headers, config) {
                console.log(data);
            }).error(function (data, status, headers, config) {

            });
        };

        $scope.selectAddress = function (latLon) {
            $scope.currentPictureLocationLabel = latLon.lat + ', ' + latLon.lon;

            $scope.currentPicture.lat = latLon.lat;
            $scope.currentPicture.lon = latLon.lon;

            $scope.markers = new Array();

            angular.extend($scope, {
                london: {
                    lat: Number($scope.currentPicture.lat),
                    lng: Number($scope.currentPicture.lon),
                    zoom: 16,
                    animate: true
                }
            });

            $scope.markers.push({
                lat: Number($scope.currentPicture.lat),
                lng: Number($scope.currentPicture.lon),
                draggable: true
            });


        };


        $scope.selectedSeason = function (season) {
            $scope.currentPictureSeason = season;
        };

        $scope.addWeatherTag = function () {
            var found = false;
            for (var i = 0; i < $scope.currentPictureWeatherTags.length; i++) {
                if ($scope.currentPictureWeatherTags[i] == $scope.weatherTagToAdd) {
                    found = true;
                }
            }

            if (!found) {
                $scope.currentPictureWeatherTags.push($('#weatherTagInput').val());
            }

            $('#weatherTagInput').val('');
        };

        $scope.removeWeatherTag = function (weatherTag) {
            for (var i = 0; i < $scope.currentPictureWeatherTags.length; i++) {
                if ($scope.currentPictureWeatherTags[i] == weatherTag) {
                    $scope.currentPictureWeatherTags.splice(i, 1);
                    break;
                };
            };
        };

        $scope.deleteImage = function () {
            var j = 0;
            for (var i = 0; i < $scope.weatherPictures.length; i++) {
                if ($scope.weatherPictures[i].path == $scope.currentPicturePath) {
                    j = 1;
                    $http.post('/deleteImage/', {
                        image: $scope.weatherPictures[i]
                    }).
                    success(function (data, status, headers, config) {
                        if (data.error == null) {
                            $scope.weatherPictures.splice(j, 1);
                            $('#weatherImageDetail').fadeOut();
                            $('.fadein').animate({
                                'opacity': 0
                            }, 2000, "easeOutQuart");
                        } else {
                            console.log('image did not delete');
                        }
                    }).
                    error(function (data, status, headers, config) {
                        console.log('failed to delete image');
                    });

                };
            };
        };

        $scope.saveImage = function () {
            console.log('save clicked');
            var j = 0;
            for (var i = 0; i < $scope.weatherPictures.length; i++) {
                if ($scope.weatherPictures[i].path == $scope.currentPicturePath) {
                    $scope.weatherPictures[i]._id = $scope.weatherPictures[i].path;
                    $scope.weatherPictures[i].translated_user = $scope.translated_user;
                    $scope.weatherPictures[i].lat = $scope.markers[0].lat;
                    $scope.weatherPictures[i].lon - $scope.markers[0].lng;
                    $scope.weatherPictures[i].address = $scope.currentPictureLocationLabel;
                    $scope.weatherPictures[i].season = $scope.currentPictureSeason;
                    $scope.weatherPictures[i].tags = $scope.currentPictureWeatherTags;
                    console.log($scope.weatherPictures[i].lon);
                    j = i;
                    console.log('saving image');
                    $http.post('/saveImage/', {
                        translated_user: $scope.translated_user,
                        image: $scope.weatherPictures[i]
                    }).
                    success(function (data, status, headers, config) {
                        if (data.error == null) {
                            console.log('image saved');
                            console.log(data);
                            $scope.weatherPictures[j] = data.data[0];
                            console.log($scope.weatherPictures[j]);
                        } else {
                            console.log('image did not save');
                        }
                    }).
                    error(function (data, status, headers, config) {
                        console.log('failed to save image');
                    });
                };
            };
        };

        $scope.uploadBrowserImage = function ($files) {
            $scope.dragImage = false;
            $scope.fileBrowser = true;
            $scope.uploadWeatherImage($files);
        };

        $scope.uploadDragImage = function ($files) {
            $scope.dragImage = true;
            $scope.fileBrowser = false;
            $scope.uploadWeatherImage($files);
        };

        $scope.uploadWeatherImage = function ($files) {

            var bucket = new AWS.S3({
                params: {
                    Bucket: 'buffaloimages'
                }
            });
            bucket.config.credentials = new AWS.Credentials(store.get('aws_creds').AccessKeyId, store.get('aws_creds').SecretAccessKey, store.get('aws_creds').SessionToken);

            $('.meter span').animate({
                width: '0%'
            }, 500, "easeOutQuart");
            //config.region = 'us-east-1';

            $scope.file = $files[0];

            $scope.weatherWidth = '0 px';

            var pictureObject = {};
            if ($scope.file) {

                var fileExtension = $scope.file.name.substring($scope.file.name.lastIndexOf("."), $scope.file.name.length);
                fileExtension = fileExtension.toLowerCase();

                if (fileExtension == ".jpg" || fileExtension == ".jpeg" || fileExtension == ".png") {

                    var uniqueFileName = uniqueWeatherFileName();
                    uniqueFileName += fileExtension;
                    pictureObject.path = uniqueFileName;
                    pictureObject.season = '';

                    if ($scope.fileBrowser) {
                        pictureObject = getPictureLatLon(pictureObject);
                    } else {
                        pictureObject.lat = $scope.defaultLat;
                        pictureObject.lon = $scope.defaultLon;
                    }

                    var objKey = 'buffaloimages/' + auth.profile.user_id + '/' + uniqueFileName;
                    var params = {
                        Key: objKey,
                        ContentType: $scope.file.type,
                        Body: $scope.file
                    };

                    bucket.putObject(params, function (err, data) {
                        if (err) {
                            console.log(err.message);
                            return false;
                        } else {
                            $('.meter span').animate({
                                width: '0%'
                            }, 100, "easeOutQuart");

                            bucket.getSignedUrl('getObject', {
                                Expires: 24 * 60,
                                Key: objKey
                            }, function (err, url) {
                                pictureObject.path = uniqueFileName;
                                pictureObject.signedPath = url;


                                $http.post('/saveImage/', {
                                    translated_user: $scope.translated_user,
                                    image: pictureObject
                                }).
                                success(function (data, status, headers, config) {
                                    if (data.error == null) {
                                        $scope.weatherPictures.unshift(data.data[0]);
                                        jQuery('.weatherThumbnails').nailthumb({
                                            width: 100,
                                            height: 100,
                                            fitDirection: 'center',
                                            replaceAnimation: 'fade',
                                            preload: true
                                        });
                                        //$scope.$apply();
                                    } else {
                                        console.log('image did not save');
                                    }
                                }).
                                error(function (data, status, headers, config) {
                                    console.log('failed to save image');
                                });

                            });
                        };
                    })
                        .on('httpUploadProgress', function (progress) {
                            $('.meter span').animate({
                                width: Math.round(progress.loaded / progress.total * 100) + '%'
                            }, 100, "easeOutQuart");
                        });
                };
            } else {
                console.log('No File Selected');
            }
            $scope.$apply();
        };

        $scope.showSignup = function () {
            var parentWidth = $('#slideContainer').width();
            var newWidth = parentWidth / 3;
            $('#loginContainer').css('display', 'none');
            $('#slideContainer').animate({
                left: -newWidth + 'px'
            }, 1000, "easeOutQuart", function () {

            });

        };

        $scope.showLogin = function () {
            var parentWidth = $('#slideContainer').width();
            var newWidth = parentWidth / 3;
            $('#signUpContainer').css('display', 'none');
            $('#slideContainer').animate({
                left: -newWidth + 'px'
            }, 1000, "easeOutQuart", function () {

            });
        };

        $scope.addLoginUserToCookies = function (userObject) {

            var found = false;
            $scope.previousUsers.forEach(function (existingUser) {
                if (existingUser.username == userObject.username) {
                    found = true;
                };
            });

            if (!found) {
                $scope.previousUsers.push(userObject);
            };

            $cookies.previousUsers = $scope.previousUsers;
        };

        $scope.changeUserPicture = function (path) {
            $scope.userpicture = path;
        };

        $scope.changeUserName = function (name) {
            $scope.name = name;
        };

        $scope.changeUserId = function (userid) {
            $scope.userid = userid;
        };

        $scope.resend_weather_verification_email = function () {

            $http.post(' https://buffaloprojects.auth0.com/api/users/' + $scope.userid + '/change_password_ticket', {
                authorization: 'Bearer lHalCKYuhVQcIzuIfOlXHtP8uqoJtLuNT6TidwFa6jLQACsFgkicaYBLDBjVy3jP'
            }).
            success(function (data) {}).
            error(function (data) {});
        };

        $scope.changePassword = function () {
            $('#changePasswordError').fadeIn(function () {
                $('#changePasswordError').css({
                    'display': 'none'
                });
            });
            if (isValidPassword($scope.new_password)) {

                if ($scope.new_password == $scope.new_password_verify) {
                    $https.post('https://buffaloprojects.auth0.com/api/users/' + $scope.userid + , {
                        authorization: 'Bearer XAUqDIJXSBWQUWgXSV17LIMcXx10nwxXS1dBImd8QgPMWbTJSc027DnYFtvLAsmT ',
                        Content - Type: 'application/json',
                        {
                            "newPassword": $scope.new_password;
                        }
                    }).success(function (data) {}).
                    error(function (data) {});
                } else {
                    $scope.change_password_error = "Your new password and password verification don't match.";
                    $('#changePasswordError').fadeIn();
                }

            } else {
                $scope.change_password_error = "Your new password must be at least 8 characters long and have at least 3 of the following <ul><li>lowercase letter (a-z)</li><li>uppercase letter (A-Z)</li><li>numbers (0-9)</li><li>special characters</li></ul>";
                $('#changePasswordError').fadeIn();
            }

        }

        $scope.goToLogin = function () {
            $('#signUpContainer').fadeOut();
            $('#loginContainer').fadeIn();
        }

        $scope.goToSignUp = function () {
            $('#signUpContainer').fadeIn();
            $('#loginContainer').fadeOut();
        }

        $scope.showForgottenPassword = function () {
            $('#loginContainer').fadeOut();
            $('#forgotPasswordContainer').fadeIn();
        }

        $scope.sendForgottenPasswordEmail = function () {
            if ($.trim($scope.forgotten_password_user).length != 0) {
                if (isValidPassword($scope.new_password)) {
                    if ($scope.forgotten_password_password == $scope.forgotten_password_password_verify && ) {
                        $http.put('https://buffaloprojects.auth0.com/api/users/' + $scope.forgotten_password_user + '/password', {
                            authorization: 'Bearer XAUqDIJXSBWQUWgXSV17LIMcXx10nwxXS1dBImd8QgPMWbTJSc027DnYFtvLAsmT',
                            Content - Type: 'application/json',
                            {
                                email: $scope.forgotten_password_user,
                                password: $scope.forgotten_password_password,
                                connection: 'Username-Password-Authentication',
                                verify: true
                            }
                        }).success(function (data) {}).
                        error(function (data) {});
                    } else {
                        $scope.forgotten_password_error = "Your new password and password verification don't match";
                        $('#forgottenPasswordError').fadeIn();
                    }
                } else {
                    $scope.forgotten_password_error = "Your new password must be at least 8 characters long and have at least 3 of the following <ul><li>lowercase letter (a-z)</li><li>uppercase letter (A-Z)</li><li>numbers (0-9)</li><li>special characters</li></ul>";
                    $('#forgottenPasswordError').fadeIn();
                }

            } else {
                $scope.forgotten_password_error = "Uh, we kind of need your email/username to help your reset your password.";
                $('#forgottenPasswordError').fadeIn();
            }
        }

        function getPictureLatLon(pictureObject) {
            $('#file').fileExif(function (exifObject) {

                if (exifObject.GPSLatitude) {

                    if (exifObject.GPSLatitudeRef == "S") {
                        pictureObject.lat = '-';
                        pictureObject.lat += exifObject.GPSLatitude[0] + (exifObject.GPSLatitude[1] / 60);
                    } else {
                        pictureObject.lat = exifObject.GPSLatitude[0] + (exifObject.GPSLatitude[1] / 60);
                    };


                    if (exifObject.GPSLongitudeRef == "W") {
                        pictureObject.lon = '-';
                        pictureObject.lon += exifObject.GPSLongitude[0] + (exifObject.GPSLongitude[1] / 60);
                    } else {
                        pictureObject.lon = exifObject.GPSLongitude[0] + (exifObject.GPSLongitude[1] / 60);
                    };

                    pictureObject.address = pictureObject.lat + ', ' + pictureObject.lon;
                };

            });

            return pictureObject;
        };

        function uniqueWeatherFileName() {
            var text = "weatherbg_";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 30; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        function getUserLocation() {
            if (Modernizr.geolocation) {
                navigator.geolocation.getCurrentPosition(setDefaultLatLon);
            }
        };

        function setDefaultLatLon(position) {
            $scope.defaultLat = position.coords.latitude.toString();
            $scope.defaultLon = position.coords.longitude.toString();
        };
    });

    app.controller('SignupFormController', function ($scope, $http, auth) {

        function onLoginSuccess(profile, token) {
            store.set('profile', profile);
            store.set('token', token);

            $scope.token = token;

            console.log(profile)

            $scope.first_name = profile.given_name;
            $scope.last_name = profile.family_name;

            $scope.changeUserName(profile.given_name + ' ' + profile.family_name);
            $scope.changeUserId(profile.user_id);
            $scope.changeUserPicture(profile.picture);



            store.set('id_token', token);
            store.set('profile', JSON.stringify(profile));

            $http.post('/create_user/', {
                user: $scope.username
            }).
            success(function (data) {
                $scope.translateUserId = data.translated_id;
                $scope.weatherPictures = data.images;

                //TODO get sign url for images

                auth.delegate({
                    api: 'aws',
                    client_id: 'iGcC29FY463ceuL7OUNxwv1LUTQieXkn',
                    target: 'iGcC29FY463ceuL7OUNxwv1LUTQieXkn',
                    scope: 'openid',
                    api_type: 'aws',
                    principal: 'arn:aws:iam::203816133875:saml-provider/auto0-buffaloprojects-provider',
                    role: 'arn:aws:iam::203816133875:role/buffaloprojects-s3user'
                }).then(function (delegationResult) {
                    store.set('aws_creds', delegationResult.Credentials);
                    showSidebar();
                });
            }).
            error(function (data) {
                $("#loginChildren").animate({
                    opacity: 1
                }, 1000, "easeOutQuart");
                $scope.login_error = "Oh shizzle, we have some issues of our own going on.  We're on it plus we called the therapist to take care of insecurities";
                $('#loginError').fadeIn(500);
                $('#loginLoader').fadeOut();
            });
        };


        function showSidebar() {

            $('#loginLoader').fadeOut();
            $('#loginFormParent').fadeOut();
            $('#defaultUserPicture').fadeOut();
            $('#userPicture').css('display', 'inline-block');
            $('#userpicture').fadeIn();
            $("#loginChildren").animate({
                opacity: 1
            }, {
                queue: false,
                duration: 1000,
                easing: "easeOutQuart"
            });
            $('#userSideBar').fadeIn();
            $('#sidebar').animate({
                'left': '0px'
            }, {
                queue: false,
                duration: 1000,
                easing: "easeOutQuart"
            });
            $('#sidebarHeight').animate({
                'margin-top': '0%'
            }, {
                queue: false,
                duration: 1000,
                easing: "easeOutQuart"
            });
            $('#loginChildren').animate({
                'top': '0%'
            }, {
                queue: false,
                duration: 1000,
                easing: "easeOutQuart"
            });
            $('#loginContainer').css('display', 'block');
            $('#loginChildren').fadeIn();

            $('#sidebar').animate({
                backgroundColor: 'rgba(0,0,0,1.0)'
            }, 1000);
        }

        function onLoginFailed(data) {
            $("#loginChildren").animate({
                opacity: 1
            }, 1000, "easeOutQuart");
            $scope.login_error = "So this is awkward but we can't find anyone with those creditials.";
            $('#loginError').fadeIn(500);
            $('#loginLoader').fadeOut();
        }

        $scope.weatherSignup = function () {

            if ($.trim($scope.signup.user) == "" && $.trim($scope.signup.pass) == "") {
                $scope.login_error = "We know it's weird, but we have to have a username and passord to get this going.";
                $('#singupError').fadeIn(500);
                return false;
            } else if ($.trim($scope.signup.firstname) == "" || $.trim($scope.signup.lastname) == "") {
                $scope.login_error = "You forgot to give us your name.  We like to keep things as personal as the interwebs will allow us to be.";
                $('#singupError').fadeIn(500);
                return false;
            } else if(!isValidUsername($scope.signup.user)) {
                $scope.login_error = "Your username must be a valid email address";
                $('#singupError').fadeIn(500);
                return false;
            } else if(!isValidPassword($scope.signup.pass)) {
                $scope.login_error = "Your new password must be at least 8 characters long and have at least 3 of the following <ul><li>lowercase letter (a-z)</li><li>uppercase letter (A-Z)</li><li>numbers (0-9)</li><li>special characters</li></ul>";
                $('#singupError').fadeIn(500);
                return false;    
            } else if ($scope.signup.pass != $scope.signup.passcheck) {
                $scope.login_error = "Your passwords dont' match.  We get it, trying to type it twice with just astricks is awkward.";
                $('#singupError').fadeIn(500);
                return false;
            } else {
                $('#signupError').fadeOut(500);
                $('#signupLoader').css('display', 'inline-block');
                $("#signupChildren").animate({
                    opacity: 0.25
                }, 1000, "easeOutQuart", function () {

                    $http({
                        method: 'POST',
                        url: '/custom-signup',
                        data: {
                            email: $scope.signup.user,
                            password: $scope.signup.pass,
                            given_name: $scope.signup.firstname,
                            family_name: $scope.signup.lastname,
                        }
                    })
                        .success(function (data, status, headers, config) {
                            if (status === 200) {

                                $('#signupLoader').fadeOut();
                                $('#signupFormParent').fadeOut();
                                $("#signupChildren").animate({
                                    opacity: 1
                                }, {
                                    queue: false,
                                    duration: 1000,
                                    easing: "easeOutQuart"
                                });

                                auth.signin({
                                    connection: 'Username-Password-Authentication',
                                    username: $scope.signup.user,
                                    password: $scope.signup.pass,
                                    authParams: {
                                        scope: 'openid profile'
                                    }
                                }, onLoginSuccess, onLoginFailed);
                            }
                        })
                        .error(function (data, status, headers, config) {
                            $("#signupChildren").animate({
                                opacity: 1
                            }, 1000, "easeOutQuart");
                            $scope.signup_error = data.error;
                            $('#signupError').fadeIn(500);
                            $('#signupLoader').fadeOut();
                            $scope.login_error = "Uhhh check this out" + data.code;
                            console.log(data);
                        });
                });
            };
        };
    });

    app.controller('LoginFormController', function ($scope, $http, auth, store) {

        $scope.username = '';
        $scope.password = '';

        function onLoginSuccess(profile, token) {
            store.set('profile', profile);
            store.set('token', token);

            $scope.token = token;

            $scope.first_name = profile.given_name;
            $scope.last_name = profile.family_name;

            $scope.changeUserName(profile.given_name + ' ' + profile.family_name);
            $scope.changeUserId(profile.user_id);
            $scope.changeUserPicture(profile.picture);
            $scope.email_verified = profile.email_verified;

            store.set('id_token', token);
            store.set('profile', JSON.stringify(profile));

            $http.post('/create_user/', {
                user: $scope.username
            }).
            success(function (data) {
                $scope.translateUserId = data.translated_id;
                $scope.weatherPictures = data.images;

                //TODO get sign url for images

                auth.delegate({
                    api: 'aws',
                    client_id: 'iGcC29FY463ceuL7OUNxwv1LUTQieXkn',
                    target: 'iGcC29FY463ceuL7OUNxwv1LUTQieXkn',
                    scope: 'openid',
                    api_type: 'aws',
                    principal: 'arn:aws:iam::203816133875:saml-provider/auto0-buffaloprojects-provider',
                    role: 'arn:aws:iam::203816133875:role/buffaloprojects-s3user'
                }).then(function (delegationResult) {
                    store.set('aws_creds', delegationResult.Credentials);
                    showSidebar();
                });
            }).
            error(function (data) {
                $("#loginChildren").animate({
                    opacity: 1
                }, 1000, "easeOutQuart");
                $scope.login_error = "Oh shizzle, we have some issues of our own going on.  We're on it plus we called the therapist to take care of insecurities";
                $('#loginError').fadeIn(500);
                $('#loginLoader').fadeOut();
            });
        };


        function showSidebar() {

            $('#loginLoader').fadeOut();
            $('#loginFormParent').fadeOut();
            $('#defaultUserPicture').fadeOut();
            $('#userPicture').css('display', 'inline-block');
            $('#userpicture').fadeIn();
            $("#loginChildren").animate({
                opacity: 1
            }, {
                queue: false,
                duration: 1000,
                easing: "easeOutQuart"
            });
            $('#userSideBar').fadeIn();
            $('#sidebar').animate({
                'left': '0px'
            }, {
                queue: false,
                duration: 1000,
                easing: "easeOutQuart"
            });
            $('#sidebarHeight').animate({
                'margin-top': '0%'
            }, {
                queue: false,
                duration: 1000,
                easing: "easeOutQuart"
            });
            $('#loginChildren').animate({
                'top': '0%'
            }, {
                queue: false,
                duration: 1000,
                easing: "easeOutQuart"
            });

            $('#sidebar').animate({
                backgroundColor: 'rgba(0,0,0,1.0)'
            }, 1000);
        }

        function onLoginFailed(data) {
            $("#loginChildren").animate({
                opacity: 1
            }, 1000, "easeOutQuart");
            $scope.login_error = "So this is awkward but we can't find anyone with those creditials.";
            $('#loginError').fadeIn(500);
            $('#loginLoader').fadeOut();
        }

        $scope.weatherLogin = function () {
            if ($.trim($scope.username) == "" && $.trim($scope.password) == "") {
                $scope.login_error = "We know it's weird, but we have to have a username and passord to get this going.";
                $('#loginError').fadeIn(500);
                return false;
            } else {
                $('#loginError').fadeOut(500);
                $('#loginLoader').css('display', 'inline-block');
                $("#loginChildren").animate({
                    opacity: 0.25
                }, 1000, "easeOutQuart", function () {

                    auth.signin({
                        connection: 'Username-Password-Authentication',
                        username: $scope.username,
                        password: $scope.password,
                        authParams: {
                            scope: 'openid profile'
                        }
                    }, onLoginSuccess, onLoginFailed);

                });
            };
        };



        $scope.loginChange = function () {
            if ($.trim($scope.username) != "" && $.trim($scope.password) != "") {
                $('#loginError').fadeOut(500);
            };
        };

    });


    app.controller('HomeController', function ($scope) {

        this.homepageSplash = homepageSplash;
        this.homeSlides = homepageSlides;

        $scope.load = function () {
            $('#homepageSplashText').css({
                position: 'absolute',
                left: ($(window).width() - $('#homepageSplashText').outerWidth()) / 2,
                top: ($('#homepageSplashText').parent().height() - $('#homepageSplashText').outerHeight()) / 2
            });
            $('#header').animate({
                backgroundColor: 'rgba(0,0,0,0.0)'
            });
        };


        $scope.load();

        $scope.playHomePageVideo = function (videoId) {
            $("video").each(function () {
                if (!$(this).prop('muted')) {
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
        };

    });



    app.controller('QuotesController', function ($scope) {
        this.quotes = [];
        this.quotes = quotes;
        var firstItem = this.quotes[0];

        var position = 1;

        $scope.load = function () {
            setTimeout(animateSlide, 3000);
        };

        function animateSlide() {
            var newPosition = -(position * 301);

            $('#quoteContainer').animate({
                top: newPosition + 'px'
            }, 1000, function () {
                position++;
                if (position == quotes.length) {
                    position = 1;
                    $('#quoteContainer').css({
                        top: '0px'
                    });
                }
                setTimeout(animateSlide, 3000);
            });


        };

        $scope.load();
    });

    app.controller('AboutUsController', function ($scope) {

        $scope.load = function () {
            $('#header').animate({
                backgroundColor: 'rgba(0,0,0,0.0)'
            });
        };

        $scope.load();

    });

    app.controller('CareersController', function ($scope) {

        this.jobs = jobs;

        $scope.load = function () {
            $('#header').animate({
                backgroundColor: 'rgba(0,0,0,0.0)'
            });
        };

        $scope.load();

    });

    app.controller('ContactController', ['$scope',
        function ($scope) {

            $scope.load = function () {
                $('#buffalomap').css('height', window.innerHeight);
                //$('#header').animate({backgroundColor:'rgba(0.0, 0.0, 0.0, 1.0)'});
                $('#header').animate({
                    backgroundColor: 'rgba(0,0,0,1.0)'
                });
            };

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

    app.controller('AppsController', function ($scope) {

        $scope.load = function () {
            $('#header').animate({
                backgroundColor: 'rgba(0,0,0,0.0)'
            });
        };

        $scope.load();
    });

    app.controller('BlogController', function ($scope) {

        $scope.load = function () {
            $('#header').animate({
                backgroundColor: 'rgba(0,0,0,0.0)'
            });
        };

        $scope.load();

    });

    app.controller('NewsController', function ($scope) {

        $scope.load = function () {
            $('#header').animate({
                backgroundColor: 'rgba(0,0,0,0.0)'
            });
        };

        $scope.load();

    });

    $(window).resize(function () {
        $('#weatherImageDetailScroller').height($('#weatherImageDetail').height() - 51);
    });

    function resizeBackgroundImage() {
        if ($('#weatherbackground').width() < $('#weatherbackgroundContainer').width()) {

            var startWidth = $('#weatherbackground').width();
            var startHeight = $('#weatherbackground').height();
            $('#weatherbackground').width($('#weatherbackgroundContainer').width());
            $('#weatherbackground').height(($('#weatherbackgroundContainer').width() / startWidth) * startHeight);
        }

        if ($('#weatherbackground').height() < $('#weatherbackgroundContainer').height()) {

            var startWidth = $('#weatherbackground').width();
            var startHeight = $('#weatherbackground').height();

            $('#weatherbackground').height($('#weatherbackgroundContainer').height());
            $('#weatherbackground').width(($('#weatherbackgroundContainer').height() / startHeight) * startWidth);
        }
    }

    function isValidPassword(possiblePassword) {
        if (possiblePassword.length < 8) {
            return false;
        }

        var hasThree = 0;

        if (/\d/.test(possiblePassword)) {
            hasThree++;
        }

        if (/[a-z]/.test(possiblePassword)) {
            hasThree++;
        }

        if (/[A-Z]/.test(possiblePassword)) {
            hasThree++;
        }

        if (/\W+/.test(possiblePassword)) {
            hasThree++;
        }

        if (hasThree < 3) {
            return false;
        }

        return true
    }

    function isValidUsername(possibleUsername) {

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(possibleUsername);
    }


})();

var tempBodyCopy = 'Letterpress mlkshk wayfarers, kogi retro ugh before they sold out viral flannel mustache. Swag aliqua cupidatat distillery. Pork belly Odd Future gluten-free tousled, lo-fi Shoreditch plaid. Salvia PBR synth dolore. Exercitation shabby chic McSweeney&apos;s cred 90&apos;s laboris. Cornhole accusamus street art slow-carb YOLO semiotics iPhone, salvia voluptate.';

var homepageSplash = {
    id: '0',
    videoPath: 'http://www.beamtv.com/archive/file/RsMtCdstcS/hd?width=1280&height=720',
    title: 'Love life',
    bodyCopy: tempBodyCopy,
    learnMoreAction: ''
};

var homepageSlides = [
    {
        id: '1',
        videoPath: 'http://s3-us-west-1.amazonaws.com/tool.digital/tori-500-ios-app.webm',
        title: 'Simple, redefined',
        bodyCopy: tempBodyCopy,
        learnMoreAction: ''
 },
    {
        id: '2',
        videoPath: 'http://s3-us-west-2.amazonaws.com/jason.zada/rct_casestudy.webm',
        title: 'Creating moments',
        bodyCopy: tempBodyCopy,
        learnMoreAction: ''
 },
    {
        id: '3',
        videoPath: 'http://s3.amazonaws.com/tool.test/tool-reel.webm',
        title: 'Classic craftmanshsip',
        bodyCopy: tempBodyCopy,
        learnMoreAction: ''
 },
    {
        id: '4',
        videoPath: 'http://s3-us-west-2.amazonaws.com/ben.tricklebank/first-love-casestudy.webm',
        title: 'Classic craftmanshsip',
        bodyCopy: tempBodyCopy,
        learnMoreAction: ''
 },
 ];

var jobs = [];

var quotes = [
    {
        quote: 'Finally my conversations simplified',
        author: 'Adrienne Fisher',
 },
    {
        quote: 'I just replaced 15 apps with one.',
        author: 'Paul Gordon',
 },
    {
        quote: 'Wow, just wow!',
        author: 'Justin Watkins',
 },
    {
        quote: 'Finally my conversations simplified',
        author: 'Adrienne Fisher',
 }
 ];

var termsSections = [
    {
        legals: [{
                title: 'Acceptance Of Terms',
                legal: 'The web pages available at buffaloprojects.com and all linked pages (&quot;Site&quot;), are owned and operated by Buffalo Projects, Inc. (&quot;Buffalo Projects&quot;) a Canadian corporation and is accessed by you under the Terms of Use described below (&quot;Terms&quot;).Please read these terms carefully before using the services. By accessing the site, viewing any content or using any services available on the site (as each is defined below) you are agreeing to be bound by these terms, which together with our Privacy policy, governs our relationship with you in relation to the site. If you disagree with any part of the terms then you may not access the site.',
  }
  ],

        plain: 'By using Buffalo Projects you agree to all the terms below.'
 },
    {
        legals: [{
                title: 'Description Of Service',
                legal: 'The Site is an online community which enables photographers and graphic artists to post photographs and images, share comments, opinions and ideas, promote their work, participate in contests and promotions, and access and/or purchase services from time to time made available on the Site (“Services”). Services include, but are not limited to, any service and/or content Buffalo Projects makes available to or performs for you, as well as the offering of any materials displayed, transmitted or performed on the Site or through the Services. Content (“Content”) includes, but is not limited to text, user comments, messages, information, data, graphics, news articles, photographs, images, illustrations, and software.<br>Your access to and use of the Site may be interrupted from time to time as a result of equipment malfunction, updating, maintenance or repair of the Site or any other reason within or outside the control of Buffalo Projects. Buffalo Projects reserves the right to suspend or discontinue the availability of the Site and/or any Service and/or remove any Content at any time at its sole discretion and without prior notice. Buffalo Projects may also impose limits on certain features and Services or restrict your access to parts of or all of the Site and the Services without notice or liability. The Site should not be used or relied upon for storage of your photographs and images and you are directed to retain your own copies of all Content posted on the Site.',
  }
  ],

        plain: 'We develop a photo community and provide services to create online portfolios and we will develop more features and services in the future. At times things can go wrong and the service may be interrupted. Unlikely, but sometimes things can go really wrong.'
 },
    {
        legals: [{
                title: 'Registration',
                legal: 'As a condition to using Services, you are required to open an account with Buffalo Projects and select a password and username, and to provide registration information. The registration information you provide must be accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your Buffalo Projects account.<br>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trade mark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.<br>You are responsible for maintaining the confidentiality of your password and are solely responsible for all activities resulting from the use of your password and conducted through your Buffalo Projects account.<br>Services are available only to individuals who are either (i) at least 18 years old, or (ii) at least 14 years old, and who are authorized to access the Site by a parent or legal guardian. If you have authorized a minor to use the Site, you are responsible for the online conduct of such minor, and the consequences of any misuse of the Site by the minor. Parents and legal guardians are warned that the Site does display photographs and images containing nudity and violence that may be offensive to some.<br>The Services are for use by individuals who are photographers and graphic artists. Accounts may not be opened by galleries, agents and other market intermediaries and entities who represent photographers and graphic artists or sell their works. If you do not qualify for registration you are not permitted to open an account or use the Services.',
  }
  ],

        plain: 'To fully use the services you need to create your own account, without violating other peoples&apos; rights.'
 },
    {
        legals: [{
                title: 'User Conduct',
                legal: 'All Content posted or otherwise submitted to the Site is the sole responsibility of the account holder from which such Content originates and you acknowledge and agree that you, and not Buffalo Projects are entirely responsible for all Content that you post, or otherwise submit to the Site. Buffalo Projects does not control user submitted Content and, as such, does not guarantee the accuracy, integrity or quality of such Content. You understand that by using the Site you may be exposed to Content that is offensive, indecent or objectionable.<br>As a condition of use, you promise not to use the Services for any purpose that is unlawful or prohibited by these Terms, or any other purpose not reasonably intended by Buffalo Projects. By way of example, and not as a limitation, you agree not to use the Services:<br>To abuse, harass, threaten, impersonate or intimidate any person;<br>To post or transmit, or cause to be posted or transmitted, any Content that is libellous, defamatory, obscene, pornographic, abusive, offensive, profane, or that infringes any copyright or other right of any person;<br>For any purpose (including posting or viewing Content) that is not permitted under the laws of the jurisdiction where you use the Services;<br>To post or transmit, or cause to be posted or transmitted, any communication or solicitation designed or intended to obtain password, account, or private information from any Buffalo Projects user;<br>To create or transmit unwanted ‘spam’ to any person or any URL<br>To create multiple accounts for the purpose of voting for or against users’ photographs or images;<br>To post copyrighted Content which doesn’t belong to you, with exception of Blogs, where you may post such Content with explicit mention of the author’s name and a link to the source of the Content;<br>With the exception of accessing RSS feeds, you will not use any robot, spider, scraper or other automated means to access the Site for any purpose without our express written permission. Additionally, you agree that you will not: (i) take any action that imposes, or may impose in our sole discretion an unreasonable or disproportionately large load on our infrastructure; (ii) interfere or attempt to interfere with the proper working of the Site or any activities conducted on the Site; or (iii) bypass any measures we may use to prevent or restrict access to the Site;<br>To artificially inﬂate or alter vote counts, blog counts, comments, or any other Service or for the purpose of giving or receiving money or other compensation in exchange for votes, or for participating in any other organized effort that in any way artificially alters the results of Services;<br>To advertise to, or solicit, any user to buy or sell any products or services, or to use any information obtained from the Services in order to contact, advertise to, solicit, or sell to any user without their prior explicit consent;<br>To promote or sell Content of another person<br>To sell or otherwise transfer your profile.<br>To report a suspected abuse of the Site or a breach of the Terms (other than relating to copyright infringement which is addressed under “COPYRIGHT COMPLAINTS” below) please send written notice to Buffalo Projects at email: help@buffaloprojects.com.<br>You are solely responsible for your interactions with other users of the Site. Buffalo Projects reserves the right, but has no obligation, to monitor disputes between you and other users.',
  }
  ],

        plain: 'You cannot use our site to post pornographic material, harass people, send spam, negatively vote on all photos, and do other crazy stuff. Be reasonable and responsible, don&apos;t do anything stupid and youa&apos;ll be fine.'
 },
    {
        legals: [{
                title: 'Content Submitted Or Made Available For Inclusion On The Service',
                legal: 'Please read this section carefully before posting, uploading, or otherwise submitting any Content to the site. By submitting content to the site you are granting Buffalo Projects a worldwide, Non exclusive license to use the content and are representing and warranting to Buffalo Projects That the content is owned or duly licensed by you, and that Buffalo Projects is free to publish, Distribute and use the content as hereinafter provided for without obtaining permission Or license from any third party.<br><br>In consideration of Buffalo Projects’s agreement to allow you to post Content to the Site and Buffalo Projects’s agreement to publish such Content and for other valuable consideration the receipt and sufficiency of which are hereby expressly and irrevocably acknowledged, you agree with Buffalo Projects as follows:<br><br>You acknowledge that:<br>By uploading your photographic or graphic works to Buffalo Projects you retain full rights to those works that you had prior to uploading.<br>By posting Content to the Site you hereby grant to Buffalo Projects a non-exclusive, transferable, fully paid, worldwide license (with the right to sublicense) to use, distribute, reproduce, modify, adapt, publicly perform and publicly display such Content in connection with the Services. This license will exist for the period during which the Content is posted on the Site and will automatically terminate upon the removal of the Content from the Site;<br>The license granted to Buffalo Projects includes the right to use your Content fully or partially for promotional reasons and to distribute and redistribute your Content to other parties, web-sites, applications, and other entities, provided such Content is attributed to you in accordance with the credits (i.e. username, profile picture, photo title, descriptions, tags, and other accompanying information) if any and as appropriate, all as submitted to Buffalo Projects by you;<br>Buffalo Projects uses industry recognized software and measures to restrict the ability of users and visitors to the Site to make high resolution copies of Content posted on the Site. Notwithstanding this, Buffalo Projects makes no representation and warranty that Content posted on the Site will not be unlawfully copied without your consent. Buffalo Projects does not restrict the ability of users and visitors to the Site to make low resolution or ‘thumbnail’ copies of Content posted on the Site and you hereby expressly authorize Buffalo Projects to permit users and visitors to the Site to make such low resolution copies of your Content; and<br>Subject to the terms of the foregoing license, you retain full ownership or other rights in your Content and any intellectual property rights or other proprietary rights associated with your Content.<br>You represent and warrant that:<br>You are the owner of all rights, including all copy rights in and to all Content you submit to the site;<br>You have the full and complete right to enter into this agreement and to grant to Buffalo Projects the rights in the Content herein granted, and that no further permissions are required from, nor payments required to be made to any other person in connection with the use by Buffalo Projects of the Content as contemplated herein; and<br>The Content does not defame any person and does not infringe upon the copyright, moral rights, publicity rights, privacy rights or any other right of any person, or violate any law or judicial or governmental order.<br>You shall not have any right to terminate the permissions granted herein, nor to seek, obtain, or enforce any injunctive or other equitable relief against Buffalo Projects, all of which such rights are hereby expressly and irrevocably waived by you in favour of Buffalo Projects.',
  }
  ],

        plain: 'Your photos will preserve whatever copyright they had before uploading to this site. We will protect the copyright and will not sell your photos without your permission.'
 },
    {
        legals: [{
                title: 'Trademarks',
                legal: 'Buffalo Projects, buffaloprojects.com and other Buffalo Projects graphics, logos, designs, page headers, button icons, scripts, and service names are registered trademarks, trademarks or trade dress of Buffalo Projects. Buffalo Projects’s trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Buffalo Projects. The images and icons available in the Buffalo Projects icon pack may used by partners and third party sites in connection with providing appropriate links to the Buffalo Projects Site.',
  }
  ],

        plain: 'Please respect our trademarks and brands.'
 },
    {
        legals: [{
                title: 'Termination',
                legal: 'Buffalo Projects may terminate or suspend any and all Services and/or your Buffalo Projects account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination of your account, your right to use the Services will immediately cease. If you wish to terminate your Buffalo Projects account, you may simply discontinue using the Services. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.<br><br>It is your responsibility to remove all Content from your account prior to termination. Upon termination of your account Buffalo Projects will automatically remove all Content posted to your account.',
  }
  ],

        plain: 'We may stop providing services at any time. You can stop using your account or close it at any time as well.'
 },
    {
        legals: [{
                title: 'Change',
                legal: 'Buffalo Projects reserves the right, at its sole discretion, to modify or replace the terms at any time. If the alterations constitute a material change to the terms, Buffalo Projects will notify you by posting an announcement on the site. What constitutes a material change will be determined at Buffalo Projects’s sole discretion. You shall be responsible for reviewing and becoming familiar with any such modifications. Using any service or viewing any content following notification of a material change to the terms shall constitute your acceptance of the Terms as modified.',
  }
  ],

        plain: 'If these terms of use change, we will notify you.'
 },
    {
        legals: [{
                title: 'Miscellaneous',
                legal: 'No agency, partnership, joint venture, or employment is created as a result of the Terms and you do not have any authority of any kind to bind Buffalo Projects in any respect whatsoever. The failure of either party to exercise in any respect any right provided for herein shall not be deemed a waiver of any further rights hereunder. Buffalo Projects shall not be liable for any failure to perform its obligations hereunder where such failure results from any cause beyond Buffalo Projects’s reasonable control, including, without limitation, mechanical, electronic or communications failure or degradation (including "line-noise" interference). If any provision of the Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the Terms shall otherwise remain in full force and effect and enforceable. Buffalo Projects may transfer, assign or delegate the Terms and its rights and obligations without consent. The Terms shall be governed by and construed in accordance with the laws of Ontario, as if made within Ontario between two residents thereof, and the parties submit to the exclusive jurisdiction of Ontario courts. Both parties agree that the Terms is the complete and exclusive statement of the mutual understanding of the parties and supersedes and cancels all previous written and oral agreements, communications and other understandings relating to the subject matter of the Terms, and that all modifications must be in a writing signed by both parties, except as otherwise provided herein.',
  }
  ],

        plain: 'Things can happen — we are not responsible.'
 },
 ];
var termsSummary = 'The following document outlines the terms of use of the Buffalo Projects website. You can also review our Privacy policy, which outlines our practices towards handling any personal information that you may provide to us.';
var privacySections = [
    {
        legals: [{
                title: 'Information Collected by Buffalo Projects',
                legal: 'We only collect personal information that is relevant to the purpose of our website. This information allows us to provide you with a customized and efficient experience. We collect the following types of information from our Buffalo Projects users:',
  }
  ],

        plain: 'We collect information to make Buffalo Projects website useful for you.'
 },
    {
        legals: [{
                title: 'Information You Provide to Us:',
                legal: 'We receive and store any information you enter on our website or provide to us in any other way. You can choose not to provide us with certain information, but then you may not be able to take advantage of many of our special features.<br>Registration: In order for you to use Buffalo Projects services you must complete a registration form. As part of this registration form, we require select personal information.<br>User Profile: To allow you to express yourself beyond just the information collected during registration, we enable you to provide additional information, such as a bio, favorite URLs, and instant messaging IDs. In addition, you may choose to include photos of yourself in your profile. As indicated below, in the section titled "Sharing Your Information", you can control how your information is displayed and used.',
  },
            {
                title: 'Automatic Information:',
                legal: 'We receive and store certain types of information whenever you interact with us. Buffalo Projects and its authorized agents automatically receive and record certain "traffic data" on their server logs from your browser including your IP address, Buffalo Projects cookie information, and the page you requested. Buffalo Projects uses this traffic data to help diagnose problems with its servers, analyze trends and administer the website.<br>Buffalo Projects may collect and, on any page, display the total counts that page has been viewed. This includes User Profile pages.<br>Many companies offer programs that help you to visit websites anonymously. While Buffalo Projects will not be able to provide you with a personalized experience if we cannot recognize you, we want you to be aware that these programs are available.',
  }
  ],

        plain: 'We collect your registration and user profile data. Our servers also collect log information used to make the website faster and better.'
 },
    {
        legals: [{
                title: 'E-mail Communications',
                legal: 'Buffalo Projects is very concerned about your privacy and we will never provide your email address to a third party without your explicit permission, as detailed in the "Sharing Your Information" section below. Buffalo Projects may send out e-mails with Buffalo Projects-related news, products, offers, surveys or promotions. You may also receive notification e-mails from Buffalo Projects, which inform you of actions (e.g. friend requests) that have been performed on the site. If you do not want to receive e-mail from us, please visit the Email Preferences section of your User Profile and/or follow the instructions contained in the unwanted e-mail message. However, please note that in all cases you will continue to receive all system e-mails (e.g. those regarding forgotten user passwords) and legal notices (e.g. updates to our policies) from us.',
  }
  ],

        plain: 'We will send you emails based on your profile settings. From time to time, we may send emails to all our users.'
 },
    {
        legals: [{
                title: 'Cookies',
                legal: 'Cookies are alphanumeric identifiers that we transfer to your computer&apos;s hard drive through your Web browser to enable our systems to recognize your browser and tell us how and when pages in our website are visited and by how many people. Buffalo Projects cookies do not collect personal information, and we do not combine information collected through cookies with other personal information to tell us who you are or what your screen name or e-mail address is.<br>The "help" portion of the toolbar on the majority of browsers will direct you on how to prevent your browser from accepting new cookies, how to command the browser to tell you when you receive a new cookie, or how to fully disable cookies. We recommend that you leave the cookies activated because cookies allow you to use some of Buffalo Projects&apos;s coolest features. Some of our business partners, like our advertisers, may use cookies on our website. We have no access to, or control over, these cookies.',
  }
  ],

        plain: 'To remember you, our system will give you a cookie. It&apos;s safe.'
 },
    {
        legals: [{
                title: 'Sharing Your Information',
                legal: 'Because Buffalo Projects enables people to discover and share information with one another, information about the people who use Buffalo Projects is an integral part of the Buffalo Projects experience. Rest assured that we neither rent nor sell your personal information to anyone and that we will share your personal information only as described below.<br><br>Buffalo Projects Personnel: Buffalo Projects personnel and authorized consultants and/or contractors may have access to user information if necessary in the normal course of Buffalo Projects business.<br>Business Transfers: In some cases, we may choose to buy or sell assets. In these types of transactions, user information is typically one of the business assets that is transferred. Moreover, if Buffalo Projects, or substantially all of its assets, were acquired, user information would be one of the assets that is transferred.<br>Protection of Buffalo Projects and Others: We may release personal information when we believe in good faith that release is necessary to comply with a law; to enforce or apply our Terms of Use and other policies; or to protect the rights, property, or safety of Buffalo Projects, our employees, our users, or others. This includes exchanging information with other companies and organizations for fraud protection and credit risk reduction.<br>User Profile information: Information collected during registration and subsequent visits, such as your full name and location, may be displayed to other Buffalo Projects users in your User Profile. The User Profile is the area on Buffalo Projects where we allow you to tell other Buffalo Projects users about yourself. You may control what personal information is displayed in your User Profile by visiting the Settings section of your User Profile.<br>Followers&apos; Activity: Much like other online social networks, Buffalo Projects allows non-followers to browse your followers activity.<br>Syndication: Buffalo Projects allows for the RSS syndication of all of its public content within the Buffalo Projects website.<br>With Your Consent: Except as noted above, we will contact you when your personal information is shared with third parties or used for a purpose incompatible with the purpose(s) for which it was originally collected, and you will be able to opt out to prevent the sharing of this information.',
  }
  ],

        plain: 'We do not sell your information to anyone. However, we will show publicly available information to other users and may release other information to authorities where required by law.'
 },
    {
        legals: [{
                title: 'Keeping Information Secure',
                legal: 'Your Buffalo Projects account information is protected by a password for your privacy and security. Protect against unauthorized access to your password and to your computer by logging off once you have finished using a shared computer.<br>Only employees who need personal information to perform a specific job (for example, a customer service representative) are granted access to it. All of our employees are kept up to date on our privacy and security practices.',
  }
  ],

        plain: 'Your account is protected by an encrypted password. We keep it secure, you must also keep it safe. Our employees may not access your account unless required to do a specific job.'
 },
    {
        legals: [{
                title: 'Ways to Control Display and Use of Your Information',
                legal: 'As stated previously, you can always opt not to disclose information, but then you may be unable to use certain features on our website.<br>By visiting your User Profile, you can correct, amend, add or delete personal information on our website.<br>If you do not wish to receive e-mail from us or other Buffalo Projects users, please visit the Settings of your User Profile and/or follow the instructions contained in the unwanted e-mail message.<br>However, please note that you will continue to receive all system e-mails (e.g. those regarding forgotten user passwords) and legal notices (e.g. updates to our policies) from us.<br>As explained earlier, the "help" portion of the toolbar on the majority of browsers will direct you on how to prevent your browser from accepting new cookies, how to command the browser to tell you when you receive a new cookie, or how to fully disable cookies. Please note, however, that if your browser does not accept cookies, you will not be able to take advantage of some of our attractive features.',
  }
  ],

        plain: 'You can choose not to share information with us, but your experience of the site may be limited. However, until your account is deleted, you may receive all system emails.'
 },
    {
        legals: [{
                title: 'Children Under 18 Years of Age',
                legal: 'You must be 14 years and older to register to use the Buffalo Projects website. As a result, Buffalo Projects does not specifically collect information about children. If we learn that Buffalo Projects has collected information from a child under the age of 13, we will delete that information as quickly as possible. We recommend that minors between the ages of 14 and 18 ask and receive their parents&apos; permission before using Buffalo Projects or sending information about themselves or anyone else over the Internet.',
  }
  ],

        plain: 'Please register only when you reach 18 years old, or ask your parents&apos; permission if you are between 14 and 18 years old.'
 },
    {
        legals: [{
                title: 'Changes to this Privacy Policy',
                legal: 'Buffalo Projects may amend this Privacy Policy from time to time, at its sole discretion. Use of information we collect now is subject to the Privacy Policy in effect at the time such information is used. If we make changes to the Privacy Policy, we will notify you by posting an announcement on the Buffalo Projects website so you are always aware of what information we collect, how we use it, and under what circumstances if any, it is disclosed.',
  }
  ],

        plain: 'Privacy policy may change.'
 },
    {
        legals: [{
                title: 'Conditions of Use',
                legal: 'If you decide to visit Buffalo Projects website, your visit and any possible dispute over privacy is subject to this Privacy Policy and our Terms of Use, including limitations on damages, arbitration of disputes, and application of Ontario law.',
  }
  ],

        plain: 'Visiting Buffalo Projects is subject to Terms and Privacy policy.'
 },
    {
        legals: [{
                title: 'Effective Date of this Privacy Policy',
                legal: 'This Privacy Policy is effective as of May 1, 2009',
  }
  ],

        plain: 'Effective as of May 1, 2009.'
 },
 ];
var privacySummary = 'Buffalo Projects is founded on the principle of helping people discover new photos and photographers. We know that you care about how your personal information is used and shared, and we take your privacy very seriously. By visiting the Buffalo Projects website, you are accepting the practices outlined in this policy.';

var homeImages = [
    {
        id: '0',
        path: 'assets/img/cherry_blossoms.jpg'
 },
    {
        id: '1',
        path: 'assets/img/fall1.jpg'
 },
    {
        id: '2',
        path: 'assets/img/poppies.jpg'
 },
    {
        id: '3',
        path: 'assets/img/winter.jpg'
 },
    {
        id: '4',
        path: 'assets/img/fall2.jpg'
 },
    {
        id: '5',
        path: 'assets/img/fall3.gif'
 },
    {
        id: '6',
        path: 'assets/img/spring2.jpg'
 },
    {
        id: '7',
        path: 'assets/img/spring3.jpg'
 },
    {
        id: '8',
        path: 'assets/img/summer2.jpg'
 },
    {
        id: '9',
        path: 'assets/img/summer3.jpg'
 },
    {
        id: '10',
        path: 'assets/img/winter2.jpg'
 },
    {
        id: '11',
        path: 'assets/img/winter3.jpg'
 },

 ];