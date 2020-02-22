(function() {
  let sliderItems = document.getElementById("slides"),
    prev = document.getElementById("prev"),
    next = document.getElementById("next");

  function slide(items, prev, next) {
    let posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName("product-container"),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName("product-container")[0]
        .offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true,
      controls = document.querySelectorAll(".control"),
      controlButtons = document.querySelectorAll('input[type="radio"]');

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);

    // Mouse events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener("touchstart", dragStart);
    items.addEventListener("touchend", dragEnd);
    items.addEventListener("touchmove", dragAction);

    // Click events
    prev.addEventListener("click", function() {
      shiftSlide(-1);
    });
    next.addEventListener("click", function() {
      shiftSlide(1);
    });

    // Transition events
    items.addEventListener("transitionend", checkIndex);

    // Change color events
    controlButtons.forEach(button =>
      button.addEventListener("change", changeColor)
    );
    function dragStart(e) {
      e = e || window.event;

      posInitial = items.offsetLeft;

      if (e.type == "touchstart") {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
      }
    }

    function dragAction(e) {
      e = e || window.event;

      if (e.type == "touchmove") {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }
      items.style.left = items.offsetLeft - posX2 + "px";
    }

    function dragEnd(e) {
      posFinal = items.offsetLeft;
      if (posFinal - posInitial < -threshold) {
        shiftSlide(1, "drag");
      } else if (posFinal - posInitial > threshold) {
        shiftSlide(-1, "drag");
      } else {
        items.style.left = posInitial + "px";
      }

      document.onmouseup = null;
      document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
      items.classList.add("shifting");
      document.querySelector(".control.active").classList.remove("active");

      if (allowShift) {
        if (!action) {
          posInitial = items.offsetLeft;
        }

        if (dir == 1) {
          items.style.left = posInitial - slideSize + "px";
          index++;
        } else if (dir == -1) {
          items.style.left = posInitial + slideSize + "px";
          index--;
        }
      }

      allowShift = false;
    }

    function checkIndex() {
      items.classList.remove("shifting");

      if (index == -1) {
        items.style.left = -(slidesLength * slideSize) + "px";
        index = slidesLength - 1;
      }

      if (index == slidesLength) {
        items.style.left = -(1 * slideSize) + "px";
        index = 0;
      }
      controls[index].classList.add("active");
      allowShift = true;
    }

    function changeColor(e) {
      const targetSlide = e.target.name,
        targetID = e.target.dataset.id,
        prevImg = document.querySelectorAll(`img[alt='${targetSlide}'].active`),
        currentImg = document.querySelectorAll(
          `img[alt='${targetSlide}'][data-id='${targetID}']`
        );
      prevImg.forEach(img => img.classList.remove("active"));

      currentImg.forEach(img =>
        setTimeout(() => img.classList.add("active"), 400)
      );
    }
  }

  slide(sliderItems, prev, next);
})();
