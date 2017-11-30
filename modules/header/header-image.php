<?php if(has_header_image()):?>
    <div class="header-image">
        <?php //if (get_theme_mod('ranker_header_image_style') == 'default' ) : ?>
            <div id="mobile-header-image">
                <img src="<?php header_image(); ?>">
            </div>
        <?php //endif; ?>
    </div>
<?php endif;?>

