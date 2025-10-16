// Enregistrer les plugins GSAP en premier
gsap.registerPlugin(Flip);

//Animation Header

document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".logo img");
  const btnSlideshow = document.querySelector(".btn-slideshow-text");
  const line = document.querySelector(".line");

  gsap.set([logo, btnSlideshow], {
    y: 55,
  });

  const HeaderAnimation = gsap.timeline();

  HeaderAnimation.to([logo, btnSlideshow], {
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "expo.out",
    delay: 0.5,
  }).from(
    ".line",
    {
      width: "0%",
      duration: 1.5,
      ease: "expo.out",
    },
    "<0.3"
  );

  HeaderAnimation.play();

  // animation artworks list (Masonry with Flip)
  const container = document.querySelector(".artworks-list");

  if (!container) return;

  const items = Array.from(container.querySelectorAll(".artwork-card"));
  if (items.length === 0) return;

  let isFirstLoad = true;

  function applyMasonryLayout() {
    const tabletBreakpoint = 768;
    const desktopBreakpoint = 1440;
    let numColumns = 1;

    if (window.innerWidth >= desktopBreakpoint) {
      numColumns = 4;
    } else if (window.innerWidth >= tabletBreakpoint) {
      numColumns = 2;
    }

    // On capture l'état (positions, dimensions) avant de faire des changements
    const state = Flip.getState(items);

    // On applique la nouvelle disposition
    if (numColumns <= 1) {
      // Pour mobile, on laisse le CSS gérer la disposition en une colonne
      // On réinitialise les styles en ligne pour ne pas interférer
      container.style.position = "";
      container.style.height = "";
      items.forEach((item) => {
        item.style.position = "";
        item.style.top = "";
        item.style.left = "";
        item.style.width = "";
        item.style.transform = "";
      });
    } else {
      // Pour tablette et bureau, on calcule la disposition en JS
      container.style.position = "relative";
      const gap = 40;

      const containerWidth = container.offsetWidth;
      const totalGapWidth = (numColumns - 1) * gap;
      const colWidth = (containerWidth - totalGapWidth) / numColumns;

      const columnHeights = Array(numColumns).fill(0);

      items.forEach((item) => {
        const minHeight = Math.min(...columnHeights);
        const colIndex = columnHeights.indexOf(minHeight);

        item.style.position = "absolute";
        item.style.width = `${colWidth}px`;
        item.style.left = `${colIndex * (colWidth + gap)}px`;
        item.style.top = `${minHeight}px`;

        columnHeights[colIndex] += item.offsetHeight + gap;
      });

      const maxHeight = Math.max(...columnHeights);
      container.style.height = `${maxHeight - gap}px`;
    }

    // On anime ou on révèle les éléments
    if (isFirstLoad) {
      // Au premier chargement, on ne fait qu'une animation d'apparition (fade in)
      gsap.to(items, {
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
      });
      isFirstLoad = false;
    } else {
      // Au redimensionnement, on anime le changement de disposition avec Flip
      Flip.from(state, {
        duration: 0.8,
        stagger: 0.05,
        ease: "expo.out",
        absolute: true,
      });
    }
  }

  // On attend que les images soient chargées pour que les hauteurs soient correctes
  window.addEventListener("load", applyMasonryLayout);

  // On recalcule la disposition au redimensionnement
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(applyMasonryLayout, 150);
  });
});

// animation artworks list
