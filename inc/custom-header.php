<?php
/**
 * Sample implementation of the Custom Header feature
 * http://codex.wordpress.org/Custom_Headers
 *
 * You can add an optional custom header image to header.php like so ...

<?php if ( get_header_image() ) : ?>
<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
<img src="<?php header_image(); ?>" width="<?php echo esc_attr( get_custom_header()->width ); ?>" height="<?php echo esc_attr( get_custom_header()->height ); ?>" alt="">
</a>
<?php endif; // End header image check. ?>

 *
 * @package ranker
 */

/**
 * Set up the WordPress core custom header feature.
 *
 * @uses ranker_header_style()
 * @uses ranker_admin_header_style()
 * @uses ranker_admin_header_image()
 */
function ranker_custom_header_setup() {
    add_theme_support( 'custom-header', apply_filters( 'ranker_custom_header_args', array(
        'default-image'          => esc_url(get_template_directory_uri().'/assets/images/header-img.jpeg'),
        'default-text-color'     => '#ffffff',
        'flex-height'            => true,
    ) ) );
    register_default_headers( array(
            'default-image'    => array(
                'url'            => '%s/assets/images/header-img.jpeg',
                'thumbnail_url'    => '%s/assets/images/header-img.jpeg',
                'description'    => __('Default Header Image', 'ranker')
            )
        )
    );
}
add_action( 'after_setup_theme', 'ranker_custom_header_setup' );
 // ranker_header_style