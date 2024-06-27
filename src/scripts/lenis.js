import Lenis from "lenis";
import Snap from "lenis/snap";

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

const snap = new Snap(lenis, {});

const listSnapPoints = document.querySelectorAll("section");

listSnapPoints.forEach((el) => {
  snap.addElement(el);
});
