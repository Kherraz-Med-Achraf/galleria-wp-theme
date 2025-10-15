<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <header class="site-header fade-in">
    <div class="container header-inner">
      <div class="logo">
        <a href="<?php echo esc_url(home_url('/')); ?>">
          <?php 
            // Logo personnalisé via le Customizer ou un fallback
            if ( has_custom_logo() ) {
              the_custom_logo();
            } else {
              bloginfo('name');
            }
          ?>
        </a>
      </div>

      <nav class="site-nav">
        <?php
          wp_nav_menu([
            'theme_location' => 'main-menu',
            'container' => false,
            'menu_class' => 'nav-list',
            'fallback_cb' => false
          ]);
        ?>
      </nav>
    </div>
  </header>

  <div class="site-content">
