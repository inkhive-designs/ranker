<?php

for( $i=1; $i < 8; $i++):
    //var_dump(get_theme('ranker_social_'.$i));
    $social = esc_attr(get_theme_mod('ranker_social_'.$i));
    if ( ($social != 'none') && ($social != '') ) : ?>
<a class="common" href="<?php echo esc_url( get_theme_mod('ranker_social_url'.$i) ); ?>"><i class="fa fa-<?php echo $social; ?>"></i></a>
<?php
    endif;
endfor;