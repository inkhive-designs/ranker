<?php
for( $i=1; $i < 7; $i++):
    $social = esc_attr(get_theme_mod('ranker_social_'.$i));
    if ( ($social != 'none') && ($social != '') ) : ?>
<a class="common" href="<?php echo esc_url( get_theme_mod('ranker_social_url'.$i) ); ?>"><i class="fab fa-<?php echo $social; ?>"></i></a>
<?php
    endif;
endfor;