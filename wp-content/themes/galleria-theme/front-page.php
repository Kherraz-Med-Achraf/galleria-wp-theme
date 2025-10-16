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

                <article class="artwork-card fade-in" data-id="<?php the_ID(); ?>">
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

    <?php else: ?>
        <p>No artworks found.</p>
    <?php endif; ?>

</main>

<?php get_footer(); ?>