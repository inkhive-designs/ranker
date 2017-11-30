<div id="jumbosearch">
    <span class="fa fa-remove closeicon"></span>
    <div class="col-md-3 col-sm-12 site-title-wrapper">
        <div class="site-branding">
            <div id="site-logo">
                <?php the_custom_logo();?>
            </div>
            <?php if(!has_custom_logo()):?>
                <!--                    --><?php //if ( is_front_page() && is_home()) : ?>
                <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                <!--                    --><?php //else: ?>
                <!--                        <p class="site-title"><a href="--><?php //echo esc_url( home_url( '/' ) ); ?><!--" rel="home">--><?php //bloginfo( 'name' ); ?><!--</a></p>-->
                <?php
//                    endif;
                $description = get_bloginfo( 'description', 'display' );
                if ( $description || is_customize_preview() ) : ?>
                    <p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
                    <?php
                endif;
            endif;?>
        </div><!-- .site-branding -->
    </div>
    <div class="form">
        <?php get_search_form(); ?>
    </div>
</div>