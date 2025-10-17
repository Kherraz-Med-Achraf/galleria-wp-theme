<?php
/**
 * Template Name: Dev - Artwork Gallery
 * Description: Template de développement pour tester la galerie d'artworks
 */
?>
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

    if ($artworks->have_posts()):
        $first_post = true; // Pour charger le premier post dans la modal
        while ($artworks->have_posts()):
            $artworks->the_post();

            // Récupérer tous les champs ACF
            $thumb = get_field('thumbnail');
            $hero_large = get_field('hero_image_large');
            $artist = get_field('artist');
            $artist_image = get_field('artist_image');
            $year = get_field('year');
            $description = get_field('description');
            $source = get_field('source');

            // Sauvegarder les données du premier post pour la modal
            if ($first_post) {
                $first_thumb = $thumb;
                $first_hero = $hero_large;
                $first_title = get_the_title();
                $first_artist = $artist;
                $first_year = $year;
                $first_description = $description;
                $first_source = $source;
                $first_post = false;
                $first_artist_image = $artist_image;
            }
            ?>
        <?php endwhile;
        wp_reset_postdata(); ?>


        <!-- Detail view modal - Pré-remplie avec le premier artwork pour le développement CSS -->
        <div class="artwork-detail active" id="artwork-detail">
            <div class="detail-image-wrapper">
                <img class="artwork-image" src="<?php echo esc_url($first_hero ? $first_hero : $first_thumb); ?>"
                    alt="<?php echo esc_attr($first_title); ?>">
                <div class="title-wrapper">
                    <h2 class="title"><?php echo esc_html($first_title); ?></h2>
                    <p class="artist"><?php echo esc_html($first_artist); ?></p>
                </div>
                <img class="artist-image" src="<?php echo esc_url($first_artist_image); ?>"
                    alt="<?php echo esc_attr($artist); ?>">
            </div>
            <div class="detail-info">
                <span class="year"><?php echo esc_html($first_year); ?></span>
                <div class="detail-description"><?php echo wp_kses_post($first_description); ?></div>
                <?php if ($first_source): ?>
                    <a href="<?php echo esc_url($first_source); ?>" class="detail-source" target="_blank" rel="noopener">
                        GO TO SOURCE
                    </a>
                <?php endif; ?>
            </div>
        </div>


        <!-- Slide Controls -->
        <div class="slide-controls">
            <div class="progress-bar-place"></div>
            <div class="progress-bar"></div>
            <div class="artwork-data">
                <span class="artwork-title"><?php echo esc_html($first_title); ?></span>
                <span class="artwork-artist"><?php echo esc_html($first_artist); ?></span>
            </div>
            <div class="artwork-navigation">
                <button class="artwork-navigation-prev">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/icon-back-button.svg"
                        alt="Previous Artwork">
                </button>
                <button class="artwork-navigation-next">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/icon-next-button.svg"
                        alt="Next Artwork">
                </button>
            </div>
        </div>

    <?php else: ?>
        <p>No artworks found.</p>
    <?php endif; ?>

</main>

<?php get_footer(); ?>