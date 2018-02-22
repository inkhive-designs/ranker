<div class="top-bar">
    <div class="container">
        <div class="site-title-wrapper">
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

        <div class="top-menu-wrapper">
            <nav id="site-navigation" class="main-navigation top-menu">
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'ranker' ); ?></button>
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'top-menu',
                    'menu_id'        => 'top-menu',
                ) );
                ?>
            </nav><!-- #site-navigation -->
            <div class="mobilemenu">
            <a href="#mobile-navigation" class="menu-link">&#9776;</a>
            <nav id="menu" class="panel col title-font" role="navigation">
                <?php
                //Display the Mobile Menu.
                wp_nav_menu( array( 'theme_location' => 'mobile-menu',
                    'menu-id'        => 'mobile-menu') ); ?>
            </nav><!-- #site-navigation -->
            </div>
            <div class="search-icon">
                <span id="searchicon" class="fa fa-search"></span>
            </div>
        </div>

    </div>
</div>