<!-- Detail view modal - Sera remplie dynamiquement lors du clic sur une artwork -->
<div class="artwork-detail" id="artwork-detail">
    <div class="detail-image-wrapper">
        <img class="artwork-image" src="" alt="" title="Cliquez pour voir en plein écran">
        <div class="title-wrapper">
            <h2 class="title"></h2>
            <p class="artist"></p>
        </div>
        <img class="artist-image" src="" alt="">
    </div>
    <div class="detail-info">
        <span class="year"></span>
        <div class="detail-description"></div>
        <a href="" class="detail-source" target="_blank" rel="noopener" style="display: none;">
            GO TO SOURCE
        </a>
    </div>
</div>

<!-- Gallery Modal - Plein écran -->
<div class="gallery-modal" id="gallery-modal">
    <button class="close-gallery" aria-label="Fermer la galerie">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
    </button>
    <img class="gallery-image" src="" alt="">
</div>

<!-- Slide Controls -->
<div class="slide-controls">
    <div class="progress-bar-place"></div>
    <div class="progress-bar"></div>
    <div class="artwork-data">
        <span class="artwork-title"></span>
        <span class="artwork-artist"></span>
    </div>
    <div class="artwork-navigation">
        <button class="artwork-navigation-prev" disabled>
            <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/icon-back-button.svg"
                alt="Previous Artwork">
        </button>
        <button class="artwork-navigation-next">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/icon-next-button.svg" alt="Next Artwork">
        </button>
    </div>
</div>