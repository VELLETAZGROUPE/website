import Lenis from "lenis";
import Snap from "lenis/snap";

const scrollwrapper = document.querySelector("html");

const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.9,
  wrapper: scrollwrapper,
  prevent: (node) => node.classList.contains("modal"),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// const snap = new Snap(lenis);

// const listSnapPoints = document.querySelectorAll("section");

// listSnapPoints.forEach((el) => {
//   snap.addElement(el, { type: "proximity" });
// });
