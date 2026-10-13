const reveals = document.querySelectorAll('.reveal');
const railFill = document.querySelector('#railFill');
const timeline = document.querySelector('#timelineTrack');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  reveals.forEach((item) => revealObserver.observe(item));
} else {
  reveals.forEach((item) => item.classList.add('is-visible'));
}

let ticking = false;
function updateTimelineProgress() {
  if (!timeline || !railFill) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 1;
  if (window.matchMedia('(max-width: 700px)').matches) {
    railFill.style.height = `${progress * 100}%`;
    railFill.style.width = '';
  } else {
    railFill.style.width = `${progress * 100}%`;
    railFill.style.height = '';
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateTimelineProgress);
    ticking = true;
  }
}, { passive: true });
window.addEventListener('resize', updateTimelineProgress, { passive: true });
updateTimelineProgress();
