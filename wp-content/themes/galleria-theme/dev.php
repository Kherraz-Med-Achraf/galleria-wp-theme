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

    $all_artworks_data = []; // Pour stocker les données de tous les artworks
    
    if ($artworks->have_posts()):
        while ($artworks->have_posts()):
            $artworks->the_post();

            // Récupérer tous les champs ACF
            $all_artworks_data[] = [
                'title' => get_the_title(),
                'artist' => get_field('artist'),
                'artist_image' => get_field('artist_image'),
                'year' => get_field('year'),
                'description' => get_field('description'),
                'source' => get_field('source'),
                'thumbnail' => get_field('thumbnail'),
                'hero_large' => get_field('hero_image_large'),
                'hero_small' => get_field('hero_image_small'), // Assumed field
                'gallery_image' => get_field('gallery_image'), // Assumed field
            ];
        endwhile;
        wp_reset_postdata();

        if (!empty($all_artworks_data)) {
            $first_artwork = $all_artworks_data[0];
            ?>

            <!-- Detail view modal - Pré-remplie avec le premier artwork pour le développement -->
            <div class="artwork-detail active" id="artwork-detail">
                <div class="detail-image-wrapper">
                    <div class="artwork-image-wrapper">
                        <img class="artwork-image"
                            src="<?php echo esc_url($first_artwork['hero_large'] ?: $first_artwork['thumbnail']); ?>"
                            alt="<?php echo esc_attr($first_artwork['title']); ?>">
                    </div>
                    <div class="title-wrapper">
                        <h2 class="title"><?php echo esc_html($first_artwork['title']); ?></h2>
                        <p class="artist"><?php echo esc_html($first_artwork['artist']); ?></p>
                    </div>
                    <div class="artist-image-wrapper">
                        <img class="artist-image" src="<?php echo esc_url($first_artwork['artist_image']); ?>"
                            alt="<?php echo esc_attr($first_artwork['artist']); ?>">
                    </div>
                    <button class="open-gallery">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/icon-view-image.svg"
                            alt="Open Gallery">
                        <span>VIEW IMAGE</span>
                    </button>
                </div>
                <div class="detail-info">
                    <span class="year"><?php echo esc_html($first_artwork['year']); ?></span>
                    <div class="detail-description"><?php echo wp_kses_post($first_artwork['description']); ?></div>
                    <?php if ($first_artwork['source']): ?>
                        <a href="<?php echo esc_url($first_artwork['source']); ?>" class="detail-source" target="_blank"
                            rel="noopener">
                            GO TO SOURCE
                        </a>
                    <?php endif; ?>
                </div>
            </div>


            <!-- Slide Controls -->
            <div class="slide-controls">
                <div class="progress-bar-place"></div>
                <div class="progress-bar" style="width: <?php echo (1 / count($all_artworks_data)) * 100; ?>%;"></div>
                <div class="artwork-data">
                    <span class="artwork-title"><?php echo esc_html($first_artwork['title']); ?></span>
                    <span class="artwork-artist"><?php echo esc_html($first_artwork['artist']); ?></span>
                </div>
                <div class="artwork-navigation">
                    <button class="artwork-navigation-prev" disabled>
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/icon-back-button.svg"
                            alt="Previous Artwork">
                    </button>
                    <button class="artwork-navigation-next">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/icon-next-button.svg"
                            alt="Next Artwork">
                    </button>
                </div>
            </div>

        <?php } ?>
    <?php else: ?>
        <p>No artworks found.</p>
    <?php endif; ?>

</main>

<?php if (!empty($all_artworks_data)): ?>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            gsap.registerPlugin(SplitText);
            const artworksData = <?php echo json_encode($all_artworks_data); ?>;
            let currentArtworkIndex = 0;

            const detailSection = document.getElementById("artwork-detail");
            const slideControls = document.querySelector(".slide-controls");

            const artworkImage = detailSection.querySelector(".artwork-image");
            const title = detailSection.querySelector(".title");
            const artist = detailSection.querySelector(".artist");
            const year = detailSection.querySelector(".year");
            const description = detailSection.querySelector(".detail-description");
            const artistImage = detailSection.querySelector(".artist-image");
            const sourceLink = detailSection.querySelector(".detail-source");

            const slideTitle = slideControls.querySelector(".artwork-title");
            const slideArtist = slideControls.querySelector(".artwork-artist");
            const progressBar = slideControls.querySelector(".progress-bar");
            const prevBtn = slideControls.querySelector(".artwork-navigation-prev");
            const nextBtn = slideControls.querySelector(".artwork-navigation-next");

            function getHeroImage(artwork) {
                const isMobile = window.innerWidth < 768;
                let imageUrl = artwork.hero_large || artwork.thumbnail;
                if (isMobile && artwork.hero_small) {
                    imageUrl = artwork.hero_small;
                }
                return imageUrl;
            }


            function updateArtworkDetail(index) {
                let titleSplit = new SplitText(title, {
                    type: 'words, lines',
                    wordsClass: 'word',
                    linesClass: 'line',
                });
                let artistSplit = new SplitText(artist, {
                    type: 'words, lines',
                    wordsClass: 'word',
                    linesClass: 'line',
                });
                let yearSplit = new SplitText(year, {
                    type: 'words',
                    wordsClass: 'word',
                });
                let descriptionSplit = new SplitText(description, {
                    type: 'words,lines',
                    wordsClass: 'word',
                    linesClass: 'line',
                });
                let sourceLinkSplit = new SplitText(sourceLink, {
                    type: 'words,lines',
                    wordsClass: 'word',
                    linesClass: 'line',
                });

                const artwork = artworksData[index];

                // --- GSAP Animation Out ---
                const tlOut = gsap.timeline();

                tlOut.to(artworkImage, {
                    yPercent: 100,
                    duration: 1,
                    ease: 'expo.out',
                });
                tlOut.to(titleSplit.words, {
                    y: 80,
                    duration: 1,
                    ease: 'expo.out',
                }, '<');
                tlOut.to(artistSplit.words, {
                    y: 30,
                    duration: 1,
                    ease: 'expo.out',
                }, '<');
                tlOut.to(yearSplit.words, {
                    y: 250,
                    duration: 1,
                    ease: 'expo.out',
                }, '<');
                tlOut.to(descriptionSplit.words, {
                    y: 30,
                    duration: 1,
                    ease: 'expo.out',
                }, '<');
                tlOut.to(artistImage, {
                    yPercent: 100,
                    duration: 1,
                    ease: 'expo.out',
                }, '<');
                tlOut.to(sourceLinkSplit.words, {
                    y: 15,
                    duration: 0.3,
                    ease: 'expo.out',
                }, '<');
                tlOut.add(() => {

                    titleSplit.revert();
                    artistSplit.revert();
                    yearSplit.revert();
                    descriptionSplit.revert();
                    sourceLinkSplit.revert();


                    // --- Change Data ---
                    artworkImage.src = getHeroImage(artwork);
                    artworkImage.alt = artwork.title;
                    title.textContent = artwork.title;
                    artist.textContent = artwork.artist;
                    year.textContent = artwork.year;
                    description.innerHTML = artwork.description;
                    artistImage.src = artwork.artist_image;
                    artistImage.alt = artwork.artist;

                    if (artwork.source) {
                        sourceLink.href = artwork.source;
                        sourceLink.style.display = "block";
                    } else {
                        sourceLink.style.display = "none";
                    }

                    slideTitle.textContent = artwork.title;
                    slideArtist.textContent = artwork.artist;

                    const progressPercent = ((index + 1) / artworksData.length) * 100;
                    progressBar.style.width = `${progressPercent}%`;

                    prevBtn.disabled = index === 0;
                    nextBtn.disabled = index === artworksData.length - 1;

                    prevBtn.classList.toggle('disabled', index === 0);
                    nextBtn.classList.toggle('disabled', index === artworksData.length - 1);

                    let newTitleSplit = new SplitText(title, {
                        type: 'words, lines',
                        wordsClass: 'word',
                        linesClass: 'line',
                    });
                    let newArtistSplit = new SplitText(artist, {
                        type: 'words, lines',
                        wordsClass: 'word',
                        linesClass: 'line',
                    });
                    let newYearSplit = new SplitText(year, {
                        type: 'words',
                        wordsClass: 'word',
                    });
                    let newDescriptionSplit = new SplitText(description, {
                        type: 'words,lines',
                        wordsClass: 'word',
                        linesClass: 'line',
                    });
                    let newSourceLinkSplit = sourceLink.style.display !== 'none' ? new SplitText(sourceLink, {
                        type: 'words,lines',
                        wordsClass: 'word',
                        linesClass: 'line',
                    }) : null;

                    // --- GSAP Animation In ---
                    const tlIn = gsap.timeline();

                    // Set initial state for the "in" animation (elements are off-screen below)
                    gsap.set(artworkImage, { yPercent: 100 });
                    gsap.set(newTitleSplit.words, { y: 80 });
                    gsap.set(newArtistSplit.words, { y: 30 });
                    gsap.set(newYearSplit.words, { y: 250 });
                    gsap.set(newDescriptionSplit.words, { y: 30 });
                    gsap.set(artistImage, { yPercent: 100 });
                    if (newSourceLinkSplit) {
                        gsap.set(newSourceLinkSplit.words, { y: 15 });
                    }

                    //scroll to the top of the page
                    window.scrollTo(0, 0);

                    tlIn.to(artworkImage, {
                        yPercent: 0,
                        duration: 0.5,
                        ease: 'expo.out',
                    });
                    // tlIn.to(newTitleSplit.lines, {
                    //     y: 0,
                    //     stagger: 0.5,
                    //     duration: 1,
                    //     ease: 'expo.out',
                    // }, '<');
                    tlIn.add(() => {
                        newTitleSplit.lines.forEach((line, i) => {
                            const words = line.querySelectorAll(".word");
                            gsap.to(words, {
                                y: 0,
                                duration: 1,
                                ease: "expo.out",
                                delay: i * 0.15,
                            });
                        });
                    }, '<');
                    tlIn.to(newArtistSplit.words, {
                        y: 0,
                        stagger: 0.,
                        duration: 1,
                        ease: 'expo.out',
                    }, '<');
                    tlIn.to(newYearSplit.words, {
                        y: 0,
                        duration: 1,
                        ease: 'expo.out',
                    }, '<');
                    tlIn.to(newDescriptionSplit.words, {
                        y: 0,
                        stagger: 0,
                        duration: 1,
                        ease: 'expo.out',
                    }, '<');
                    tlIn.to(artistImage, {
                        yPercent: 0,
                        duration: 1,
                        ease: 'expo.out',
                    }, '<');
                    if (newSourceLinkSplit) {
                        tlIn.to(newSourceLinkSplit.words, {
                            y: 0,
                            duration: 1,
                            ease: 'expo.out',
                        }, '<');
                    }
                });

            }

            prevBtn.addEventListener("click", () => {
                if (currentArtworkIndex > 0) {
                    currentArtworkIndex--;
                    updateArtworkDetail(currentArtworkIndex);
                }
            });

            nextBtn.addEventListener("click", () => {
                if (currentArtworkIndex < artworksData.length - 1) {
                    currentArtworkIndex++;
                    updateArtworkDetail(currentArtworkIndex);
                }
            });

            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    updateArtworkDetail(currentArtworkIndex);
                }, 200);
            });
        });
    </script>
<?php endif; ?>

<?php get_footer(); ?>