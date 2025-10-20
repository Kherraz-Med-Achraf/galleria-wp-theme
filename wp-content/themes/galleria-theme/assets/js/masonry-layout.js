// ========== GRID LAYOUT WITH FLIP ANIMATION ==========
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".artworks-list");
  const items = document.querySelectorAll(".artwork-card");
  if (items.length === 0 || !container) return;

  // Fonction pour détecter si on est sur desktop
  const isDesktop = () => window.innerWidth >= 768;

  // Ne procéder aux réorganisations que sur desktop
  if (!isDesktop()) {
    // Animation d'apparition au chargement (sans réorganisation)
    gsap.to(items, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
      delay: 0.3,
    });
    return;
  }

  // Réorganiser les éléments : transformer colonnes CSS en lignes
  const numberOfColumns = 4;
  const itemsArray = Array.from(items);
  const totalItems = itemsArray.length;

  // Calculer la distribution CSS column-count (colonnes équilibrées)
  const baseItemsPerColumn = Math.floor(totalItems / numberOfColumns);
  const extraItems = totalItems % numberOfColumns;

  // Créer un tableau avec le nombre d'éléments par colonne CSS
  const cssColumns = [];
  let currentIndex = 0;
  for (let i = 0; i < numberOfColumns; i++) {
    const itemsInThisColumn = baseItemsPerColumn + (i < extraItems ? 1 : 0);
    const columnItems = [];
    for (let j = 0; j < itemsInThisColumn; j++) {
      if (currentIndex < totalItems) {
        columnItems.push(itemsArray[currentIndex]);
        currentIndex++;
      }
    }
    cssColumns.push(columnItems);
  }

  // Transposer : lire par lignes au lieu de colonnes
  const maxRows = Math.max(...cssColumns.map((col) => col.length));
  const reorderedItems = [];
  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < numberOfColumns; col++) {
      if (cssColumns[col][row]) {
        reorderedItems.push(cssColumns[col][row]);
      }
    }
  }

  // Réorganiser dans le DOM (invisible pour l'utilisateur)
  reorderedItems.forEach((item) => container.appendChild(item));

  // Réorganiser manuellement les 4 derniers éléments : 1,2,3,4 devient 2,3,4,1
  const reorderedItemsLength = reorderedItems.length;
  if (reorderedItemsLength >= 4) {
    const lastFourItems = reorderedItems.slice(-4);
    // Réorganiser : prendre le deuxième, troisième, quatrième, puis le premier
    const reorderedLastFour = [
      lastFourItems[1],
      lastFourItems[2],
      lastFourItems[3],
      lastFourItems[0],
    ];

    // Supprimer les 4 derniers éléments actuels
    lastFourItems.forEach((item) => container.removeChild(item));

    // Ajouter les éléments réorganisés
    reorderedLastFour.forEach((item) => container.appendChild(item));
  }

  // Animation d'apparition au chargement
  gsap.to(items, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    stagger: 0.05,
    ease: "power3.out",
    delay: 0.3,
  });
});
