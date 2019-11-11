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
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor(t / 1000 % 60);
  var minutes = Math.floor(t / 1000 / 60 % 60);
  var hours = Math.floor(t / (1000 * 60 * 60) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(clock, endtime) {
  if (clock) {
    var updateClock = function updateClock() {
      var t = getTimeRemaining(endtime);
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    };

    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
}

var clock = document.getElementById("countdown");

if (clock) {
  var deadline = new Date(Date.parse(clock.dataset.date));
  initializeClock(clock, deadline);
}
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
  speed: 5000,
  autoplayButtonOutput: false
});