<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">

    <title><?php wp_title('|', true, 'right');
    bloginfo('name'); ?></title>

    <!-- Google Fonts - Libre Baskerville -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <header class="fade-in">
        <div class="logo">
            <a href="<?php echo esc_url(home_url('/')); ?>">
                <?php
                // Logo personnalisé via le Customizer ou un fallback
                if (has_custom_logo()) {
                    the_custom_logo();
                } else {
                    // Fallback sur une image par défaut
                    $fallback_logo = get_template_directory_uri() . '/assets/images/galleria.svg';
                    echo '<img src="' . esc_url($fallback_logo) . '" alt="' . esc_attr(get_bloginfo('name')) . '" class="custom-logo">';
                }
                ?>
            </a>
        </div>

        <button class="btn-slideshow" type="button">
            <div class="btn-slideshow-text">
                START SLIDESHOW
            </div>
        </button>
        <div class="line">

        </div>
    </header>

    <div class="site-content">