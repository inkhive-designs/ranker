<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ranker
 */

?>

	</div><!-- #content -->
<?php get_sidebar('footer'); ?>
	<footer id="colophon" class="site-footer">
		<div class="site-info container">
			<a href="<?php echo esc_url( __( 'https://inkhive.com/', 'ranker' ) ); ?>"><?php
				/* translators: %s: CMS name, i.e. WordPress. */
				printf( esc_html__( 'Proudly powered by %s', 'ranker' ), 'Inkhive' );
			?></a>
			<span class="sep"> | </span>
			<?php
				/* translators: 1: Theme name, 2: Theme author. */
				printf( esc_html__( 'Theme: %1$s by %2$s.', 'ranker' ), 'ranker', '<a href="http://inkhive.com/">inkhive.com 2017 All Rights Reserved</a>' );
			?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
