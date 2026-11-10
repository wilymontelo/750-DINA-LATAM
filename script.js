const CHECKOUT_URL = "https://pay.hotmart.com/V108420619J?off=e7lnb8e2&checkoutMode=10";

const timer = document.querySelector("#countdown");
const updateCountdown = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const secondsLeft = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
  const h = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const s = String(secondsLeft % 60).padStart(2, "0");
  if (timer) timer.textContent = `${h}:${m}:${s}`;
};
updateCountdown();
window.setInterval(updateCountdown, 1000);

document.querySelectorAll("[data-checkout]").forEach((button) => {
  button.href = CHECKOUT_URL;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const carousel = document.querySelector(".testimonial-carousel");
if (carousel) {
  const track = carousel.querySelector(".testimonial-track");
  const slides = [...carousel.querySelectorAll("[data-slide]")];
  const dots = [...carousel.querySelectorAll("[data-dot]")];
  let currentSlide = 0;
  let pointerStart = null;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentSlide));
  };

  carousel.querySelector(".prev").addEventListener("click", () => showSlide(currentSlide - 1));
  carousel.querySelector(".next").addEventListener("click", () => showSlide(currentSlide + 1));
  dots.forEach((dot) => dot.addEventListener("click", () => showSlide(Number(dot.dataset.dot))));

  track.addEventListener("pointerdown", (event) => {
    pointerStart = event.clientX;
    track.setPointerCapture?.(event.pointerId);
  });
  track.addEventListener("pointerup", (event) => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    if (Math.abs(distance) > 45) showSlide(currentSlide + (distance < 0 ? 1 : -1));
    pointerStart = null;
  });
  track.addEventListener("pointercancel", () => { pointerStart = null; });
}

const premiumCarousel = document.querySelector(".premium-carousel");
if (premiumCarousel) {
  const premiumTrack = premiumCarousel.querySelector(".premium-track");
  const premiumSlides = [...premiumCarousel.querySelectorAll("[data-premium-slide]")];
  const premiumCurrent = premiumCarousel.querySelector("[data-premium-current]");
  let premiumIndex = 0;
  let premiumPointerStart = null;

  const showPremiumSlide = (index) => {
    premiumIndex = (index + premiumSlides.length) % premiumSlides.length;
    premiumTrack.style.transform = `translateX(-${premiumIndex * 100}%)`;
    premiumCurrent.textContent = String(premiumIndex + 1);
  };

  premiumCarousel.querySelector(".premium-prev").addEventListener("click", () => showPremiumSlide(premiumIndex - 1));
  premiumCarousel.querySelector(".premium-next").addEventListener("click", () => showPremiumSlide(premiumIndex + 1));

  premiumTrack.addEventListener("pointerdown", (event) => {
    premiumPointerStart = event.clientX;
    premiumTrack.setPointerCapture?.(event.pointerId);
  });
  premiumTrack.addEventListener("pointerup", (event) => {
    if (premiumPointerStart === null) return;
    const distance = event.clientX - premiumPointerStart;
    if (Math.abs(distance) > 45) showPremiumSlide(premiumIndex + (distance < 0 ? 1 : -1));
    premiumPointerStart = null;
  });
  premiumTrack.addEventListener("pointercancel", () => { premiumPointerStart = null; });
  premiumCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showPremiumSlide(premiumIndex - 1);
    if (event.key === "ArrowRight") showPremiumSlide(premiumIndex + 1);
  });
}
