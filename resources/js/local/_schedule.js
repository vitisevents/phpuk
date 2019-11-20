var schedule_toggles = document.querySelectorAll(".toggle-schedule-info");

var getSiblings = function(elem) {
  return Array.prototype.filter.call(elem.parentNode.children, function(
    sibling
  ) {
    return sibling !== elem;
  });
};

schedule_toggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    toggle.parentElement.classList.toggle("hidden");

    getSiblings(toggle.parentElement).forEach(sibling => {
      sibling.classList.toggle("hidden");
    });
  });
});
