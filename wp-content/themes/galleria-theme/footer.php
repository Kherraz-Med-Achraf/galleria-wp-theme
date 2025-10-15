</div> <!-- .site-content -->

<footer class="site-footer fade-in">
  <div class="container footer-inner">
    <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?> — Tous droits réservés.</p>

    <nav class="footer-nav">
      <?php
        wp_nav_menu([
          'theme_location' => 'footer-menu',
          'container' => false,
          'menu_class' => 'footer-list',
          'fallback_cb' => false
        ]);
      ?>
    </nav>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
