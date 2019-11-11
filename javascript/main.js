// Config
// Selectors
// store selectors for reference so we only call them once
var $body = document.querySelector('body');
var $header = document.getElementById('#header');
var $nav = document.getElementById('#nav');
var $footer = document.getElementById('#footer');
// Helpers
var
/**
* @description Test if the body id is something
* @param  		{string}
* @return 		{bool}
*
*/
page = function page(name) {
  if (!name) {
    return $body.getAttribute('id');
  }

  return $body.getAttribute('id') == name;
};
// add a class of 'intro' to the first paragraph
// do this on every page apart from the blog page
// if ( !page('blog') )
// {
//     document.querySelector('.content > p').classList.add('intro')
// }
var lastKnownScrollPosition = 0;
var ticking = false;
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var header = document.querySelector(".header");

function toggleHeaderClasses(type) {
  if (type == "add") {
    header.classList.remove("absolute", "text-white");
    header.classList.add("fixed", "bg-white", "animated", "slideInDown", "text-black");
  }

  if (type == "remove") {
    header.classList.add("absolute", "text-white");
    header.classList.remove("fixed", "bg-white", "animated", "slideInDown", "text-black");
  }
}

function toggleHeader(scrollPos) {
  if (page("home") && scrollPos > viewportHeight) {
    toggleHeaderClasses("add");
  } else {
    toggleHeaderClasses("remove");
  }
}

toggleHeader();
window.addEventListener("scroll", function (e) {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      toggleHeader(lastKnownScrollPosition);
      ticking = false;
    });
    ticking = true;
  }
});
var slider = tns({
  container: ".hero-slider",
  mode: "gallery",
  items: 1,
  slideBy: "page",
  autoplay: true,
  controls: false,
  speed: 5000 // autoplayHoverPause: true

});