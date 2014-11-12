module.exports = function(grunt) {
  
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
	        	dist :{
	           src	:	[ 'src/js/vendor/jquery/*.js', 'src/js/vendor/modernizr/*.js'],
	           dest	:	'build/js/production.js'
	        }
        },
        uglify: {
        	options: {
        		banner: '/*! <%= pkg.name %> Production Javascript <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        	},
            build: {
                src: 'build/js/production.js',
                dest: 'build/js/production.min.js'
            }
        },
        cssmin: {
        	  add_banner: {
        	    options: {
        	      banner: '/*! <%= pkg.name %> Production CSS <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        	    },
        	    files: {
        	      'build/css/production.css': ['src/css/*.css']
        	    }
        	  }
        	},
        copy: {
        	  main: {
        	    files: [
        	      {expand: true, src: ['src/nodeapp.js'], dest: 'build/', flatten:true},
        	      {expand: true, src: ['src/app.js'], dest: 'build/', flatten:true},
        	      {expand: true, src: ['src/index.html'], dest: 'build/', flatten:true},
        	      {expand: true, src: ['src/investors.html'], dest: 'build/', flatten:true},
        	      {expand: true, src: ['src/package.json'], dest: 'build/', flatten:true},
        	      {expand: true, src: ['src/data/*'], dest: 'build/data', flatten:true},
        	      {expand: true, src: ['src/routes/*'], dest: 'build/routes', flatten:true},
        	      {expand: true, src: ['src/templates/*'], dest: 'build/templates', flatten:true},
        	      {expand: true, src: ['src/js/contact.js'], dest: 'build/js/contact.js', flatten:true},
        	      {expand: true, src: ['src/js/vendor/auth0/*'], dest: 'build/js/vendor/auth0', flatten:true},
        	      {expand: true, src: ['src/js/vendor/leaflet/*'], dest: 'build/js/vendor/leaflet', flatten:true},
        	      {expand: true, src: ['src/js/vendor/angular-file-upload-html5-shim.min.js'], dest: 'build/js/vendor/angular-file-upload-html5-shim.min.js', flatten:true},
        	      {expand: true, src: ['src/js/vendor/angular-file-upload.min.js'], dest: 'build/js/vendor/angular-file-upload.min.js', flatten:true},
        	      {expand: true, src: ['src/js/vendor/angular-route.min.js'], dest: 'build/js/vendor/angular-route.min.js', flatten:true}
        	    ],
        	  },
        	},

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'copy']);
};