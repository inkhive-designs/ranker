<div class="menu-bar">
    <div class="container">
        <div class="col-md-8 col-sm-12 primary-menu-wrapper">
            <nav id="site-navigation" class="main-navigation primary-menu">
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Top Menu', 'ranker' ); ?></button>
                <?php wp_nav_menu(array(
                    'theme-location' => 'primary-menu',
                    'menu-id'        => 'primary-menu'
                ))?>
            </nav>
        </div>
        <div class="col-md-4 col-sm-12 social-wrapper">
            <?php echo get_template_part('modules/social/social','icons'); ?>
        </div>
    </div>
</div>
