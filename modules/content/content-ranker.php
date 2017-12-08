<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ranker
 */

?>
<article id="post-<?php the_ID(); ?>" <?php post_class('ranker');?>>
    <div class="ranker-wrapper">
    <div class="col-md-6 col-sm-6">
        <?php if (has_post_thumbnail()) : ?>
            <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>"><?php the_post_thumbnail('ranker-pop-thumb'); ?></a>
        <?php else: ?>
            <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>"><img src="<?php echo get_template_directory_uri()."/assets/images/placeholder2.jpg"; ?>" alt="<?php echo the_title() ?>"></a>
        <?php endif; ?>
    </div>
    <div class="col-md-6 col-sm-6">
        <div class="out-thumb">
            <a class="post-ttl" href="<?php the_permalink() ?>"><h2 class="entry-title"> <?php the_title() ?></h2></a>
            <?php
            $categories = get_the_category();
            if ( ! empty( $categories ) ) {?>
                <div class="cat">
                   <?php
                        echo esc_html( $categories[0]->name );
                    }
                    ?>
                </div>

            <p class="entry-excerpt"><?php echo substr(get_the_excerpt(),0,150).(get_the_excerpt() ? "..." : "" ); ?></p>
        </div>
    </div>
    </div>
</article>


