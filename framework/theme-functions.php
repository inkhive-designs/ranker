<?php
/*
** Function to Get Theme Layout
*/
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



//pagination
/*
 * Pagination Function. Implements core paginate_links function.
 */
function ranker_pagination() {
    global $wp_query;
    $big = 12345678;
    $page_format = paginate_links( array(
        'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
        'format' => '?paged=%#%',
        'current' => max( 1, get_query_var('paged') ),
        'total' => $wp_query->max_num_pages,
        'type'  => 'array'
    ) );
    if( is_array($page_format) ) {
        $paged = ( get_query_var('paged') == 0 ) ? 1 : get_query_var('paged');
        echo '<div class="pagination"><div><ul>';
        echo '<li><span>'. $paged . ' of ' . $wp_query->max_num_pages .'</span></li>';
        foreach ( $page_format as $page ) {
            echo "<li>$page</li>";
        }
        echo '</ul></div></div>';
    }
}