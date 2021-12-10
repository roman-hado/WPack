import '../scss/main.scss';
import gsap from 'gsap';

const slider = document.querySelector('.slider-wrapper');
const slides = [...slider.querySelectorAll('.slider-item')];

const getNextPrev = () => {
  const activeSlide = document.querySelector('.slider-item.active');
  const activeIndex = slides.indexOf(activeSlide);

  let next, prev, nextAfterNext, prevBeforePrev;

  if (activeIndex === slides.length - 1) {
    next = slides[0];
  } else {
    next = slides[activeIndex + 1];
  }

  if (activeIndex === 0) {
    prev = slides[slides.length - 1];
  } else {
    prev = slides[activeIndex - 1];
  }

  if (activeIndex === slides.length - 2) {
    nextAfterNext = slides[0];
  } else {
    if (activeIndex === slides.length - 1) {
      nextAfterNext = slides[1];
    } else {
      nextAfterNext = slides[activeIndex + 2];
    }
  }

  if (activeIndex === 1) {
    prevBeforePrev = slides[slides.length - 1];
  } else {
    if (activeIndex === 0) {
      prevBeforePrev = slides[slides.length - 2];
    } else {
      prevBeforePrev = slides[activeIndex - 2];
    }
  }

  return { activeSlide, next, prev, nextAfterNext, prevBeforePrev };
}

const setInitialSliderItemsPositions = () => {
  const { activeSlide, next, prev } = getNextPrev();

  slides.forEach((s, i) => {
    if (s === activeSlide) {
      gsap.set(s, { xPercent: 0 });
      gsap.set(s.children[0], { left: '50%', xPercent: -50 });
    } else if (s === prev) {
      gsap.set(s, { xPercent: -100 });
    } else if (s === next) {
      gsap.set(s, { xPercent: 95 });
    } else {
      gsap.set(s, { xPercent: 110 })
    }
  })
}

const goToNextSlide = () => {
  const { activeSlide, next, nextAfterNext } = getNextPrev();

  slides.forEach(s => {
    if (s === activeSlide) {
      gsap.to(s, { xPercent: -100 });
    } else if (s === next) {
      gsap.to(s, { xPercent: 0 });
      gsap.to(s.children[0], { left: '50%', xPercent: -50 });
    } else if (s === nextAfterNext) {
      gsap.to(s, { xPercent: 95 });
      gsap.to(s.children[0], { left: '0', xPercent: 0, duration: 0 });
    } else {
      gsap.set(s, { xPercent: 110 })
    }
  })

  activeSlide.classList.remove('active');
  next.classList.add('active');
}

const goToPrevSlide = () => {
  const { activeSlide, next, prev } = getNextPrev();

  slides.forEach(s => {
    if (s === activeSlide) {
      gsap.to(s, {  xPercent: 95})
      gsap.to(s.children[0], { left: '0', xPercent: 0 });
    } else if (s === next) {
      gsap.to(s, { xPercent: 110 })
    } else if (s == prev) {
      gsap.to(s.children[0], { left: '50%', xPercent: -50 });
      gsap.to(s, { xPercent: 0 });
    } else {
      gsap.set(s, { xPercent: -110 })
    }
  })

  activeSlide.classList.remove('active');
  prev.classList.add('active');
};

setInitialSliderItemsPositions();

document.querySelector('.slider-next').addEventListener('click', goToNextSlide);
document.querySelector('.slider-prev').addEventListener('click', goToPrevSlide);
