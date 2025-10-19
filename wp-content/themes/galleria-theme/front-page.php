<?php get_header(); ?>

<main class="site-main artworks-grid container">
    <?php
    // Custom query : récupérer tous les artworks
    $artworks = new WP_Query([
        'post_type' => 'artwork',
        'posts_per_page' => -1,
        'orderby' => 'date',
        'order' => 'ASC'
    ]);

    if ($artworks->have_posts()): ?>
        <div class="artworks-list">
            <?php while ($artworks->have_posts()):
                $artworks->the_post(); ?>

                <article class="artwork-card fade-in"
                 data-id="<?php the_ID(); ?>"
                 data-title="<?php the_title(); ?>"
                 data-artist="<?php the_field('artist'); ?>"
                 data-year="<?php the_field('year'); ?>"
                 data-description="<?php echo esc_attr(strip_tags(get_field('description'))); ?>"
                 data-image="<?php echo esc_url(get_field('hero_image_large')); ?>"
                 data-source="<?php echo esc_url(get_field('source')); ?>"
                 data-hero-large="<?php echo esc_url(get_field('hero_image_large')); ?>"
                 data-hero-small="<?php echo esc_url(get_field('hero_image_small')); ?>"
                 data-gallery-image="<?php echo esc_url(get_field('gallery_image')); ?>"
                 data-artist-image="<?php echo esc_url(get_field('artist_image')); ?>"
                 >
                 
                    <div class="artwork-thumb">
                        <?php
                        $thumb = get_field('thumbnail');
                        if ($thumb):
                            echo '<img src="' . esc_url($thumb) . '" alt="' . esc_attr(get_the_title()) . '">';
                        endif;
                        ?>
                    </div>
                    <div class="artwork-info">
                        <h2 class="artwork-title"><?php the_title(); ?></h2>
                        <p class="artwork-meta">
                            <?php the_field('artist'); ?>, <?php the_field('year'); ?>
                        </p>
                    </div>
                </article>

            <?php endwhile;
            wp_reset_postdata(); ?>
        </div>

        <?php get_template_part('template-parts/artwork-detail'); ?>

    <?php else: ?>
        <p>No artworks found.</p>
    <?php endif; ?>

</main>

<?php get_footer(); ?>