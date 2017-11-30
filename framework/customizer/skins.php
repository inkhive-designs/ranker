<?php
function ranker_customize_register_skins($wp_customize){
    $wp_customize->get_section('colors')->title = __('Theme Skins & Colors','ranker');
    $wp_customize->get_section('colors')->panel = 'ranker_layout_panel';
    $wp_customize->get_control('header_textcolor')->label = __('Site Title Color','ranker');

    $wp_customize->add_setting('ranker_header_desccolor', array(
        'default'     => '#FFFFFF',
        'sanitize_callback' => 'sanitize_hex_color',
    ));

    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize,
            'ranker_header_desccolor', array(
            'label' => __('Site Tagline Color','ranker'),
            'section' => 'colors',
            'settings' => 'ranker_header_desccolor',
            'type' => 'color'
        ) )
    );
    //Ranker Skins

    $wp_customize -> add_setting('ranker_skin',array(
            'default' => 'default',
            'sanitize_callback' => 'ranker_sanitize_skin',
    ));

    $skins = array(
            'default' => __('Default(Ranker)','ranker'),
            'yellow' => __('Yellow','ranker'),
    );

    $wp_customize -> add_control('ranker_skin',array(
            'settings' => 'ranker_skin',
            'section' => 'colors',
            'label' => __('Choose Skins','ranker'),
            'type' => 'select',
            'choices' => $skins,
    ));

    function ranker_sanitize_skin($input){
        if( in_array($input, array('default','yellow') )):
            return $input;
        else:
            return '';
            endif;
    }
}
add_action('customize_register','ranker_customize_register_skins');