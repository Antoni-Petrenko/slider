import { createElement, createButton } from "./elementsCreators.module.js";



//Target element - root element for our slider with id attribute "slider"
//Data - Collection of sources for images
export function createSlider(data, targetElement) {
  const prev = document.getElementById("prev"),
        next = document.getElementById("next");

  createSlide(data, targetElement);
  createSlideControl(data, targetElement);
  slide(prev, next);
}

//This function create a single slide
//Target element - root element for our slider with id attribute "slider"
//Data - Collection of sources for images

export function createSlide(data, targetElement) { 

  const productName = Object.keys(data),        
        products = Object.values(data),             

    slideImgContainer = createElement(
      "div",
      "slides",
      "slider__img-container"
    )(targetElement);
  products.forEach((product, productID) => {
    const productContainer = createElement("div", null, "product-container")();
    product.productIMG.forEach((src, dataID) => {
      createElement(
        "img",
        null,
        "product-container__product",
        src,
        productName[productID],
        dataID
      )(productContainer);
    });
    slideImgContainer.appendChild(productContainer);
  });
}


//function for buttons event listener


export function changeColor(e) {
  const targetSlide = e.target.name,
    targetID = e.target.dataset.id,
    prevImg = document.querySelectorAll(`img[alt='${targetSlide}'].active`),
    currentImg = document.querySelectorAll(
      `img[alt='${targetSlide}'][data-id='${targetID}']`
    );

  prevImg.forEach(img => img.classList.remove("active"));

  currentImg.forEach(img => setTimeout(() => img.classList.add("active"), 400));
}

//This function create an information and control buttons for changing colors of every single products
//Target element - root element for our slider with id attribute "slider"
//Data - Collection of sources for images

export function createSlideControl(data, targetElement) {
  const productName = Object.keys(data),
    products = Object.values(data),
    slideControlsContainer = createElement(
      "div",
      null,
      "controls-container"
    )(targetElement);

    //Iterating thru every single product images sources
  products.forEach((product, productID) => {
    const control = createElement(
        "div",
        null,
        "control"
      )(slideControlsContainer),
      controlButtons = createElement("div", null, "control-buttons")(control);


    createElement(
      "img",
      null,
      "shadow--control-section",
      "./asset/img/P_shadow.png",
      "shadow",
      null
    )(control);

    // Iterating thru buttons sources in current product

    product.buttons.forEach((button, dataID) => {
      createButton(
        productName[productID],
        dataID,
        button,
        changeColor
      )(controlButtons);
    });

    // Iterating thru info sources in current product

    product.info.forEach((el, productID) => {
      const info = Object.entries(el);
      createElement(
        "img",
        null,
        info[0][0],
        info[0][1],
        productName[productID]
      )(control);
    });
  });
}



export function slide(prev, next) {
  let posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    items = document.getElementById("slides"),
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
    controls = document.querySelectorAll(".control");

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
}
