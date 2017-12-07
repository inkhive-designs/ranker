<?php
//social-icons
function ranker_customize_register_social( $wp_customize ){
    $wp_customize -> add_panel('ranker_header_panel',array(
            'title' => __('Header Settings' , 'ranker'),
            'priority' => 20,
    ));
    $wp_customize -> add_section('ranker_social_section', array(
            'title' => __('Social Icons','ranker'),
            'priority' => 20,
            'panel' => 'ranker_header_panel'
    ));

    $social_networks = array(
            'none' => __('-' ,'ranker'),
            'facebook' => __('Facebook' ,'ranker'),
            'twitter' => __('Twitter' ,'ranker'),
            'google-plus' => __('Google Plus' ,'ranker'),
            'instagram' => __('instagram' ,'ranker'),
            'rss' => __('RSS Feeds' ,'ranker'),
            'vine' => __('Vine' ,'ranker'),
            'vimeo-square' => __('Vimeo' ,'ranker'),
            'youtube' => __('Youtube' ,'ranker'),
            'flickr' => __('Flickr' ,'ranker'),
            'pinterest' => __('Pinterest' ,'ranker'),
    );
    $social_count = count($social_networks);
    
    for( $x=1; $x <= ($social_count - 4); $x++):
        
        $wp_customize -> add_setting('ranker_social_'.$x, array(
                'default' => 'none',
                'sanitize_callback' => 'ranker_sanitize_social',
        ));
        $wp_customize -> add_control('ranker_social_'.$x, array(
                'settings' => 'ranker_social_'.$x,
                'section' => 'ranker_social_section',
                'label'     => __('Icon ', 'ranker').$x,
                'type'      => 'select',
                'choices'    => $social_networks,
        ));

        $wp_customize -> add_setting('ranker_social_url'.$x, array(
                'sanitize_callback' => 'esc_url_raw'
        ));

        $wp_customize -> add_control('ranker_social_url'.$x, array(
                'settings' => 'ranker_social_url'.$x,
                'section' => 'ranker_social_section',
                'description' => __('Icon ' , 'ranker').$x.__(' Url', 'ranker'),
                'type'  =>  'url',
                'choices' => $social_networks,
        ));
    endfor;

    //sanitization function
        function ranker_sanitize_social($input){
            $social_networks = array(
                'none' ,
                'facebook',
                'twitter',
                'google-plus',
                'instagram',
                'rss',
                'vine',
                'vimeo-square',
                'youtube',
                'flickr',
                'pinterest');

            if(in_array($input,$social_networks)):
                return $input;
            else:
                return '';
                endif;
        }
}
add_action('customize_register','ranker_customize_register_social');