document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll(".hero .slide");
  if (!slides.length) return;

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
});
