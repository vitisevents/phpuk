var filter_toggles = document.querySelectorAll(".video-filter-toggle");
var filter_videos = document.querySelectorAll(".video-filter-item");

filter_toggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    // Only allow active state if not disabled
    if (!toggle.disabled) {
      var selectedYear = toggle.dataset.year;

      // Sets active state to toggle and removes state from rest
      filter_toggles.forEach(toggle_item => {
        if (toggle_item.dataset.year == selectedYear) {
          toggle_item.classList.add("bg-blue-100");
        } else {
          toggle_item.classList.remove("bg-blue-100");
        }
      });

      // Show videos based on year
      if (selectedYear == "all") {
        filter_videos.forEach(video => {
          video.classList.remove("hidden");
        });
      } else {
        filter_videos.forEach(video => {
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
