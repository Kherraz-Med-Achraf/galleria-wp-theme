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

  // Fonction pour remplir les détails (sans animation - utilisée pour l'ouverture initiale)
  function fillArtworkDetailInitial(card, index) {
    currentArtworkIndex = index;

    // Récupérer l'image appropriée selon la taille d'écran
    const heroImage = getHeroImage(card);

    // Remplir les données dans artwork-detail
    detailSection.querySelector(".artwork-image").src = heroImage;
    detailSection.querySelector(".title").textContent = card.dataset.title;
    detailSection.querySelector(".artist").textContent = card.dataset.artist;
    detailSection.querySelector(".year").textContent = card.dataset.year;
    detailSection.querySelector(".detail-description").innerHTML =
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

  // Fonction pour remplir les détails avec animation de transition
  function fillArtworkDetail(card, index) {
    currentArtworkIndex = index;

    const artworkImage = detailSection.querySelector(".artwork-image");
    const title = detailSection.querySelector(".title");
    const artist = detailSection.querySelector(".artist");
    const year = detailSection.querySelector(".year");
    const description = detailSection.querySelector(".detail-description");
    const artistImage = detailSection.querySelector(".artist-image");
    const sourceLink = detailSection.querySelector(".detail-source");
    const openGalleryBtn = detailSection.querySelector(".open-gallery-wrapper");

    const slideTitle = slideControls.querySelector(".artwork-title");
    const slideArtist = slideControls.querySelector(".artwork-artist");
    const progressBar = slideControls.querySelector(".progress-bar");

    // Créer les SplitText pour l'animation out
    let titleSplit = new SplitText(title, {
      type: "words, lines",
      wordsClass: "word",
      linesClass: "line",
    });
    let artistSplit = new SplitText(artist, {
      type: "words, lines",
      wordsClass: "word",
      linesClass: "line",
    });
    let yearSplit = new SplitText(year, {
      type: "words",
      wordsClass: "word",
    });
    let descriptionSplit = new SplitText(description, {
      type: "words,lines",
      wordsClass: "word",
      linesClass: "line",
    });
    let sourceLinkSplit = new SplitText(sourceLink, {
      type: "words,lines",
      wordsClass: "word",
      linesClass: "line",
    });
    let slideTitleSplit = new SplitText(slideTitle, {
      type: "words, lines",
      wordsClass: "word",
      linesClass: "line",
    });
    let slideArtistSplit = new SplitText(slideArtist, {
      type: "words, lines",
      wordsClass: "word",
      linesClass: "line",
    });

    // --- GSAP Animation Out ---
    const tlOut = gsap.timeline();

    tlOut.to(artworkImage, {
      yPercent: 100,
      duration: 1,
      ease: "expo.out",
    });
    tlOut.to(
      titleSplit.words,
      {
        y: 80,
        duration: 1,
        ease: "expo.out",
      },
      "<"
    );
    tlOut.to(
      artistSplit.words,
      {
        y: 30,
        duration: 1,
        ease: "expo.out",
      },
      "<"
    );
    tlOut.to(
      yearSplit.words,
      {
        y: 250,
        duration: 1,
        ease: "expo.out",
      },
      "<"
    );
    tlOut.to(
      descriptionSplit.words,
      {
        y: 30,
        duration: 1,
        ease: "expo.out",
      },
      "<"
    );
    tlOut.to(
      artistImage,
      {
        yPercent: 100,
        duration: 1,
        ease: "expo.out",
      },
      "<"
    );
    tlOut.to(
      openGalleryBtn,
      {
        y: 40,
        duration: 1,
        ease: "expo.out",
      },
      "<"
    );
    tlOut.to(
      sourceLinkSplit.words,
      {
        y: 15,
        duration: 0.3,
        ease: "expo.out",
      },
      "<"
    );
    tlOut.to(
      slideTitleSplit.words,
      {
        y: 80,
        duration: 1,
        ease: "expo.out",
      },
      "<"
    );
    tlOut.to(
      slideArtistSplit.words,
      {
        y: 30,
        duration: 1,
        ease: "expo.out",
      },
      "<"
    );
    tlOut.add(() => {
      titleSplit.revert();
      artistSplit.revert();
      yearSplit.revert();
      descriptionSplit.revert();
      sourceLinkSplit.revert();
      slideTitleSplit.revert();
      slideArtistSplit.revert();

      // --- Change Data ---
      const heroImage = getHeroImage(card);
      artworkImage.src = heroImage;
      artworkImage.alt = card.dataset.title;
      title.textContent = card.dataset.title;
      artist.textContent = card.dataset.artist;
      year.textContent = card.dataset.year;
      description.innerHTML = card.dataset.description;
      artistImage.src = card.dataset.artistImage;
      artistImage.alt = card.dataset.artist;

      if (card.dataset.source) {
        sourceLink.href = card.dataset.source;
        sourceLink.style.display = "block";
      } else {
        sourceLink.style.display = "none";
      }

      slideTitle.textContent = card.dataset.title;
      slideArtist.textContent = card.dataset.artist;

      const progressPercent = ((index + 1) / artworkCards.length) * 100;
      gsap.to(progressBar, {
        width: `${progressPercent}%`,
        duration: 1,
        ease: "expo.out",
      });

      updateNavigationButtons();

      let newTitleSplit = new SplitText(title, {
        type: "words, lines",
        wordsClass: "word",
        linesClass: "line",
      });
      let newArtistSplit = new SplitText(artist, {
        type: "words, lines",
        wordsClass: "word",
        linesClass: "line",
      });
      let newYearSplit = new SplitText(year, {
        type: "words",
        wordsClass: "word",
      });
      let newDescriptionSplit = new SplitText(description, {
        type: "words,lines",
        wordsClass: "word",
        linesClass: "line",
      });
      let newSourceLinkSplit =
        sourceLink.style.display !== "none"
          ? new SplitText(sourceLink, {
              type: "words,lines",
              wordsClass: "word",
              linesClass: "line",
            })
          : null;
      let newSlideTitleSplit = new SplitText(slideTitle, {
        type: "words, lines",
        wordsClass: "word",
        linesClass: "line",
      });
      let newSlideArtistSplit = new SplitText(slideArtist, {
        type: "words, lines",
        wordsClass: "word",
        linesClass: "line",
      });
      // --- GSAP Animation In ---
      const tlIn = gsap.timeline();

      // Set initial state for the "in" animation (elements are off-screen below)
      gsap.set(artworkImage, { yPercent: 100 });
      gsap.set(newTitleSplit.words, { y: 80 });
      gsap.set(newArtistSplit.words, { y: 30 });
      gsap.set(newYearSplit.words, { y: 250 });
      gsap.set(newDescriptionSplit.words, { y: 30 });
      gsap.set(artistImage, { yPercent: 100 });
      gsap.set(openGalleryBtn, { y: 40 });
      gsap.set(newSlideTitleSplit.words, { y: 80 });
      gsap.set(newSlideArtistSplit.words, { y: 30 });
      if (newSourceLinkSplit) {
        gsap.set(newSourceLinkSplit.words, { y: 15 });
      }

      //scroll to the top of the page
      window.scrollTo(0, 0);

      tlIn.to(artworkImage, {
        yPercent: 0,
        duration: 0.5,
        ease: "expo.out",
      });
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
      }, "<");
      tlIn.to(
        newArtistSplit.words,
        {
          y: 0,
          stagger: 0,
          duration: 1,
          ease: "expo.out",
        },
        "<"
      );
      tlIn.to(
        newYearSplit.words,
        {
          y: 0,
          duration: 1,
          ease: "expo.out",
        },
        "<"
      );
      tlIn.to(
        newDescriptionSplit.words,
        {
          y: 0,
          stagger: 0,
          duration: 1,
          ease: "expo.out",
        },
        "<"
      );
      tlIn.to(
        artistImage,
        {
          yPercent: 0,
          duration: 1,
          ease: "expo.out",
        },
        "<"
      );
      tlIn.to(
        openGalleryBtn,
        {
          y: 0,
          duration: 1,
          ease: "expo.out",
        },
        "<"
      );
      if (newSourceLinkSplit) {
        tlIn.to(
          newSourceLinkSplit.words,
          {
            y: 0,
            duration: 1,
            ease: "expo.out",
          },
          "<"
        );
      }
      tlIn.to(
        newSlideTitleSplit.words,
        {
          y: 0,
          duration: 1,
          ease: "expo.out",
        },
        "<"
      );
      tlIn.to(
        newSlideArtistSplit.words,
        {
          y: 0,
          duration: 1,
          ease: "expo.out",
        },
        "<"
      );
    });
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
    fillArtworkDetailInitial(card, index);

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
    if (!isSlideshow) {
      //change text to STOP SLIDESHOW
      btnSlideshow.querySelector(".btn-slideshow-text").textContent =
        "STOP SLIDESHOW";
      openArtworkDetail(artworkCards[0], 0);
      isSlideshow = true;
    } else {
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
  detailSection.querySelector(".open-gallery").addEventListener("click", () => {
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
