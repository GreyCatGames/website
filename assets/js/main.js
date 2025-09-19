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
 * Blog post timeline with snapping
 */
document.addEventListener("DOMContentLoaded", () => {
  const posts = document.querySelectorAll(".blog-post");
  const timelineDot = document.getElementById("timeline-dot");
  const monthAnchors = document.querySelectorAll(".month-anchor");

  if (!posts.length || !monthAnchors.length) return;

  const SNAP_THRESHOLD = 50;
  const sidebar = timelineDot.parentElement; // sidebar container

  // Get positions of month anchors relative to sidebar
  function getAnchorPositions() {
    return Array.from(monthAnchors).map(a => a.offsetTop);
  }

  function updateDot() {
    // Scroll position relative to page
    const scrollMiddle = window.scrollY + window.innerHeight / 2;

    const firstPostTop = posts[0].offsetTop;
    const lastPostBottom = posts[posts.length - 1].offsetTop + posts[posts.length - 1].offsetHeight;

    // Clamp scrollMiddle between first/last post
    const clamped = Math.min(Math.max(scrollMiddle, firstPostTop), lastPostBottom);

    // Percentage scroll between first/last post
    let percent = (clamped - firstPostTop) / (lastPostBottom - firstPostTop);
    percent = Math.min(Math.max(percent, 0), 1);

    // Map to sidebar anchor range
    const anchorPositions = getAnchorPositions();
    const sidebarTop = anchorPositions[0];
    const sidebarBottom = anchorPositions[anchorPositions.length - 1];
    let targetY = sidebarTop + percent * (sidebarBottom - sidebarTop);

    // Snap to closest anchor if within threshold
    let closestY = targetY;
    let minDist = Infinity;
    anchorPositions.forEach(y => {
      const dist = Math.abs(y - targetY);
      if (dist < minDist) {
        minDist = dist;
        closestY = y;
      }
    });

    if (minDist < SNAP_THRESHOLD || targetY > sidebarBottom) {
      targetY = closestY;
    }

    timelineDot.style.top = `${targetY}px`;
  }

  window.addEventListener("scroll", updateDot);
  window.addEventListener("resize", updateDot);
  updateDot();
});
