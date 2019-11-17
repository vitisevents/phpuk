var testimonials = document.querySelector(".testimonials-slider");

if (testimonials) {
  var slider = tns({
    container: ".testimonials-slider",
    mode: "gallery",
    items: 1,
    slideBy: "page",
    autoplay: true,
    controls: false,
    speed: 1000,
    autoplayButtonOutput: false,
    autoplayTimeout: 20000
  });
}
