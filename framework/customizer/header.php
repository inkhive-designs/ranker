<?php
function ranker_customize_register_header( $wp_customize ) {
    //Header Sections
    $wp_customize->add_panel(
        'ranker_header_panel',
        array(
            'title'     => __('Header Settings','ranker'),
            'priority'  => 30,
        )
    );

    $wp_customize->get_section('title_tagline')->panel = 'ranker_header_panel';

    $wp_customize->add_section(
        'ranker_header_options',
        array(
            'title'     => __('Header Image on Phones','ranker'),
            'priority'  => 90,
            'panel' => 'ranker_header_panel',
        )
    );

    $wp_customize->add_setting(
        'ranker_header_image_style',
        array(
            'default'=> 'default',
            'sanitize_callback' => 'ranker_sanitize_hil'
        )
    );

    $wp_customize->add_control(
        'ranker_header_image_style',array(
            'label' => __('Choose Image Layout','ranker'),
            'description' => __('By Default The Header Image Scales responsively on mobile phones and works as a background image. If you want your full header image to appear, choose full-image in the setting below. For More Control over header image, consider ranker Pro Version.	','ranker'),
            'settings' => 'ranker_header_image_style',
            'section'  => 'ranker_header_options',
            'type' => 'select',
            'choices' => array(
                'default' => __('Default','ranker'),
                'full-image' => __('Full Image','ranker'),
            ),
        )
    );

    $wp_customize->get_section('header_image')->panel = 'ranker_header_panel';

    function ranker_sanitize_hil($input) {
        if ( in_array($input, array('default','full-image') ) )
            return $input;
        else
            return '';
    }
}
add_action('customize_register','ranker_customize_register_header');	