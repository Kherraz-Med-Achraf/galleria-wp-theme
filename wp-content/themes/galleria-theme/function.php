<?php
function galleria_enqueue_assets()
{
    // CSS compilé
    wp_enqueue_style('galleria-style', get_template_directory_uri() . '/dist/css/main.css', [], '1.0');

    // GSAP + ton JS
    wp_enqueue_script('gsap', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js', [], null, true);
    wp_enqueue_script('gsap-scrolltrigger', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js', ['gsap'], null, true);
    //smoothscroll
    wp_enqueue_script('smoothscroll', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js', [], null, true);

    wp_enqueue_script('galleria-main', get_template_directory_uri() . '/dist/js/main.js', ['gsap'], '1.0', true);
}
add_action('wp_enqueue_scripts', 'galleria_enqueue_assets');

// Support images, menus...
add_theme_support('post-thumbnails');
add_theme_support('menus');

// Register menus
register_nav_menus([
    'main-menu' => __('Menu principal', 'galleria'),
    'footer-menu' => __('Menu du pied de page', 'galleria'),
]);

?>