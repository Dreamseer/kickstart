/* globals module */
module.exports = function(grunt) {

	'use strict';

	// project configuration
	grunt.initConfig({

		// package file containing meta data
		pkg: grunt.file.readJSON('package.json'),

		// create meta data
		meta: {
			banner: '/*! <%= pkg.name %> <%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> - ' +
				'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> */'
		},

		// compile Stylus module files to CSS
		stylus: {
			dist: {
				option: {
					compress: false,
					force: true
				},
				files: {
					'./htdocs/css/default.css': './htdocs/css/default.styl'
				}
			}
		},

		// install Bower components
		bower: {
			install: {
				options: {
					targetDir: './htdocs/js/vendor/',
					cleanBowerDir: true
				}
			}
		},

		// lint CSS files
		csslint: {
			options: {
				csslintrc: './.csslintrc'
			},
			files: [
				'./htdocs/css/default.css'
			]
		},

		// lint and hint JS files
		jshint: {
			options: {
				jshintrc: './.jshintrc'
			},
			beforeconcat: [
				'./htdocs/js/modules/*.js'
			],
			afterconcat: [
				'./htdocs/js/default.js'
			]
		},

		// concatenate files
		concat: {
			dist: {
				src: [
					'./htdocs/js/vendor/min.js/dist/$.js',
					'./htdocs/js/modules/*.js'
				],
				dest: './htdocs/js/default.js'
			}
		},

		// minify the main CSS file
		cssmin: {
			dist: {
				options: {
					banner: '<%= meta.banner %>'
				},
				files: {
					'./htdocs/css/default.min.css': [
						'./htdocs/css/default.css'
					]
				}
			}
		},

		// minify the main JavaScript file
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			dist: {
				files: {
					'./htdocs/js/default.min.js': [
						'./htdocs/js/default.js'
					]
				}
			}
		},

		// beautify JavaScript code
		jsbeautifier: {
			options: {
				config: './.jsbeautifyrc'
			},
			dist: {
				src: [
					'./htdocs/js/modules/*.js'
				]
			},
			test: {
				src: [
					'./htdocs/js/default.min.js'
				]
			}
		},

		// minify images
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: './htdocs/assets/img/',
					dest: './htdocs/assets/img/',
					src: ['**/*.{png,jpg,jpeg,gif}']
				}]
			}
		},
		imageoptim: {
			dist: {
				options: {
					imageAlpha: true,
					quitAfter: true
				},
				src: [
					'./htdocs/assets/img/'
				]
			}
		},
		imageEmbed: {
			options: {
				deleteAfterEncoding: false
			},
			dist: {
				src: [
					'./htdocs/css/default.min.css'
				],
				dest: './htdocs/css/default.min.css'
			}
		},

		// create custom Modernizr build
		modernizr: {
			dist: {
				devFile: './htdocs/js/vendor/modernizr/modernizr.js',
				outputFile: './htdocs/js/modernizr.min.js',
				extra: {
					load: false,
					mq: true
				},
				parseFiles: true,
				files: {
					src: [
						'./htdocs/css/default.min.css',
						'./htdocs/js/default.min.js'
					]
				}
			}
		},

		// watch stuff
		watch: {
			options: {
				livereload: true
			},
			dist: {
				files: [
					'./htdocs/css/**.styl',
					'./htdocs/js/modules/*.js',
					'./htdocs/inc/*.php',
					'./htdocs/*.php'
				],
				tasks: [
					'default'
				]
			}
		}

	});

	// add additional tasks
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-modernizr');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-imageoptim');
	grunt.loadNpmTasks('grunt-image-embed');

	// install task
	grunt.registerTask('install', [
		'bower',
		'stylus',
		'concat',
		'uglify',
		'modernizr',
		'jshint',
		'cssmin'
	]);

	// default task
	grunt.registerTask('default', [
		'stylus',
		'concat',
		'uglify',
		'modernizr',
		'jshint',
		'cssmin'
	]);

	// linting task
	grunt.registerTask('lint', [
		'jshint',
		'csslint'
	]);

	// linting task
	grunt.registerTask('beautify', [
		'jsbeautifier:dist'
	]);

	// image optimization task
	grunt.registerTask('images', [
		'imagemin',
		'imageoptim',
		'imageEmbed'
	]);

};