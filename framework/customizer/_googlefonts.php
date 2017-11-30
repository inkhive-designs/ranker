<?php
function ranker_customize_register_fonts( $wp_customize ) {
    //Fonts
    $wp_customize->add_section(
        'ranker_typo_options',
        array(
            'title'     => __('Google Web Fonts','ranker'),
            'priority'  => 40,
            'panel'     => 'ranker_layout_panel',
        )
    );

    $font_array = array('Arvo','Source Sans Pro','Open Sans','Droid Sans','Droid Serif','Roboto','Arimo','Roboto Condensed','Lato','Bree Serif','Oswald','Slabo','Lora');
    $fonts = array_combine($font_array, $font_array);

    $wp_customize->add_setting(
        'ranker_title_font',
        array(
            'default'=> 'Roboto Condensed',
            'sanitize_callback' => 'ranker_sanitize_gfont'
        )
    );

    function ranker_sanitize_gfont( $input ) {
        if ( in_array($input, array('Arvo','Source Sans Pro','Open Sans','Droid Sans','Arimo','Droid Serif','Roboto','Roboto Condensed','Lato','Bree Serif','Oswald','Slabo','Lora',) ) )
            return $input;
        else
            return '';
    }

    $wp_customize->add_control(
        'ranker_title_font',array(
            'label' => __('Title','ranker'),
            'settings' => 'ranker_title_font',
            'section'  => 'ranker_typo_options',
            'type' => 'select',
            'choices' => $fonts,
        )
    );

    $wp_customize->add_setting(
        'ranker_body_font',
        array(	'default'=> 'Verdana',
            'sanitize_callback' => 'ranker_sanitize_gfont' )
    );

    $wp_customize->add_control(
        'ranker_body_font',array(
            'label' => __('Body','ranker'),
            'settings' => 'ranker_body_font',
            'section'  => 'ranker_typo_options',
            'type' => 'select',
            'choices' => $fonts
        )
    );
}
add_action('customize_register', 'ranker_customize_register_fonts');