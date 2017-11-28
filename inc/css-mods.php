<?php
/**
 * Created by PhpStorm.
 * User: Gourav
 * Date: 11/24/2017
 * Time: 3:17 PM
 */
function ranker_custom_css_mods(){
    $custom_css = "";
    if ( get_theme_mod('ranker_title_font') ) :
        $custom_css .= ".title-font, h1, h2, .section-title, .woocommerce ul.products li.product h3 { font-family: ".esc_html( get_theme_mod('ranker_title_font','Roboto Condensed') )."; }";
    endif;

    if ( get_theme_mod('ranker_body_font') ) :
        $custom_css .= "body, h2.site-description { font-family: ".esc_html( get_theme_mod('ranker_body_font','Arimo') )."; }";
    endif;
    wp_add_inline_style( 'ranker-main', wp_strip_all_tags($custom_css) );

}

add_action('wp_enqueue_scripts', 'ranker_custom_css_mods');