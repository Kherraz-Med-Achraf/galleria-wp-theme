//Animation Header

document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".logo img");
  const btnSlideshow = document.querySelector(".btn-slideshow-text");
  const line = document.querySelector(".line");

  gsap.set([logo, btnSlideshow], {
    y: 48,
  });


  const HeaderAnimation = gsap.timeline();

  HeaderAnimation.to([logo, btnSlideshow], {
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "expo.out",
    delay: 0.5,
  }).from(".line", {
    width: "0%",
    duration: 1.5,
    ease: "expo.out",
  }, "<0.3");

  HeaderAnimation.play();
});
