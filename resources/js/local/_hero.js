var hero = document.querySelector(".hero-slider");

if (hero) {
  var slider = tns({
    container: ".hero-slider",
    mode: "gallery",
    items: 1,
    slideBy: "page",
    autoplay: true,
    controls: false,
    speed: 5000,
    autoplayButtonOutput: false
  });
}
