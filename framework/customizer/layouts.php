<?php
function ranker_customize_register_layout( $wp_customize )
{
    $wp_customize->add_panel('ranker_layout_panel', array(
        'title' => __('Design & Layout', 'ranker'),
        'priority' => 30,
    ));
    //Custom Footer Text
    $wp_customize-> add_section(
        'ranker_custom_footer',
        array(
            'title'			=> __('Custom Footer Text','ranker'),
            'description'	=> __('Enter your Own Copyright Text.','ranker'),
            'priority'		=> 30,
            'panel'			=> 'ranker_layout_panel'
        )
    );

    $wp_customize->add_setting(
        'ranker_footer_text',
        array(
            'default'		=> '',
            'sanitize_callback'	=> 'sanitize_text_field'
        )
    );

    $wp_customize->add_control(
        'ranker_footer_text',
        array(
            'section' => 'ranker_custom_footer',
            'settings' => 'ranker_footer_text',
            'type' => 'text'
        )
    );
}
add_action('customize_register','ranker_customize_register_layout');