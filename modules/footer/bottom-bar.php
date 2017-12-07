<div class="bottom-bar">
    <div class="container">
        <div class="col-md-12 col-sm-12 site-title-wrapper">
            <div class="site-branding">
                <div id="site-logo">
                    <?php the_custom_logo();?>
                </div>
                <?php if(!has_custom_logo()):?>
                        <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                        <?php
                    $description = get_bloginfo( 'description', 'display' );
                    if ( $description || is_customize_preview() ) : ?>
                        <p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
                        <?php
                    endif;
                endif;?>
            </div><!-- .site-branding -->
        </div>
        </div>
    <div id="stripes4" class="pattern">
    </div>
</div>