import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  const scrollwrapper = document.querySelector("html");

  const lenis = new Lenis({
    lerp: 0.05,
    wheelMultiplier: 0.8,
    wrapper: scrollwrapper,
    prevent: (node) => node.classList.contains("modal"),
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Store lenis instance globally for other components
  window.lenis = lenis;

  // Reset scroll position to ensure consistent calculations
  lenis.scrollTo(0, { immediate: true });

  // Force ScrollTrigger to recalculate positions after everything is settled
  ScrollTrigger.refresh();
})

// const snap = new Snap(lenis);

// const listSnapPoints = document.querySelectorAll("section");

// listSnapPoints.forEach((el) => {
//   snap.addElement(el, { type: "proximity" });
// });
