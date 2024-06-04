import Lenis from "lenis";

const scrollwrapper = document.querySelector("html");

const lenis = new Lenis({
  lerp: 0.08,
  wheelMultiplier: 1,
  wrapper: scrollwrapper,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
