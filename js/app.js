const navOpen = document.querySelector(".open-nav");
const navClose = document.querySelector(".close-nav");
const navLinks = document.querySelector(".nav-links");
const toTop = document.querySelector("#up");

navOpen.addEventListener("click", () => {
  navLinks.classList.add("show-nav");
  if (navLinks.classList.contains("show-nav")) {
    navOpen.style.display = "none";
    navClose.style.display = "block";
  }
});

navClose.addEventListener("click", () => {
  navLinks.classList.remove("show-nav");

  if (!navLinks.classList.contains("show-nav")) {
    navClose.style.display = "none";
    navOpen.style.display = "block";
  }
});

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  // const navHeight = navbar.getBoundingClientRect().height;
  // if (scrollHeight > navHeight) {
  //   navbar.classList.add("fixed-nav");
  // } else {
  //   navbar.classList.remove("fixed-nav");
  // }
  // setup back to top link

  if (scrollHeight > 680) {
    console.log("helo");

    toTop.style.display = "flex";
  } else {
    toTop.style.display = "none";
  }
});

// ANIMATION

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
