let lastKnownScrollPosition = 0
let ticking = false
var viewportHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
)
let header = document.querySelector('.header')

function toggleHeaderClasses(type) {
  if (type == 'add') {
    header.classList.remove('absolute', 'text-white', 'nav-black')
    header.classList.add(
      'fixed',
      'bg-white',
      'animated',
      'slideInDown',
      'text-black'
    )
  }
  if (type == 'remove') {
    header.classList.add('absolute', 'text-white', 'nav-black')
    header.classList.remove(
      'fixed',
      'bg-white',
      'animated',
      'slideInDown',
      'text-black'
    )
  }
}

function toggleHeader(scrollPos) {
  // Use if you only want header fixed on homepage
  // if (page("home") && scrollPos > viewportHeight) {
  if (page('home')) {
    if (scrollPos > viewportHeight) {
      toggleHeaderClasses('add')
    } else {
      toggleHeaderClasses('remove')
    }
  } else {
    if (scrollPos > viewportHeight / 3) {
      toggleHeaderClasses('add')
    } else {
      toggleHeaderClasses('remove')
    }
  }
}

toggleHeader()

window.addEventListener('scroll', function(e) {
  lastKnownScrollPosition = window.scrollY

  if (!ticking) {
    window.requestAnimationFrame(function() {
      toggleHeader(lastKnownScrollPosition)
      ticking = false
    })

    ticking = true
  }
})
