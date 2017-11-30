<?php
function ranker_customize_register_layout( $wp_customize )
{
    $wp_customize->add_panel('ranker_layout_panel', array(
        'title' => __('Design & Layout', 'ranker'),
        'priority' => 30,
    ));
//    $wp_customize->add_section('ranker_blog_layout_section', array(
//        'title' => __('Blog Layout', 'ranker'),
//        'priority' => 10,
//        'panel' => 'ranker_layout_panel',
//    ));
//    $wp_customize->add_setting('ranker_blog_layout_setting', array(
//     //   'default' => 'none',
//        'sanitize_callback' => 'ranker_sanitize_blog_layout',
//    ));
//
//    function ranker_sanitize_blog_layout($input)
//    {
//        if (in_array($input, array('grid', 'ranker'))):
//
//        else:
//            return '';
//        endif;
//    }
//
//    $wp_customize->add_control('ranker_blog_layout_setting', array(
//        'settings' => 'ranker_blog_layout_setting',
//        'section' => 'ranker_blog_layout_section',
//        'type' => 'select',
//        'label' => __('Select Layout', 'ranker'),
//        'choices' => array(
//            'grid' => __('Standard Blog Layout', 'ranker'),
//            'ranker' => __('Ranker Theme Layout', 'ranker'),
//        )
//    ));


//    //ranker sidebar
//    $wp_customize -> add_section('ranker_sidebar_section', array(
//            'title' => __('Sidebar Layout','ranker'),
//            'priority' => 20,
//            'panel' => 'ranker_layout_panel',
//    ));
//    $wp_customize -> add_setting('ranker_sidebar_disable_setting', array(
//        'sanitize_calllback'  =>'ranker_sanitize_checkbox',
//    ));
//    $wp_customize -> add_control('ranker_sidebar_disable_setting',array(
//            'settings' =>'ranker_sidebar_disable_setting',
//            'label' => __('Disable Sidebar Everywhere','ranker'),
//            'section' => 'ranker_sidebar_section',
//            'type'  => 'checkbox',
//            'default' => false,
//    ));
//
//    $wp_customize->add_setting(
//        'ranker_disable_sidebar_home_setting',
//        array( 'sanitize_callback' => 'ranker_sanitize_checkbox' )
//    );
//
//    $wp_customize->add_control(
//        'ranker_disable_sidebar_home_setting', array(
//            'settings' => 'ranker_disable_sidebar_home_setting',
//            'label'    => __( 'Disable Sidebar on Home/Blog.','ranker' ),
//            'section'  => 'ranker_sidebar_section',
//            'type'     => 'checkbox',
//            'active_callback' => 'ranker_show_sidebar_options',
//            'default'  => false
//        )
//    );
//
//    $wp_customize->add_setting(
//        'ranker_disable_sidebar_front_setting',
//        array( 'sanitize_callback' => 'ranker_sanitize_checkbox' )
//    );
//
//    $wp_customize->add_control(
//        'ranker_disable_sidebar_front_setting', array(
//            'settings' => 'ranker_disable_sidebar_front_setting',
//            'label'    => __( 'Disable Sidebar on Front Page.','ranker' ),
//            'section'  => 'ranker_sidebar_section',
//            'type'     => 'checkbox',
//            'active_callback' => 'ranker_show_sidebar_options',
//            'default'  => false
//        )
//    );
//
//    //ranker sidebar width
//    $wp_customize -> add_setting('ranker_sidebar_width_setting',array(
//            'default' => 4,
//            'sanitize_callback' => 'ranker_sanitize_positive_number',
//    ));
//    $wp_customize -> add_control('ranker_sidebar_width_setting', array(
//            'settings' => 'ranker_sidebar_width_setting',
//            'label' => __('Sidebar Width','ranker'),
//            'description' => __('Min: 25%, Default: 33%, Max: 40%','ranker'),
//            'section' => 'ranker_sidebar_section',
//            'type' => 'range',
//            'active_callback' => 'ranker_show_sidebar_options',
//            'input_attrs' => array(
//                'min'   => 3,
//                'max'   => 5,
//                'step'  => 1,
//                'class' => 'sidebar-width-range',
//                'style' => 'color: #0a0',
//            )
//    ));
//    /* Active Callback Function */
//    function ranker_show_sidebar_options($control) {
//
//        $option = $control->manager->get_setting('ranker_sidebar_disable_setting');
//        return $option->value() == false ;
//
//    }
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