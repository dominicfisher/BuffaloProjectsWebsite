(function() {

	var access_token = "18360510.5b9e1e6.de870cc4d5344ffeaae178542029e98b"; //*** YOU NEED TO GET YOUR OWN ACCESS TOKEN FROM INSTAGRAM
	//http://instagram.com/developer/authentication/
	//http://dmolsen.com/2013/04/05/generating-access-tokens-for-instagram/

	var resolution = "thumbnail"; // resolution: low_resolution, thumbnail, standard_resolution
	var user_id = "265722976"; //userid
	var hashtag = "racehungry"; // #hashtag
	var last_url = "";

	//HASHTAG URL - USE THIS URL FOR HASHTAG PICS
	//var start_url = "https://api.instagram.com/v1/tags/"+hashtag+"/media/recent/?access_token="+access_token;
	//USER URL - USE THIS URL FOR USER PICS
	var start_url = "https://api.instagram.com/v1/users/"+user_id+"/media/recent/?access_token="+"265722976.f27369c.0f57280a4f634d6785b98a9244a3e8c5";

	//CLIENT ID	0d6cfdec6f874140920e84d338c7dd01
	//CLIENT SECRET	f1b1597a5da64c9f9b28efc1b32677e3
	//ACCESS TOKEN 265722976.f27369c.0f57280a4f634d6785b98a9244a3e8c5
	//https://api.instagram.com/v1/tags/racehungry/media/recent?access_token=1836…6303057241113856435_1395676110362&_=1395676128688&max_tag_id=1343521624608

	function loadEmUp(next_url){

		//console.log("loadEmUp url:" + next_url);
		url = next_url;
		
		$(function() {
		    $.ajax({
			    	type: "GET",
			        dataType: "jsonp",
			        cache: false,
			        url: url ,
			        success: function(data) {
			        
			  		//next_url = data.pagination.next_url;
			  		//count = data.data.length;
			  		//three rows of four
			  		count = 12; 
			
			  		//uncommment to see da codez
			        //console.log("count: " + count );
			        //console.log("next_url: " + next_url );
					//console.log("data: " + JSON.stringify(data) );
					
		            for (var i = 0; i < count; i++) {
							if (typeof data.data[i] !== 'undefined' ) {
							//console.log("id: " + data.data[i].id);
								$("#instagram").append("<div class='instagram-wrap' style='float:left; width:25%;' id='pic-"+ data.data[i].id +"' ><a target='_blank' href='" + data.data[i].link +"'><img class='instagram-image' style='width:100%' src='" + data.data[i].images.low_resolution.url +"' /></a></div>"
							);  
							}  
		      		}     
			  			  	
			  		$("#showMore").hide();
			  		if (typeof next_url === 'undefined' || next_url.length < 10 ) {
				  		$("#showMore").hide();
				  		$( "#more" ).attr( "next_url", "");
			  		}
			  		
			  		
		      		else {
				        //set button value
				        $("#showMore").show();
				        //$( "#more" ).attr( "next_url", next_url);
				        //last_url = next_url;
			      		
		      		}
		        }
		    });
		});
	}

		


	//CALL THE SCRIPT TO START...
	function getInstagramFeed() {
		
		//APPEND LOAD MORE BUTTON TO THE BODY...
		$("#more" ).click(function() {  
			var next_url = $(this).attr('next_url');
			loadEmUp(next_url);
			return false;
		});

		//start your engines
		loadEmUp(start_url);

		
	};
	
	function startHomeSlideShow() {
		$(function() {
			$('#slides').slidesjs({
		        width: 940,
		        height: 528,
		        play: {
		          active: false,
		          auto: true,
		          interval: 4000,
		          swap: true
		        },
		        pagination: {
		        	active: false
		        }
		      });
		});

	}
	
	
	
var app = angular.module('buffaloprojects', ['ngRoute']);

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function(){
        ga('send', 'pageview', $location.path());
    });
});

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
app.config(
        function( $routeProvider ){

            // Typically, when defining routes, you will map the
            // route to a Template to be rendered; however, this
            // only makes sense for simple web sites. When you
            // are building more complex applications, with
            // nested navigation, you probably need something more
            // complex. In this case, we are mapping routes to
            // render "Actions" rather than a template.
            $routeProvider
            .when(
                    "",
                    {
                        action: "home"
                    }
                )
            	.when(
                    "/home",
                    {
                        action: "home"
                    }
                )
                .when(
                    "/concerts",
                    {
                        action: "concerts"
                    }
                )
                .when(
                    "/tickets",
                    {
                        action: "tickets"
                    }
                )
                .when(
                    "/conductor",
                    {
                        action: "conductor"
                    }
                )
                .when(
                    "/singers",
                    {
                        action: "singers"
                    }
                )
                .when(
                	"/singer/:singer",
                	{
                		action:	"singer"
                	}
                )
                .when(
                	"/about",
                	{
                		action: "about"
                	}
                )
                .when (
                	"/reviews",
                	{
                		action	:"reviews"
                	}
                )
                .when (
                	"/recordings",
                	{
                		action	:"recordings"
                	}
                )
                .otherwise(
                    {
                        action	:	"home"
                    }
                )
            ;

        }
    );


app.controller('AppController1', function( $scope, $route, $routeParams ){
			
            // Update the rendering of the page.
            render = function(){

                // Pull the "action" value out of the
                // currently selected route.
            	//getMaps();
            	$scope.selectedHeaderItem = $route.current.action;

                // Also, let's update the render path so that
                // we can start conditionally rendering parts
                // of the page.
                //var renderPath = renderAction.split( "." );

                // Grab the username out of the params.
                //
                // NOTE: This will be undefined for every route
                // except for the "contact" route; for the sake
                // of simplicity, I am not exerting any finer
                // logic around it.
                //var username = ($routeParams.username || "");

                // Reset the booleans used to set the class
                // for the navigation.
                //var isHome = (renderPath[ 0 ] == "home");
                //var isFriends = (renderPath[ 0 ] == "friends");
                //var isContact = (renderPath[ 0 ] == "contact");

                // Store the values in the model.
                //$scope.renderAction = renderAction;
                $scope.renderPath = $route.current.action;
                $scope.selectedSinger = $routeParams.singer;

                
                if($scope.selectedSinger) {
                	$scope.singers = this.singerItems;
                	for(var a = 0;a<$scope.singers.length;a++) {
                		var potentialSinger = $scope.singers[a];
                		if(potentialSinger.id.toLowerCase() === $scope.selectedSinger.toLowerCase()) {
                			$scope.selectedSingerName = potentialSinger.name;
                			$scope.selectedSingerBio = potentialSinger.description;
                			$scope.selectedSingerLargeImage = potentialSinger.largeImage;
                		}
                	}
                }

                /*$scope.username = username;
                $scope.isHome = isHome;
                $scope.isFriends = isFriends;
                $scope.isContact = isContact;*/

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

app.controller('PageController', function($scope) {
	$scope.selectedHeaderItem = 'home';
	
	this.selectHeaderItem = function(setHeaderItem) {
		$scope.selectedHeaderItem = setHeaderItem;
	};
	
	this.isHeaderItemSelected = function(checkHeaderItem) {
		return $scope.selectedHeaderItem === checkHeaderItem;
	}

})
app.controller('HeaderController', function() {
	
	this.menuItems = headerItems
	
	
})

app.controller('HomeController', function() {
	getInstagramFeed();
	startHomeSlideShow()
	
	this.homeBanners = homeSlideItems;
})


app.controller('ReviewsController', function() {
	this.reviews = reviewItems;
})

app.controller('RecordingsController', function($scope, $sce) {
	this.recordings = recordingItems;
})

app.controller('ConcertsController', function($scope) {
	this.concerts = concertItems;
	
	this.strippedConcertMapDiv = function(concertTitle, time, concertLocation) {
		concertStripped = concertTitle.replace(/\s/g,''); 
		timeStripped = time.replace(/\s/g,'');
		locationStripped = concertLocation.replace(/\s/g,''); 
		return concertStripped + "_" + timeStripped + "_" + locationStripped;
	}
	
	
	$scope.$on('$includeContentLoaded', function(event) {
    	
		setTimeout("getMaps()", 1000);
    });


})

app.controller('SingerController', function($scope) {
	
	this.singers = singerItems;
	
	
	this.selectedSingerName = $scope.selectedSingerName;
	this.selectedSingerBio = $scope.selectedSingerBio;
	this.selectedSingerLargeImage = $scope.selectedSingerLargeImage
})

})()

var singerItems = [
	{
		id			:	'KatherineCrawford',
		name		:	'Katherine Crawford',
		largeImage	:	'img/singers/crawford.jpg',
		smallImage	:	'img/singers/crawfordLanding.jpg',
		description	:	"Katherine Crawford, mezzo-soprano, holds a Master of Music degree in Vocal Performance from the Conservatory of Music and Dance at the University of Missouri ñ Kansas City and a Bachelor of Music degree in Vocal Performance from St. Olaf College. She enjoys performing in the styles of opera, operetta, and musical theater and is especially interested in contemporary and experimental works. This is her fourth season with the Chorale, and she is pleased to serve as the Singer Liaison to the Choraleís Board of Directors. Ms. Crawford is also responsible for managing the Choraleís social media marketing on Facebook, Twitter, and Instagram."
	},
	{
		id			:	'PaulaBrekken',
		name		:	'Paula Brekken',
		largeImage	:	'img/singers/brekken.jpg',
		smallImage	:	'img/singers/brekkenLanding.jpg',
		description	:	"Paula Brekken, mezzo soprano, is a native of Casper, WY and has sung with the chorale for 14 seasons. She came to Kansas City to attend UMKC and graduated in 1995 with a Bachelorís in Music Education. Paula taught vocal music in the public schools for 7 years. In January of 2007 she was a chosen participant for the St. Matthew Passion under the direction of Helmuth Rilling at Carnegie Hall. Currently, Paula is in her 20th year at Crossroads Church in Overland Park, KS as music director, and enjoys teaching private voice.  She is happily married to Mike and has three daughters Sonia 11, Risa 9, and Becca 5."
	},
	{
		id			:	'ChristineBaehr',
		name		:	'Christine Baehr',
		largeImage	:	'img/singers/baehr.jpg',
		smallImage	:	'img/singers/baehrLanding.jpg',
		description	:	'Christine Baehr, soprano, graduated from Benedictine College in 2012 with a Bachelor of Arts degree in Music. She also sings with the Kansas City Symphony Chorus and plays the viola for the Liberty Symphony Orchestra. This is her third season with the Kansas City Chorale.'
	},
	{
		id			:	'SamAnderson',
		name		:	'Sam Anderson',
		largeImage	:	'img/singers/anderson.jpg',
		smallImage	:	'img/singers/andersonLanding.jpg',
		description	:	'Sam Anderson, baritone, has been a member of The Kansas City Chorale since 2010. He graduated from the University of Nebraska-Lincoln in 2008 with a Bachelor Degree in Music Education. He is the Director of Choirs at Rockhurst High School, and is the Director of Music at St. Paulís Episcopal Church in midtown Kansas City. Along with being a vocalist on the 2013 Grammy Award Winning album ìLife and Breath,î Sam was recently named one of 217 quarter-finalists for the Music Educator Award presented by The Recording Academy and the GRAMMY Foundation from over 30,000 nominations. Sam is thrilled to be making music in the ever-growing arts in Kansas City, and most especially performing in the Chorale with Mr. Buffy, his colleagues and his wife, Sarah Tannehill.'
	},
	{
		id			:	'PaulDavidson',
		name		:	'Paul Davidson',
		largeImage	:	'img/singers/davidson.jpg',
		smallImage	:	'img/singers/davidsonLanding.jpg',
		description	:	'With the Chorale since 1995, Paul was a featured soloist on their Grammy-winning recording,  ìPassion Week.î Mr. Davidson studied full time at Kansas State University from 1988-1990 and 1992-1994, majoring in Geography. During the 1991-1992 interim, Paul took classes part time while he served on the National Council of the Student Environmental Action Coalition. From 1999 to 2004 he worked in the district office of Congressman Dennis Moore. He is a section leader at Grace and Holy Trinity Cathedral and a freelance writer'
	},
	{
		id			:	'PhilipEnloe',
		name		:	'Philip Enloe',
		largeImage	:	'img/singers/enloe.jpg',
		smallImage	:	'img/singers/enloeLanding.jpg',
		description	:	'Philip Enloe, tenor, is the Choral Music Director at Bingham Middle School in the Independence School District.  This is Philipís third year with the Kansas City Chorale.  Philip received his Bachelorís Degree in Music Education in 2009 from Southwest Baptist University in Bolivar, Missouri.  In addition to teaching voice and beginning piano, Philip leads worship at Birchwood Baptist Church in Independence.'
	},
	{
		id			:	'FrankFleschner',
		name		:	'Frank Fleschner',
		largeImage	:	'img/singers/fleschner.jpg',
		smallImage	:	'img/singers/fleschnerLanding.jpg',
		description	:	'This is tenor Frank Fleschner&apos;;s tenth season with the Kansas City Chorale. Frank graduated from Truman State University in Kirksville, Missouri with a Bachelor of Arts Degree in Music. As a soloist, Frank has appeared in Handelís Messiah and Bachís Johannes-Passion (Evangelist). Frank also performs with the vocal ensemble Prometheus, and serves as their webmaster. During the day, he excels as a technology professional and consultant, specializing in Macintosh computers and other Apple gadgets.'
	},
	{
		id			:	'MatthewGladden',
		name		:	'Matthew Gladden',
		largeImage	:	'img/singers/gladden.jpg',
		smallImage	:	'img/singers/gladdenLanding.jpg',
		description	:	'Matthew Gladden, tenor, is a native of Missouri. He completed his Bachelor&apos;;s degree in Vocal Performance at William Jewell College in 2008 and is thoroughly enjoying his sixth season with the Chorale. Matthew works for Community America Credit Union and is currently studying to receive his MBA with an emphasis on Financial Planning. He has performed in New York City, Phoenix, England, and Scotland. In April of 2009, he happily married his wife Meaghan and lives with her in Blue Springs.'
	},
	{
		id			:	'AnnaLouiseHoard',
		name		:	'Anna Louise Hoard',
		largeImage	:	'img/singers/choir.jpg',
		smallImage	:	'img/singers/choirLanding.jpg',
		description	:	'Mezzo-soprano Anna Hoard is a graduate of the University of Kansas School of Music, where she studied under Julia Broxholm.  While at KU she sang roles in operas and pursued everything from Pergolesi to Schoenberg with a variety of chamber ensembles.  Anna collaborates with composers at home and abroad, and is organizing new music events in 2014.  She is also a seasoned church musician, singing professionally with Episcopal choirs since her adolescence, and now calls St Pau&apos;;s Episcopal Church her midtown home. <br/><br/>Anna is a longtime fan of the Kansas City Chorale, and is delighted to join ranks with so many great musicians (and wonderful people).  She currently studies with fellow Chorale artist Sarah Tannehill Anderson.'
	},
	{
		id			:	'JeffreyHowe',
		name		:	'Jeffrey Howe',
		largeImage	:	'img/singers/choir.jpg',
		smallImage	:	'img/singers/choirLanding.jpg',
		description	:	'Jeff Howe, tenor, currently attends William Jewell College in Liberty, Missouri and is in his final year of studies as a Bachelor of Science in Vocal Performance. In addition to the Chorale, Jeff sings in a number of choirs at Jewell and is the Tenor Choral Intern at Village Presbyterian Church in Prairie Village, Kansas. After graduating he hopes to sing professionally full-time and make a life-long career out of music. It is his third year in the Chorale'
	},
	{
		id			:	'ErinKeller',
		name		:	'Erin Keller',
		largeImage	:	'img/singers/choir.jpg',
		smallImage	:	'img/singers/choirLanding.jpg',
		description	:	'An Iowa native, Erin has been active in the highest quality musical experiences since her first days in the Des Moines Childrenís Chorus. From 1998 to 2002, Erin attended UMKC where she earned a degree in Voice Performance. During this time Erin also attended the American Institute of Musical Studies in Graz, Austria, which concentrated on German Art Song. Following college, Erin became a professional singer and teacher in the KC metro area. Her experiences included having a lead role in the Kansas City Civic Opera, performing as a soloist at Unity Temple on the Plaza, with New Ear, the OwenCox Dance Group, and the Kansas City Chorale under the direction of Charles Bruffy. She also is experienced in the areas of jazz, composition, improvisation, and world musics. Erin recently earned a Masterís in Music Education with a minor in Ethnomusicology from the University of Colorado in Boulder. Following her degree, Erin was a K-8 Music Teacher in the Denver Public Schools school district for two years. Erin recently moved back to Kansas City in order to continue her career of music education and performance. Erin likes spending time with her fiancÈ Daniel and her dog Foxy.'
	},
	{
		id			:	'LindseyLang',
		name		:	'Lindsey Lang',
		largeImage	:	'img/singers/lang.jpg',
		smallImage	:	'img/singers/langLanding.jpg',
		description	:	'Soprano Lindsey Lang is noted for her bold interpretations of early music, having performed frequently with modern and period orchestras nationwide. In addition to the Chorale, Lindsey currently sings with the ensembles °Sacabuche!, the Simon Carrington Chamber Singers, and Voices of Prometheus and has appeared in mainstage early music events in Bloomington, Berkeley, New York, New Brunswick, and Quito, Ecuador. After earning a Masterís degree in Choral Conducting from the University of Missouri in 2008, she studied for two years at the Early Music Institute in Indiana University. She is currently the Director of Music at Asbury United Methodist in Prairie Village.  This is her fifth season singing with the Chorale.'
	},
	{
		id			:	'AlejandroManso',
		name		:	'Alejandro Manso',
		largeImage	:	'img/singers/choir.jpg',
		smallImage	:	'img/singers/choirLanding.jpg',
		description	:	'Alejandro Manso, received his Bachelor of Music Education Degree from Simpson College in Indianola, Iowa. There he was highly involved in the opera program singing supporting and lead roles. He then received his Masterís Degree in Conducting, with an emphasis in choral music, from the University of Michigan in Ann Arbor. <br/><br/>In addition to his passion for singing solo repertoire, Alejandro is an avid and accomplished choral conductor. He has directed a wide variety of choral groups including childrenís choirs, high school womenís and mixed choirs, a cappella chamber groups and honor choirs. He has directed several church choirs of different denominations and has worked with collegiate choirs. Alejandro has also had the opportunity to conduct overseas in Budapest, Hungary where he worked and performed with a local choir and orchestra. Alejandroís music mentors include Jerry Blackstone, Joe Miller, Marianne Ploger, Robert L. Larsen and now Charles Bruffy.<br/><br/>Currently, Alejandro is the liturgy and music director at St. Markís Catholic Church in Independence, Mo. In addition to singing his second season with the Grammy Award-winning Kansas City Chorale, Alejandro cantors for Masses, weddings, funerals and other liturgical events. Alejandro enjoys spending time at home with his newly married bride Katie and traveling whenever they get the chance.'
	},
	{
		id			:	'MelanieMelcher',
		name		:	'Melanie Melcher',
		largeImage	:	'img/singers/melcher.jpg',
		smallImage	:	'img/singers/melcherLanding.jpg',
		description	:	'Soprano Melanie Melcher is in her ninth season with the Kansas City Chorale.  Melanie ës work in opera has included roles with Ohio Light Opera, Knoxville Opera, Anchorage Opera Studio, Opera New York and Portland Opera Works.  She can be also be heard as Lady Psyche on the Newport Classics recording of Gilbert and Sullivan&apos;;s Princess Ida.  Ms. Melcher is the Director of Worship Arts at Leawood United Methodist Church. She received her Bachelor of Arts degree in Music Education from Millikin University and her Masters of Music in Vocal Performance from The University of Tennessee. Melanie and her husband, Brian, live with their children, Caleb and Anna, in Mission.'
	},
	{
		id			:	'HughNaughtin',
		name		:	'Hugh Naughtin',
		largeImage	:	'img/singers/naughtin.jpg',
		smallImage	:	'img/singers/naughtinLanding.jpg',
		description	:	'Hugh has a Bachelor of Music degree in Vocal Performance from Lawrence University in Appleton, Wisconsin, where he studied with Patrice Michaels. Since graduating in 2007, Hugh has sung in the Chicago Symphony Chorus, the Grant Park Chorus, and the Chicago-based a cappella ensemble Bella Voce. Hugh lives in Lawrence, Kansas, where he is involved in several local rock groups and teaches private lessons. This is his fifth season with the Kansas City Chorale.'
	},
	{
		id			:	'DevinCeperley',
		name		:	'Devin Ceperley',
		largeImage	:	'img/singers/choir.jpg',
		smallImage	:	'img/singers/choirLanding.jpg',
		description	:	''
	},
	{
		id			:	'BryanPinkall',
		name		:	'Bryan Pinkall',
		largeImage	:	'img/singers/pinkall.jpg',
		smallImage	:	'img/singers/pinkallLanding.jpg',
		description	:	'Bryan Pinkall, tenor, is an Instructor of Voice at Kansas State University. He recently earned his Doctor of Musical Arts degree in Voice Performance from the University of Missouri Kansas City last May. Bryan is the Founder and Education Director of the Kansas City Vocal Institute, which provides free or greatly discounted music education for underprivileged children and families in the Kansas City metro area. In 2012, he was recipient of Ellen Battell Stoeckell Fellowship from Yale University, and he was recently named a music director for the 2014 Olympic Winter Games Opening Ceremony in Sochi, Russia. This is Bryan&apos;;s third season with the Kansas City Chorale and he has performed professionally for several choirs including Kansas City&apos;;s Te Deum chamber ensemble, Te Deum Antiqua, the Simon Carrington Chamber Singers, the Spire Symphonic Chorus, and many baroque and early music ensembles.  Bryan was a featured soloist at the Grand Opening Gala of the Kauffman Center for the Performing Arts and has performed leading roles with regional opera companies and orchestras across the United States'
	},
	{
		id			:	'JessicaSalley',
		name		:	'Jessica Salley',
		largeImage	:	'img/singers/salley.jpg',
		smallImage	:	'img/singers/salleyLanding.jpg',
		description	:	'Soprano, Jessica Salley, is in her third season with the Chorale. Other engagements include: resident soloist for the Musica Nova New Music Ensemble; soprano soloist at Village Presbyterianís concert series; artistic fellow with the professional development program, Artist INC II; performer for the Conservatory Kidís Club series; producer for the 3rd Space Recital Seriesí inaugural season, as well as producer of Marie, je tíaime, a multi-media concert narrating the early compositions of Claude Debussy. Jessica also teaches private voice lessons in Kansas City and Prairie Village. She holds a Master of Music degree from UMKC, where she was the Vocal Studies Department Graduate Teaching Assistant, and earned her Bachelor of Music from Oklahoma City University.'
	},
	{
		id			:	'NickolasStoppel',
		name		:	'Nickolas Stoppel',
		largeImage	:	'img/singers/choir.jpg',
		smallImage	:	'img/singers/choirLanding.jpg',
		description	:	'Nickolas Stoppel, bass-baritone, holds a Bachelor of Arts in Music degree from the UMKC Conservatory of Music and Dance. After moving to Kansas City in 2008, he has leant his voice to several ensembles, including the William Baker Festival Singers, Collegium, and The Simon Carrington Chamber Singers. Nickolas has been a founding member of Kantorei of Kansas City, Te Deum and Amphion Menís Ensemble. He is thrilled to begin his third season with the Kansas City Chorale, and is the bass soloist at Rolling Hills Presbyterian Church. Nickolas has sung under the direction of Ryan Board, Joseph Flummerfelt, Andre Thomas, Simon Carrington, Charles Bruffy, and studies privately with Anne DeLaunay. Nickolas is also a sought after soloist for a variety of liturgical services around the Kansas City area. In addition to singing, Nickolas is a personal trainer at the Jewish Community Center of Greater Kansas City.'
	},
	{
		id			:	'SarahTannehillAnderson',
		name		:	'Sarah Tannehill Anderson',
		largeImage	:	'img/singers/tannehill.jpg',
		smallImage	:	'img/singers/tannehillLanding.jpg',
		description	:	'Soprano Sarah Tannehill Anderson is a versatile musician, excelling as a singer of opera, oratorio, choral music, and contemporary works.  Having performed at companies including Opera Company of Philadelphia, Boston Lyric, Opera Omaha, Fort Worth Opera, and the Chicago Symphony Orchestra, Sarah is now thrilled to make her career in Kansas City.  She is a featured soloist on the Grammy Award Winning ìLife and Breathî.  Sarah is also a member of the Lyric Arts Trio, and performs with the Kansas City Symphony, Bach Aria Soloists, Kansas City Chamber Orchestra, New Ear Ensemble, and the Kansas City Ballet.  Sarah has a private voice studio and is married to Chorale chorister Sam Anderson.'
	},
	{
		id			:	'BryanTaylor',
		name		:	'Bryan Taylor',
		largeImage	:	'img/singers/taylor.jpg',
		smallImage	:	'img/singers/taylorLanding.jpg',
		description	:	'Bryan Taylor, baritone, joined the Chorale in 1992. He graduated from William Jewell College with a Music Education degree and completed his Master of Music degree in Choral Conducting at the University of Missouri-Kansas City Conservatory of Music. In 1998, he sang under the direction of Robert Shaw at Carnegie Hall and Furman University in South Carolina. He performed again with the Robert Shaw Festival Singers in January 2000 at Carnegie Hall and has returned for this honor for nine years. Taylor taught Choral Music for 15 years at Kearney High School, and is the Director of Music at Liberty United Methodist Church. Bryan is the founder and artistic director of the Liberty Community Chorus and is the Southwest ACDA Music in Worship Repertoire and Standards chair. Bryan and his wife Lanette live in Liberty and their kids are Lauren, Renee and Caleb. His music mentors include Manford and Nancy Rhea, Weston Noble, Arnold Epley, Eph Ehly, Charles Bruffy and Bill Grace.'
	},
	{
		id			:	'JosephWarner',
		name		:	'Joseph Warner',
		largeImage	:	'img/singers/warner.jpg',
		smallImage	:	'img/singers/warnerLanding.jpg',
		description	:	'Joe Warner began his professional singing career in the chorus at Starlight Theatre while earning a Bachelor of Music from Washburn, and his Masters in voice from Northwestern. He toured with the Houston Opera for 3 years, before moving to NYC, singing with opera companies all over the US. His roles included the Dons of buffo - Don Pasquale, Don Alfonso, Don Bartolo, Don Basilio, as well as Leporello, Colline, and Sparafucile. He sang with Trinity Wall St. for several years, and is now with Grace & Holy Trinity. He joined the Chorale in time for the recording Life & Breath, and is delighted to return for a fifth season. He and his wife, Susan, have two grown sons, Brandon and Evan, and wait patiently for grandchildren.'
	},
	{
		id			:	'JenniferWeiman',
		name		:	'Jennifer Weiman',
		largeImage	:	'img/singers/choir.jpg',
		smallImage	:	'img/singers/choirLanding.jpg',
		description	:	''
	},
	{
		id			:	'PamelaWilliamson',
		name		:	'Pamela Williamson',
		largeImage	:	'img/singers/williamson.jpg',
		smallImage	:	'img/singers/williamsonLanding.jpg',
		description	:	'Pamela Williamson, soprano, is the Choral Music Director at Olathe Northwest High School, and is in her twenty-third year as a music educator in the public schools in Kansas. Pam is on the music staff at Grace United Methodist Church in Olathe, Kansas. She has earned Bachelorís and Master&apos;;s degrees in Music Education from the UMKC Conservatory of Music. Pam is in her twenty-third season of singing with The Kansas City Chorale, and is a featured soloist on several of their recordings. Pam sang in the Robert Shaw Festival Singers in performances at Carnegie Hall, and has been an active music director and accompanist for many community musical theater events in the Kansas City area. Pam enjoys spending time with husband Brett, and her three sons, Jack (16), Avery (13) and Cole (11).'
	},
	
	
	]

var headerItems = [
	{
		type: 'image',
		title: 'home',
		link: '#/home',
		imgage:'img/logo.png'
	},
	{
		type:	'text',
		title: 'concerts',
		link: '#/concerts'
	},
	{
		type:	'text',
		title: 'tickets',
		link: '#/tickets'
	},
	{
		type:	'text',
		title: 'conductor',
		link: '#/conductor'
	},
	{
		type:	'text',
		title: 'singers',
		link: '#/singers'
	},
	{
		type:	'text',
		title: 'reviews',
		link: '#/reviews'
	},
	{
		type:	'text',
		title: 'recordings',
		link: '#/recordings'
	},
	{
		type:	'text',
		title: 'about',
		link: '#/about'
	},
	{
		type:	'text',
		title: 'donate',
		link: 'https://www.networkforgood.org/donation/ExpressDonation.aspx?ORGID2=43-1283321&vlrStratCode=sZOvB%2f0cd%2fdoiEayuvrC0%2bHUcaqApGciqgAdnqLRF5xnxOC8g9O0E72UbBzZzZBg',
	}
	];

var concertItems = [
	{
		title			:	"THE CHORALE WITH PATTI AUSTIN AT THE FOLLY",
		image			:	"img/concerts/headers/patti_austin_2014.jpg",
		description		:	"Since breaking through to solo success in the mid 1970s, GRAMMY® winner Patti Austin has become one of the world’s most popular and versatile vocalists. She joins the GRAMMY-winning Chorale for an evening of R&B, pop, jazz and more.",
		locations		:	[
			{
				locationid				:	"Location1",
				day						:	"Wednesday",
				month					:	"October",
				date					:	"15",
				time					:	"7:00",
				locationTitle			:	"Foley Theater",
				locationAddress			:	"300 W 12th Street",
				locationCityStateZip	:	"Kansas City, MO 64105",
				locationLat			:	"39.1003758704579",
				locationLon				:	"-94.5894205570221",
			}]
	},
	{
		title			:	"WINTERSONG AT THE NELSON",
		image			:	"img/concerts/headers/wintersong_2014.jpg",
		description		:	"Celebrate the festive season with holiday favorites sung in the beautiful setting of Rozzelle Court.",
		locations		:	[
			{
				locationid				:	"Location2",
				day						:	"Thursday",
				month					:	"December",
				date					:	"11",
				time					:	"5:30",
				locationTitle			:	"Rozellee Court at the Nelson-Atkins Museum of Art",
				locationAddress			:	"4525 Oak Street",
				locationCityStateZip	:	"Kansas City, MO 64111",
				locationLat				:	"39.045169346664586", 
				locationLon				:	"-94.58405613899231"
			}]
	},
	{
		title			:	"THE HOLIDAY CONCERTS",
		image			:	"img/concerts/headers/holiday_concerts_2014.jpg",
		description		:	"Choose from one of three performances this holiday season. There’s something for everyone in the family.",
		locations		:	[
			{
				locationid				:	"Location3",
				day						:	"Friday",
				month					:	"December",
				date					:	"12",
				time					:	"7:30",
				locationPreTitle		:	"CLASSICAL  CHRISTMAS",
				locationTitle			:	"Rolling Hills Presbyterian", 
				locationAddress			:	"9300 Nall Ave",
				locationCityStateZip	:	"Overland Park, KS 66207",
				locationLat				:	"38.958991658581915", 
				locationLon				:	"-94.65207695960999"
			},
			{
				locationid				:	"Location4",
				day						:	"Saturday",
				month					:	"December",
				date					:	"13",
				time					:	"2:00",
				locationPreTitle		:	"THE YOUTH CONCERT",
				locationTitle			:	"St. Michael the Archangel",
				locationAddress			:	"14251 Nall,",
				locationCityStateZip	:	"Leawood, KS 66223 ",
				locationLat				:	"38.870437021540795", 
				locationLon				:	"-94.64952349662781"
			},
			{
				locationid				:	"Location5",
				day						:	"Saturday",
				month					:	"December",
				date					:	"13",
				time					:	"7:30",
				locationPreTitle		:	"CLASSICAL  CHRISTMAS",
				locationTitle			:	"St. Paul's Episcopal",
				locationAddress			:	"4041 MAIN",
				locationCityStateZip	:	"Kansas City, MO 64111",
				locationLat				:	"39.05295151605557",
				locationLon				:	"-94.58789706230164"
			}
			
			]
	},
	{
		title			:	"NORTH OF THE BORDER",
		image			:	"img/concerts/headers/north_of_the_border_2014.jpg",
		description		:	"From the vast expanse of the Canadian landscape come gems collected by Maestro Bruffy on the Chorale’s recent tour to Halifax, Nova Scotia. Enjoy lush and lyrical songs from the forest, sea, and sky – and from the heart",
		locations		:	[
			{
				locationid				:	"Location6",
				day						:	"Sunday",
				month					:	"February",
				date					:	"22",
				time					:	"2:00",
				locationTitle			:	"Unity Temple",
				locationAddress			:	"707 W 47th Street",
				locationCityStateZip	:	"Kansas City, MO 64112",
				locationLat				:	"39.04210290312606",
				locationLon				:	"-94.59735989570618"
			},
			{
				locationid				:	"Location7",
				day						:	"Tuesday",
				month					:	"February",
				date					:	"24",
				time					:	"7:30",
				locationTitle			:	"Asbury Methodist Church",
				locationAddress			:	"5400 W 75th Street",
				locationCityStateZip	:	"Prairie Village, KS 66208",
				locationLat				:	"38.9935387036854",
				locationLon				:	"-94.64958786964417"
			}
			]
	},
	{
		title			:	"SPRINGSONG AT THE NELSON",
		image			:	"img/concerts/headers/springsong_2014.jpg",
		description		:	"Celebrate spring, the season of love, with the choir you love. Our traditional one-hour Easter Saturday concert.",
		locations		:	[
			{
				locationid				:	"Location8",
				day						:	"Saturday",
				month					:	"April",
				date					:	"4",
				time					:	"5:30",
				locationTitle			:	"Rozellee Court at the Nelson-Atkins Museum of Art",
				locationAddress			:	"4525 Oak Street",
				locationCityStateZip	:	"Kansas City, MO 64111",
				locationLat				:	"39.045169346664586",
				locationLon				:	"-94.58405613899231"
			}]
	},
	{
		title			:	"HERBERT HOWELLS’ REQUIEM",
		image			:	"img/concerts/headers/herbert_howells_requiem_2014.jpg",
		description		:	"A memorial to his lost son, Howells wrote this deeply personal, moving tribute in 1932 and kept it hidden from the world until he was finally persuaded to publish it in 1980, just three years before his death.",
		locations		:	[
			{
				locationid				:	"Location9",
				day						:	"Sunday",
				month					:	"May",
				date					:	"3",
				time					:	"2:00",
				locationTitle			:	"IMMACULATE CONCEPTION",
				locationAddress			:	"416 W 12th Street",
				locationCityStateZip	:	"Kansas City, MO 64105",
				locationLat				:	"39.10025930593752",
				locationLon				:	"-94.59102988243103"
			},
			{
				locationid				:	"Location10",
				day						:	"Tuesday",
				month					:	"May",
				date					:	"5",
				time					:	"7:30",
				locationTitle			:	"Asbury Methodist Church",
				locationAddress			:	"5400 W 75th Street",
				locationCityStateZip	:	"Prairie Village, KS 66208",
				locationLat				:	"38.9935387036854",
				locationLon				:	"-94.64958786964417"
			}
			]
	},
]

var reviewItems = [
	{
		review	: 	'Thanks for your stunning concert at the Coolidge Auditorium of the Library of Congress. Your concert had all the ingredients of a deep and lasting artistic experience: a marvelous sound and a sound that continued to surpass itself as the program progressed; wonderful material: what was familiar was richly reinterpreted; what was new to our ears fastened itself upon them with deep satisfaction; presentation with sensitive levels of vigor, tenderness, spirituality.',
		author	:	'Bruce Miller, Washington DC',
		date	:	'March 2003'
	},
	{
		review	: 	'The Kansas City Chorale artistic director and conductor Charles Bruffy, who is celebrating 15 years with the chorale, is entitled to look back with pride. He has led the group to international prominence and has been able through personnel changes to keep the ensemble in top form.',
		author	:	'Kansas City Star',
		date	:	'April 2'
	},
	{
		review	: 	'American music has been the lifeblood of this group since its inception, and it sings American music better than any group I know. Randall Thompson&pos;s anthemic &quot;Alleluia&quot; is a perfect example. There is a special understanding, an ineffable rightness, to the chorale&pos;s singing of this well-known masterpiece that defies logic.',
		author	:	'Kansas City Star',
		date	:	'April 2003'
	},
	{
		review	: 	'The Chorale is one of the finest choirs in the United States. And its leader, Charles Bruffy, is a master choral director, widely respected locally and nationally.',
		author	:	'Kansas City Star',
		date	:	'December 2004'
	},
	{
		review	: 	'Hearing an American Choir on Chandos, an English label, would seem like bringing coals to Newcastle. You&pos;d think that their own domestic legions of world-class choirs would fill their needs. But Chandos recognizes exceptional choral quality wherever it is to be found and they&pos;ve certainly upheld their reputation in this utterly gorgeous release.',
		author	:	'American Record Guide',
		date	:	'March 2007'
	},
	{
		review	: 	'By any reckoning, this CD features astonishing singing. Pitch, intonation and ensemble are exactly where they need to be. Although there are miles and miles of soft singing on this disc, not once do the singers lose their tonal focus, and the intensity of the sound actually seems to increase as the dynamic level decreases. To pile miracle upon miracle, Chandos has given the singers engineering which is both limpid and powerful. This would be a good disc with which to test your system&pos;s high-end response.',
		author	:	'Raymond Tuttle, International Record Review',
		date	:	'April 2007'
	},
	{
		review	: 	'Eternal rest" sounds like an attractive concept for a disc. These sounds of sorrow, intended as solace or terminal care, bathe the listener in a luxurious and soothing choral sound, which the Chandos engineering captures perfectly. The works on the disc are spiced with carefully considered dissonances, which the choir&pos;s granite-solid intonation and virtuoso ease do complete justice. &pos;There will be rest&pos; and the psalm setting &pos;In pace&pos; by American composers Frank Ticheli and Rene Clausen, are memorials professionally crafted for top-notch choirs with a sweetness that is never syrupy.',
		author	:	'Antti HÃyrynen, Rondo Classica',
		date	:	'April 2007'
	},
	{
		review	: 	'I was so taken by this CD that features the combined forces of the Phoenix Bach Choir and the Kansas City Chorale that I was actually daunted by the prospect of writing a review that would do it justice. If nothing else this disc proves the assertion that one doesn&pos;t have to live in the largest metropolitan centers to hear absolutely top-rank choral singing. Both these professional choirs are directed by Charles Bruffy who, over the last twenty years, has made a real name for himself in American choral circles. This CD can do nothing but elevate his and the choirs&pos; status further.',
		author	:	'J. Scott Morrison, Amazon.com',
		date	:	'January 2007'
	},
	{
		review	: 	'In Ren&pos; Clausen&pos;s In Pace and Frank Ticheli&pos;s hushed There Will Be Rest (commemorating the death of a child) they have the field to themselves and their well drilled and beautifully balanced singing prove deeply satisfying. The first of a series of joint ventures by these choirs; future installments will be well worth hearing.',
		author	:	'Guy Rickards, Gramophone',
		date	:	'March 2007'
	},
	{
		review	: 	'Grechaninov&pos;s Passion Week is a companion cycle to his better known, All-night Vigil, and it is wonderful to hear it complete (bits sometime crop up in anthologies here and there, but it&pos;s scarcely known outside Russia). The superlatives have already piled up against Charles Bruffy&pos;s name, and deservedly so. There can only be one reason for a label to release repertoire they already had in their catalogue, and that is that the new performance is so striking.',
		author	:	'William Whitehead , BBC Music Magazine',
		date	:	'May 2007 Choral/Vocal CD of the Month'
	},
	{
		review	: 	'Luxuriant textures, sumptuous harmonies, mouth-watering melodies, all beautifully conveyed with ravishing choral tone; this is a simply gorgeous disc. I advise pouring a glass of the finest (preferably Irish) whiskey, taking it to a seat in the sun possibly shaded by cherry blossoms) with a view across verdant gardens dotted with clumps of the freshest spring flowers to a distant ocean, calm and sparkling under a cloudless sky, and relaxing there with this disc not too far in the background. Purely in the interest of critical accuracy, I have tried it and I can guarantee it makes you glad to be alive. It redefines contentment.',
		author	:	'Marc Rochester, International Record Review',
		date	:	'April 2007'
	},
	{
		review	: 	'In this first-ever complete recording of Grechaninov&pos;s Passion Week, Chandos has pressed into service the mighty Kansas City Chorale, augmented by the Phoenix Bach Choir., in movements for double chorus and presumably elsewhere in this virtuoso work as well. Recorded at the Church of the Blessed Sacrament in Kansas City, this Direct Stream Digital Super Audio CD simply has marvelous sound that reproduces the very breath of the farthest chorister. Chandos&pos; Passion Week, Op. 58, is a slam-dunk for those who love great choral music; it is a major addition to the recorded repertoire for chorus and is a telling example of what &quot;high holy minimalism&quot; sounds like when it isn&pos;t minimal.',
		author	:	'Dave Lewis, All Music Guide',
		date	:	'May 2007'
	},
	{
		review	: 	'For starters, this CD contains some of the finest a cappella singing I&pos;ve ever heard. Its sumptuous choral tone must be heard to be believed. It is done by two professional choirs from seemingly unlikely places, the combined Kansas City Chorale and Phoenix Bach Choir. I have raved about their prior recordings both separately and in combination but this release possibly tops anything they&pos;ve done, at least in terms of ineffably beautiful a cappella choral sound. There is no question that Charles Bruffy, the conductor of both the Phoenix Bach Choir and the Kansas City Chorale, is one of the most talented choirmasters currently working anywhere in the world. He may very well be the US analog to Eric Ericson of Sweden or Laurence Equilbey of France. Certainly his choruses&pos; style is more European than English, and it is to the English Chandos label&pos;s credit that they have added these two Bruffy-directed choirs to their roster.',
		author	:	'J. Scott Morrison, Amazon.com',
		date	:	'May 2007'
	},
	{
		review	: 	'There is a tight quasi-symphonic unity about the piece that possibly derives from Grechaninov&pos;s admiration for Wagner. When one adds to this the outstanding use of &quot;choral orchestration,&quote it is clear that The Seven Days of the Passion is a milestone in the history of Russian choral literature. It&pos;s clear, too, that Charles Bruffy and his singers understand this fully, rejoicing in the work&pos;s technical challenges and its vast range of colour, and pacing it superbly.',
		author	:	'Ivan Moody, Gramophone',
		date	:	'June 2007'
	},
]

var recordingItems = [
	{
		image			:	'img/recordings/lifeandbreathcover.jpg',
		title			:	'Life and Breathe',
		conductor		:	'Choral Works by Rene Clausen',
		description		:	'Although he writes in all genres, Rene Clausen is today one of America&apos;s most popular choral composers, and for more than twenty years he has been the conductor of the internationally acclaimed Concordia Choir of Concordia College in Moorhead, Minnesota. On this release, choral works by Clausen a...',
		purchasePrice	:	'20.00',
		tracks			:	[
			{
				trackTitle	:	'All that Hath Life and Breath Praise the Lord',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'O magnum mysterium',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'The Tyger',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'The Lamb',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Mass: Kyrie',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Mass: Gloria',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Mass: Credo',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Mass: Sanctus',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Mass: Agnus Dei',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Magnificat',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Prayer',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'O vos omnes',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'A New Creation: Set me as a seal',
				trackmp3	:	'',
			}
			
			]
	},
	{
		image			:	'img/recordings/passionweek.png',
		title			:	'Passion Week',
		conductor		:	'Alexander Grechaninov',
		description		:	'&quot;Grechaninov&apos;s Passion Week is a companion cycle to his better known, All-night Vigil, and it is wonderful to hear it complete (bits sometime crop up in anthologies here and there, but it&pos;s scarcely known outside Russia). The superlatives have already piled up against Charles Bruffy&pos;s name, and deservedly so. There can only be one reason for a label to release repertoire they already had in their catalogue, and that is that the new performance is so striking.&quot;',
		purchasePrice	:	'20.00',
		tracks			:	[
			{
				trackTitle	:	'Behold the Bridegroom Comes',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'The Bridal Chamber',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'In Thy Kingdom',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Gladsome Light',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Let My Prayer Arise',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Now the Powers of Heaven',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Of Thy Mystical Supper',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'The Wise Thief',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Thou, Who Clothest Thyself With Light',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'The Lord is God; The Noble Joseph',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Do Not Lament Me, O Mother',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'As Many As Have Been Baptized; Arise O God',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Let All Mortal Flesh Keep Silent',
				trackmp3	:	'',
			}
			
			]
	},
	{
		image			:	'img/recordings/eternalrest.png',
		title			:	'Eternal Rest',
		conductor		:	'Mantyjarvl, Ticheli, Martin, Clausen',
		description		:	'&quot;…this is one of the finest a cappella choral recordings I’ve ever heard. By any reckoning, this CD features astonishing singing. Pitch, intonation and ensemble are exactly where they need to be. Although there are miles and miles of soft singing on this disc, not once do the singers lose their tonal focus, and the intensity of the sound actually seems to increase as the dynamic level decreases. To pile miracle upon miracle, Chandos has given the singers engineering which is both limpid and powerful. This would be a good disc with which to test your system’s high-end response.',
		purchasePrice	:	'20.00',
		tracks			:	[
			{
				trackTitle	:	'Mantyjarvi: Canticum Calamitatis Maritimae',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Ticheli: There Will Be Rest',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Martin: Mass for Double Chorus',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Kyrie',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Gloria',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Credo',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Sanctus',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Agnus Dei',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Clausen: In Pace',
				trackmp3	:	'',
			}
			
			]
	},
	{
		image			:	'img/recordings/nativitas.png',
		title			:	'Nativitas',
		conductor		:	'American Christmas Carols',
		description		:	'Released in 1994, Nativitas is a collection of American Christmas carols. This recording won "Best Seasonal Recording—Runner Up" from the National Association of Independent Record Distributors.',
		purchasePrice	:	'20.00',
		tracks			:	[
			{
				trackTitle	:	'Susa: Three Mystical Carols',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Carter: In Time of Softest Snow',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Rorem: Shout the Glad Tidings',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Johnson arr: Silent Night',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Belmont: Nativitas',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Sowerby: Love Came Down at Christmas',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Echols arr: A Christmas Carol',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Freed: Three Shepherd Carols',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Della Joio: The Holy Infantís Lullaby',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Martinson: There is No Rose',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Fissinger: I Saw Three Ships',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Cowell: Sweet Was the Song the Virgin Sung',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Oldham arr: Silent Night',
				trackmp3	:	'',
			},
			
			]
	},
	{
		image			:	'img/recordings/rheinberger.png',
		title			:	'Rheinberger',
		conductor		:	'Sacred Choral Works',
		description		:	'The music of Josef Gabriel Rheinberger (1839 –1901) is quite well known to organists, but his compositions for media other than the organ have been allowed to languish in relative obscurity. Fortunately, this disparity is beginning to be addressed, for Rheinberger has left us a great deal of music in a variety of genres, and the pieces written for the Catholic service are particularly fine.',
		purchasePrice	:	'20.00',
		tracks			:	[
			{
				trackTitle	:	'Oster-Hymne, Op. 134 - for Eight Voices (Double Choir), for Church and Concert',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Vier sechsstimmige Motetten, Op 133 - for Church and Concert',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Mass, Op. 109 - in E flat major, for Double Choir',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Drei geistliche Gesange, Op. 69 - for Mixed Choir',
				trackmp3	:	'',
			}
			
			]
	},
	{
		image			:	'img/recordings/rakhmaninov.png',
		title			:	'Rakhmaninov',
		conductor		:	'Liturgy of St. John Chrysostom',
		description		:	'Released in 1996, the New York Times said of the Chorale&apos;s recording of Rachmaninoff&apos;s Liturgy of St. John Chrysostom, that it&apos;s &quot;...a project that must be rated a serious contender for record of the year...the chorus is everywhere remarkable.&quot;',
		purchasePrice	:	'20.00',
		tracks			:	[
			{
				trackTitle	:	'The Great Litany',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Bless the Lord, O My Soul',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'In Thy Kingdom',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Come, Let Us Worship',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'O Lord, Save... Holy God',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'The Augmented Litany',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'The Cherubic Hymn',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'GThe Litany of Supplication and Father, Son...',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'The Creed',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'A Mercy of Peace',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'We Hymn Thee',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'It Is Truly Fitting',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Our Father',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'And to Your Spirit... Only One is Holy',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Praise the Lord from the Heavens',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Blessed Is He and We Have Seen',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Let Our Mouths Be Filled',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Blessed Be the Name of the Lord',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Glory to the Father and Many Years',
				trackmp3	:	'',
			}
			
			]
	},
	{
		image			:	'img/recordings/spotlessrose.png',
		title			:	'Spotless Rose',
		conductor		:	'Hymms to the Virgin Mary',
		description		:	'&quot;The more I hear of the American Phoenix Chorale, the more I admire their work. Their English-leaning choral style, impinging on the territory of Polyphony or the Sixteen, feels absolutely right for this repertoire. Their peerlessly blended style makes for persuasive readings.&quot;',
		purchasePrice	:	'20.00',
		tracks			:	[
			
			
			]
	},
	{
		image			:	'img/recordings/alleluia.png',
		title			:	'Alleluia',
		conductor		:	'Sacred Choral Works',
		description		:	'&quot;American music has been the lifeblood of this group since its inception, and it sings American music better than any group I know. Randall Thompson&apos;s anthemic &quot;Alleluia&quot; is a perfect example. There is a special understanding, an ineffable rightness, to the chorale&pos;s singing of this well-known masterpiece that defies logic.&quot;',
		purchasePrice	:	'20.00',
		tracks			:	[
			{
				trackTitle	:	'Parker arr: <span class="trackBold">Hark, I Hear the Harps Eternal</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Ringwald arr: <span class="trackBold">Precious Lord, Take My Hand</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Parker/Shaw arr: <span class="trackBold">Wondrous Love</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Thompson: <span class="trackBold">Alleluia</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Fleming arr: <span class="trackBold">Give Me Jesus</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Parker arr: <span class="trackBold">Come Away to the Skies</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Spalding: <span class="trackBold">I Want to Shake with Indignation</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Anon: <span class="trackBold">I&apos;ve Set My Face for Zion&apos;s Kingdom</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Anon: <span class="trackBold">The Precious Way of God</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Anon: <span class="trackBold">Encouragement</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Parker/Shaw arr: <span class="trackBold">Saints Bound for Heavena</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Mulholland arr: <span class="trackBold">Come, Thou Fount of Every Blessing</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Manz: <span class="trackBold">E&apos;en So, Lord Jesus, Quickly Come</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Mulholland arr: <span class="trackBold">All Hail the Power of Jesus&apos; Name</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Gawthrop: <span class="trackBold">Sing Me to Heaven</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Miller arr : <span class="trackBold">I Wanna Be Ready</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Parker arr: <span class="trackBold">We Will March Thro&apos; the Valley</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Parker arr: <span class="trackBold">I Want Two Wings</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Parker arr: <span class="trackBold">Is There Anybody Here</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Parker/Shaw arr: <span class="trackBold">My God is a Rock</span>',
				trackmp3	:	'',
			}
			
			]
	},
	{
		image			:	'img/recordings/fernhill.png',
		title			:	'Fern Hill',
		conductor		:	'American Choral Music',
		description		:	'Released in 1995, Fern Hill, American Choral Music met with exceptional national reviews. &quot;Listening to this new CD was a sublime pleasure, I was immediately struck by the beauty of the choral tone, at once warm and pure.&quot;',
		purchasePrice	:	'20.00',
		tracks			:	[
			{
				trackTitle	:	'Susa arr: <span class="trackBold">Shenandoah</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Parker arr: <span class="trackBold">Johnny, I Hardly Knew Ye</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Mulholland: <span class="trackBold">A Red, Red Rose</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Ringwald arr: <span class="trackBold">Deep River</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Spencer: <span class="trackBold">At the Round Earth&pos;s Imagined Corners</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Corigliano: <span class="trackBold">L&apos;Invitation au Voyage</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Belmont: <span class="trackBold">The Passionate Shepherd to His Love</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Belmont: <span class="trackBold">The Roadside Fire</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Barber: <span class="trackBold">Reincarnations, Op. 16</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Corigliano: <span class="trackBold">Fern Hill</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Belmont: <span class="trackBold">Johnny Has Gone for a Soldier</span>',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Wilberg arr: <span class="trackBold">I&pos;m Goin&pos; Away</span>',
				trackmp3	:	'',
			}
			
			]
	},
	{
		image			:	'img/recordings/shakespeare.png',
		title			:	'Shakespeare In Song',
		conductor		:	'Phoenix Chorale',
		description		:	'&quot;Where has this fabulous choir been all my life? I’ve heard several outstanding efforts from Robert Shaw protégé Charles Bruffy with his Kansas City Chorale, but I’ve never heard him at the helm of this brilliant Arizona group before. No choral strength you can name eludes them. They easily surpass the last Shakespeare collection I reviewed (many of the same pieces). Chandos’ usual lucid and unaffected notes, full texts and resplendent SACD-hybrid sound conspire with irresistible choral wizardry to make this an absolute must.&quot;',
		purchasePrice	:	'20.00',
		tracks			:	[
			
			
			]
	},
	{
		image			:	'img/recordings/brahms.png',
		title			:	'Brahms',
		conductor		:	'Songs Ring out to the Heavens',
		description		:	'Released in 1995, Fern Hill, American Choral Music met with exceptional national reviews. &quot;Listening to this new CD was a sublime pleasure, I was immediately struck by the beauty of the choral tone, at once warm and pure.&quot;',
		purchasePrice	:	'20.00',
		tracks			:	[
			{
				trackTitle	:	'Four Songs for Women&pos;s Chorus, 2 Horns and Harp Op. 17',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Three Songs, Op. 42',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Four Quartets, Op.92',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Two Motets, Op. 29',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Op. 112, Nos. 1 and 2',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Five Songs, Op. 104',
				trackmp3	:	'',
			},
			{
				trackTitle	:	'Neue Liebeslieder, Walzer, Op. 65, No. 15',
				trackmp3	:	'',
			}
			
			]
	},
]

var homeSlideItems = [
	{
		image	:	'img/concerts/home_banners/autin_2014.jpg',
		url		:	'#/tickets',
		target	:	'_self'
	},
	{
		image	:	'img/concerts/home_banners/grammy_2013.jpg',
		url		:	'#/recordings',
		target	:	'_self'
	},
	{
		image	:	'img/concerts/home_banners/instagram.jpg',
		url		:	'http://instagram.com/kcchorale',
		target	:	'_blank'
	},
	]
	
	

	

	


