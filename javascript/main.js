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
var accItem = document.getElementsByClassName('accordion__item');
var accHD = document.getElementsByClassName('accordion__handle');

for (i = 0; i < accHD.length; i++) {
  accHD[i].addEventListener('click', toggleItem, false);
}

function toggleItem() {
  var itemClass = this.parentNode.className;

  for (i = 0; i < accItem.length; i++) {
    accItem[i].className = 'accordion__item close';
  }

  if (itemClass == 'accordion__item close') {
    this.parentNode.className = 'accordion__item open';
  }
}
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
var header = document.querySelector('.header');
var mql = window.matchMedia('(min-width: 769px)');
var navContent = document.querySelector('.nav-content');
var navToggle = document.querySelector('.nav-content-toggle');
var windowWidth = window.innerWidth;

function toggleHeaderClasses(type) {
  if (type == 'add') {
    header.classList.remove('absolute', 'text-white', 'nav-black');
    header.classList.add('fixed', 'bg-white', 'animated', 'slideInDown', 'text-black');
  }

  if (type == 'remove') {
    header.classList.add('absolute', 'text-white', 'nav-black');
    header.classList.remove('fixed', 'bg-white', 'animated', 'slideInDown', 'text-black');
  }
}

function toggleHeader(scrollPos) {
  // Use if you only want header fixed on homepage
  // if (page("home") && scrollPos > viewportHeight) {
  if (page('home')) {
    if (scrollPos > viewportHeight) {
      toggleHeaderClasses('add');
    } else {
      toggleHeaderClasses('remove');
    }
  } else {
    if (scrollPos > viewportHeight / 3) {
      toggleHeaderClasses('add');
    } else {
      toggleHeaderClasses('remove');
    }
  }
}

function toggleNav() {
  if (mql.matches) {
    navContent.classList.remove('hidden');
  } else {
    navContent.classList.toggle('hidden');
  }
}

toggleNav();
toggleHeader();
window.addEventListener('resize', function (e) {
  if (window.innerWidth != windowWidth) {
    windowWidth = window.innerWidth;
    toggleNav();
  }
});
navToggle.addEventListener('click', function () {
  toggleNav();
});
window.addEventListener('scroll', function (e) {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      toggleHeader(lastKnownScrollPosition);
      ticking = false;
    });
    ticking = true;
  }
});
var hero = document.querySelector(".hero-slider");

if (hero) {
  var slider = tns({
    container: ".hero-slider",
    // mode: "gallery",
    items: 1,
    slideBy: "page",
    autoplay: true,
    controls: false,
    speed: 350,
    autoplayButtonOutput: false
  });
}
var schedule_toggles = document.querySelectorAll(".toggle-schedule-info");

var getSiblings = function getSiblings(elem) {
  return Array.prototype.filter.call(elem.parentNode.children, function (sibling) {
    return sibling !== elem;
  });
};

schedule_toggles.forEach(function (toggle) {
  toggle.addEventListener("click", function () {
    toggle.parentElement.classList.toggle("hidden");
    getSiblings(toggle.parentElement).forEach(function (sibling) {
      sibling.classList.toggle("hidden");
    });
  });
});
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
var filter_toggles = document.querySelectorAll(".video-filter-toggle");
var filter_videos = document.querySelectorAll(".video-filter-item");
filter_toggles.forEach(function (toggle) {
  toggle.addEventListener("click", function () {
    // Only allow active state if not disabled
    if (!toggle.disabled) {
      var selectedYear = toggle.dataset.year; // Sets active state to toggle and removes state from rest

      filter_toggles.forEach(function (toggle_item) {
        if (toggle_item.dataset.year == selectedYear) {
          toggle_item.classList.add("bg-blue-100");
        } else {
          toggle_item.classList.remove("bg-blue-100");
        }
      }); // Show videos based on year

      if (selectedYear == "all") {
        filter_videos.forEach(function (video) {
          video.classList.remove("hidden");
        });
      } else {
        filter_videos.forEach(function (video) {
          if (video.dataset.released == selectedYear) {
            video.classList.remove("hidden");
          } else {
            video.classList.add("hidden");
          }
        });
      }
    }
  });
});