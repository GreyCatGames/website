/*
* Slide show
*/

const slides = document.querySelectorAll(".hero .slide");
let current = 0;

function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

showSlide(current);
setInterval(nextSlide, 5000);

/*
* Blog post timeline
*/

const posts = document.querySelectorAll(".blog-post");
const timelineDot = document.getElementById("timeline-dot");
const sidebar = document.querySelector(".timeline-sidebar");

function updateDot() {
  const firstPostTop = posts[0].offsetTop;
  const lastPostBottom = posts[posts.length - 1].offsetTop + posts[posts.length - 1].offsetHeight;
  const scrollTop = window.scrollY + window.innerHeight / 2; // middle of viewport
  const timelineHeight = sidebar.offsetHeight;
  const percent = (scrollTop - firstPostTop) / (lastPostBottom - firstPostTop);
  const maxY = timelineHeight - timelineDot.offsetHeight;
  const y = Math.min(Math.max(percent * maxY, 0), maxY);

  timelineDot.style.top = y + "px";
}

window.addEventListener("scroll", updateDot);
window.addEventListener("resize", updateDot);
updateDot();
