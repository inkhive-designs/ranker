<?php
/*
** Function to Get Theme Layout
*/
function ranker_get_blog_layout(){
    $ldir = 'framework/layouts/content';
    var_dump(get_theme_mod('ranker_blog_layout_setting'));
    if(get_theme_mod('ranker_blog_layout_setting')):
        get_template_part($ldir, get_theme_mod('ranker_blog_layout_setting'));
    else:
        get_template_part($ldir,'grid');
        endif;
}
add_action('ranker_blog_layout','ranker_get_blog_layout');

/*
** Function to check if Sidebar is enabled on Current Page
*/
 function ranker_load_sidebar(){
     $load_sidebar = true;
     if(get_theme_mod('ranker_sidebar_disable_setting')):
         $load_sidebar = false;
     elseif( get_theme_mod('ranker_disable_sidebar_home_setting') && is_home() )	:
         $load_sidebar = false;
     elseif( get_theme_mod('ranker_disable_sidebar_front_setting') && is_front_page() ) :
         $load_sidebar = false;
         endif;
         echo $load_sidebar;
 }


/*
** Function to Set Main Class
*/

function ranker_get_main_class(){
    $layout = get_theme_mod('ranker_blog_layout_setting');
    if(strpos($layout,'ranker') != false):
        echo "ranker-main";
    endif;
}
add_action('ranker_main-class','ranker_get_main_class');

/*
 ** Determine Sidebar and Primary Width
 */

function ranker_primary_class(){
    $sw = get_theme_mod('ranker_sidebar_width_setting',4);
    $class = "col-md-".(12-$sw);
        if(!ranker_load_sidebar())
            $class = "col-md-12";
        echo "$class";
}
add_action('ranker_primary_width','ranker_primary_class');

/*
 **
 */
function ranker_secondary_class() {
    $sw = get_theme_mod('ranker_sidebar_width_setting',4);
    $class = "col-md-".$sw;

    echo $class;
}
add_action('ranker_secondary-width', 'ranker_secondary_class');