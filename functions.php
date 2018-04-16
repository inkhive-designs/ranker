<?php
/**
 * ranker functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package ranker
 */

if ( ! function_exists( 'ranker_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function ranker_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on ranker, use a find and replace
		 * to change 'ranker' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'ranker', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		
        add_image_size('ranker-sq-thumb', 600,600, true );
        add_image_size('ranker-thumb', 540,450, true );
        add_image_size('ranker-pop-thumb',542, 340, true );
		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary-menu' => esc_html__( 'Primary', 'ranker' ),
            'top-menu' => esc_html__( 'Top Menu', 'ranker' ),
            'mobile-menu' => __( 'Mobile Menu', 'ranker' ),

        ) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'ranker_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'ranker_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function ranker_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'ranker_content_width', 640 );
}
add_action( 'after_setup_theme', 'ranker_content_width', 0 );


/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function ranker_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'ranker' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'ranker' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

    register_sidebar( array(
        'name'          => __( 'Footer 1', 'ranker' ),
        'id'            => 'footer-1',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget'  => '</aside>',
        'before_title'  => '<h1 class="widget-title title-font">',
        'after_title'   => '</h1>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer 2', 'ranker' ),
        'id'            => 'footer-2',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget'  => '</aside>',
        'before_title'  => '<h1 class="widget-title title-font">',
        'after_title'   => '</h1>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer 3', 'ranker' ),
        'id'            => 'footer-3',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget'  => '</aside>',
        'before_title'  => '<h1 class="widget-title title-font">',
        'after_title'   => '</h1>',
    ) );
	
	
}
add_action( 'widgets_init', 'ranker_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function ranker_scripts() {
	wp_enqueue_style( 'ranker-style', get_stylesheet_uri() );

    wp_enqueue_style('ranker-title-font', '//fonts.googleapis.com/css?family='.str_replace(" ", "+", get_theme_mod('ranker_title_font', 'Arimo') ).':400,700' );

    wp_enqueue_style('ranker-body-font', '//fonts.googleapis.com/css?family='.str_replace(" ", "+", get_theme_mod('ranker_body_font', 'Roboto Condensed') ).':300,400,700' );

    //enqueue bootstrap and fontawesome css//
    wp_enqueue_style('bootstrap',get_template_directory_uri().'/assets/bootstrap/css/bootstrap.min.css',true);

    wp_enqueue_style('fa',get_template_directory_uri().'/assets/fa/css/fontawesome-all.min.css');

    wp_enqueue_style( 'ranker-main-theme-style', get_template_directory_uri() . '/assets/theme-styles/css/'.get_theme_mod('ranker_skin', 'default').'.css' );

    wp_enqueue_script( 'ranker-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	//custom js
    wp_enqueue_script( 'ranker-custom-js', get_template_directory_uri() . '/assets/js/custom.js', array('jquery-masonry'), false, true );
	
	//big-slide js
	wp_enqueue_script( 'bigslide-js', get_template_directory_uri() . '/js/jquery.big-slide.js');

	//External js
    wp_enqueue_script( 'ranker-external', get_template_directory_uri() . '/js/external.min.js', array('jquery'), '20120206', true );

}
add_action( 'wp_enqueue_scripts', 'ranker_scripts' );

/**
 * Include the Custom Functions of the Theme.
 */
require get_template_directory() . '/framework/theme-functions.php';

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';
/**
 * Implement the Custom CSS Mods.
 */
require get_template_directory() . '/inc/css-mods.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/framework/customizer/_init.php';

