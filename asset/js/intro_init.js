(function() {
  window.onload = () => {
    const loader = document.querySelector(".loader"),
      intro = [
        ...document.querySelector(".intro").children,
        document.querySelector(".header")
      ],
      introContainer = document.querySelector(".intro"),
      slider = document.querySelector(".slider"),
      playAnimation = () => {
        intro.forEach(el => {
          el.style.animationPlayState = "running";
        });
        loader.removeEventListener("transitionend", playAnimation);
        loader.remove();
      };
    loader.style.opacity = "0";
    loader.addEventListener("transitionend", playAnimation);

    introContainer.addEventListener("animationend", () => {
      introContainer.style.opacity = 0;
    });
    introContainer.addEventListener("transitionend", () => {
      slider.classList.add("active");
    });
  };
});
