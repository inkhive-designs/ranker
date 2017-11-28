<div class="top-bar">
    <div class="container">
        <div class="col-md-2 col-sm-12 site-title-wrapper">
            <div class="site-branding">
                <div id="site-logo">
                    <?php the_custom_logo();?>
                </div>
                <?php if(!has_custom_logo()):?>
                    <?php if ( is_front_page() && is_home()) : ?>
                        <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                    <?php else: ?>
                        <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
                        <?php
                    endif;
                    $description = get_bloginfo( 'description', 'display' );
                    if ( $description || is_customize_preview() ) : ?>
                        <p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
                        <?php
                    endif;
                endif;?>
            </div><!-- .site-branding -->
        </div>
        <div class="col-md-8 col-sm-12 top-menu-wrapper">
            <nav id="site-navigation" class="main-navigation top-menu">
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'ranker' ); ?></button>
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'top-menu',
                    'menu_id'        => 'top-menu',
                ) );
                ?>
            </nav><!-- #site-navigation -->
        </div>
        <div class="col-md-2 col-sm-12 search-icon-wrapper">
            <div class="search-icon">
                <i class="fa fa-search"></i>
            </div>
        </div>
    </div>
</div>