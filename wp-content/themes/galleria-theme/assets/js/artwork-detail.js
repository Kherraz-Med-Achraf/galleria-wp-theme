// ========== ARTWORK DETAIL FUNCTIONALITY ==========
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  let currentArtworkIndex = -1;
  const artworkCards = Array.from(document.querySelectorAll(".artwork-card"));
  const detailSection = document.getElementById("artwork-detail");
  const slideControls = document.querySelector(".slide-controls");
  const container = document.querySelector(".artworks-list");
  const btnSlideshow = document.querySelector(".btn-slideshow");

  if (!artworkCards.length || !detailSection || !slideControls || !container)
    return;

  // Fonction pour obtenir l'image hero selon la taille d'écran
  function getHeroImage(card) {
    const isMobile = window.innerWidth < 768;
    return isMobile ? card.dataset.heroSmall : card.dataset.heroLarge;
  }

  // Fonction pour remplir les détails
  function fillArtworkDetail(card, index) {
    currentArtworkIndex = index;

    // Récupérer l'image appropriée selon la taille d'écran
    const heroImage = getHeroImage(card);

    // Remplir les données dans artwork-detail
    detailSection.querySelector(".artwork-image").src = heroImage;
    detailSection.querySelector(".title").textContent = card.dataset.title;
    detailSection.querySelector(".artist").textContent = card.dataset.artist;
    detailSection.querySelector(".year").textContent = card.dataset.year;
    detailSection.querySelector(".detail-description").textContent =
      card.dataset.description;
    detailSection.querySelector(".artist-image").src = card.dataset.artistImage;

    // Source link
    const sourceLink = detailSection.querySelector(".detail-source");
    if (card.dataset.source) {
      sourceLink.href = card.dataset.source;
      sourceLink.style.display = "block";
    } else {
      sourceLink.style.display = "none";
    }

    // Remplir les données dans slide-controls
    slideControls.querySelector(".artwork-title").textContent =
      card.dataset.title;
    slideControls.querySelector(".artwork-artist").textContent =
      card.dataset.artist;

    // Mettre à jour la progress bar
    const progressBar = slideControls.querySelector(".progress-bar");
    const progressPercent = ((index + 1) / artworkCards.length) * 100;
    gsap.to(progressBar, {
      width: `${progressPercent}%`,
      duration: 0.5,
      ease: "power2.out",
    });

    // Mettre à jour les boutons de navigation
    updateNavigationButtons();
  }

  // Fonction pour mettre à jour les boutons de navigation
  function updateNavigationButtons() {
    const prevBtn = slideControls.querySelector(".artwork-navigation-prev");
    const nextBtn = slideControls.querySelector(".artwork-navigation-next");

    // Bouton précédent
    if (currentArtworkIndex === 0) {
      prevBtn.disabled = true;
      prevBtn.classList.add("disabled");
    } else {
      prevBtn.disabled = false;
      prevBtn.classList.remove("disabled");
    }

    // Bouton suivant
    if (currentArtworkIndex === artworkCards.length - 1) {
      nextBtn.disabled = true;
      nextBtn.classList.add("disabled");
    } else {
      nextBtn.disabled = false;
      nextBtn.classList.remove("disabled");
    }
  }

  let isLeaving = false;

  //hover effect on artwork card with gsap

  artworkCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (isLeaving) return;
      gsap.to(card, {
        scale: 1.2,
        duration: 0.5,
        ease: "expo.out",
      });
    });
  });
  artworkCards.forEach((card) => {
    card.addEventListener("mouseleave", () => {
      if (isLeaving) return;
      gsap.to(card, {
        scale: 1,
        duration: 0.5,
        ease: "expo.out",
      });
    });
  });

  // Animation d'ouverture du détail
  function openArtworkDetail(card, index) {
    fillArtworkDetail(card, index);

    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Timeline GSAP pour l'animation d'ouverture
    const tl = gsap.timeline();

    // Masquer la grille
    tl.to(artworkCards, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      stagger: {
        each: 0.1,
        from: index,
      },
      ease: "power2.inOut",
      onStart: () => {
        isLeaving = true;
      },
      onComplete: () => {
        container.style.display = "none";
        isLeaving = false;
      },
    });

    // Afficher le détail avec animation
    tl.set(detailSection, { pointerEvents: "auto" });
    tl.fromTo(
      detailSection,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "expo.out" },
      ">"
    );

    // Afficher les contrôles
    tl.fromTo(
      slideControls,
      { y: 100 },
      { y: 0, duration: 0.5, ease: "expo.out" },
      "<"
    );
  }

  // Animation de fermeture du détail
  function closeArtworkDetail() {
    const tl = gsap.timeline();

    // Masquer le détail
    tl.to(detailSection, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        detailSection.style.pointerEvents = "none";
      },
    });

    // Masquer les contrôles
    tl.to(
      slideControls,
      {
        y: 100,
        duration: 0.3,
        ease: "power2.inOut",
      },
      "<"
    );

    tl.to(artworkCards, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: {
        each: 0.1,
      },
      ease: "power2.out",
      onStart: () => {
        isLeaving = true;
        container.style.display = "block";
      },
      onComplete: () => {
        isLeaving = false;
      },
    });
  }

  // Event listeners sur les artwork cards
  artworkCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      openArtworkDetail(card, index);
      btnSlideshow.querySelector(".btn-slideshow-text").textContent =
        "STOP SLIDESHOW";
      isSlideshow = true;
    });
  });

  let isSlideshow = false;

  btnSlideshow.addEventListener("click", () => {
    console.log(isSlideshow);
    if (!isSlideshow) {
      console.log("STOP SLIDESHOW");
      //change text to STOP SLIDESHOW
      btnSlideshow.querySelector(".btn-slideshow-text").textContent =
        "STOP SLIDESHOW";
      openArtworkDetail(artworkCards[0], 0);
      isSlideshow = true;
    } else {
      console.log("START SLIDESHOW");
      isSlideshow = false;
      btnSlideshow.querySelector(".btn-slideshow-text").textContent =
        "START SLIDESHOW";
      closeArtworkDetail();
    }
  });

  // Navigation précédent/suivant
  slideControls
    .querySelector(".artwork-navigation-prev")
    .addEventListener("click", () => {
      if (currentArtworkIndex > 0) {
        const prevCard = artworkCards[currentArtworkIndex - 1];
        fillArtworkDetail(prevCard, currentArtworkIndex - 1);
      }
    });

  slideControls
    .querySelector(".artwork-navigation-next")
    .addEventListener("click", () => {
      if (currentArtworkIndex < artworkCards.length - 1) {
        const nextCard = artworkCards[currentArtworkIndex + 1];
        fillArtworkDetail(nextCard, currentArtworkIndex + 1);
      }
    });

  // Fermer le détail avec la touche Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && detailSection.style.pointerEvents === "auto") {
      closeArtworkDetail();
    }
  });

  // ========== MODE GALERIE PLEIN ÉCRAN ==========
  const galleryModal = document.getElementById("gallery-modal");
  const galleryImage = galleryModal.querySelector(".gallery-image");
  const closeGalleryBtn = galleryModal.querySelector(".close-gallery");

  if (!galleryModal || !galleryImage || !closeGalleryBtn) return;

  // Ouvrir la galerie au clic sur l'image
  detailSection
    .querySelector(".artwork-image")
    .addEventListener("click", () => {
      const currentCard = artworkCards[currentArtworkIndex];
      const galleryImageUrl = currentCard.dataset.galleryImage;

      if (galleryImageUrl) {
        galleryImage.src = galleryImageUrl;

        // Animation d'ouverture de la galerie
        gsap.set(galleryModal, { display: "flex" });
        gsap.fromTo(
          galleryModal,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        );
        gsap.fromTo(
          galleryImage,
          { scale: 0.9 },
          { scale: 1, duration: 0.5, ease: "back.out(1.2)" }
        );
      }
    });

  // Fermer la galerie
  function closeGallery() {
    gsap.to(galleryModal, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        galleryModal.style.display = "none";
      },
    });
  }

  closeGalleryBtn.addEventListener("click", closeGallery);

  // Fermer avec Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && galleryModal.style.display === "flex") {
      closeGallery();
    }
  });

  // Fermer en cliquant sur le fond
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
      closeGallery();
    }
  });

  // Mettre à jour l'image hero lors du redimensionnement
  let resizeHeroTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeHeroTimeout);
    resizeHeroTimeout = setTimeout(() => {
      if (currentArtworkIndex >= 0) {
        const currentCard = artworkCards[currentArtworkIndex];
        const heroImage = getHeroImage(currentCard);
        detailSection.querySelector(".artwork-image").src = heroImage;
      }
    }, 200);
  });
});
