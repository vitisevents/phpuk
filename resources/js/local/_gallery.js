var elem = document.querySelector('.gallery')
var msnry = new Masonry(elem, {
  // options
  itemSelector: '.gallery-item',
  columnWidth: '.gallery-item',
  percentPosition: true
})

// element argument can be a selector string
//   for an individual element
var msnry = new Masonry('.gallery', {
  // options
  gutter: 10
})
