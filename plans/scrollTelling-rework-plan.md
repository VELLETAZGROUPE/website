# ScrollTelling Rework Plan (Revised)

## Overview

Transform `scrollTelling.astro` to create a "stack of cards" cover effect where each section slides in from right to left as it reaches its scroll position, stacking on top of previous sections. Works backwards when scrolling up.

## Key Clarification on Scroll Behavior

### Animation Trigger Points

- **Each section starts animating ONLY when the user reaches its scroll position** (at `i * viewportHeight`)
- **Once fully visible, the section stays in place** (doesn't exit when scrolling past)
- **Scrolling back UP through the section** causes it to animate back (reverse effect)

---

## Revised Implementation

### HTML Structure

```astro
<div class="scrollTelling" id="scrollTelling">
  <!-- Container height = viewportHeight * number of slides -->

  {
    node.slides.map((slide, index) => (
      <section
        class="scroll-section"
        data-index={index}
        style={`--z-index: ${index + 1}`}
      >
        <div class="scroll-content">
          <div class="slide-image-wrapper">
            <NetlifyImage
              src={slide.img.src}
              alt={slide.img.alt}
              class={`w-full h-screen object-cover ${node.duotone || ""}`}
            />
          </div>
          <div class="slide-text">
            <PortableText value={slide.text} />
          </div>
        </div>
      </section>
    ))
  }
</div>
```

### CSS Styling

```css
.scrollTelling {
  position: relative;
  /* Height set dynamically via JS: viewportHeight * numSlides */
}

.scroll-section {
  position: sticky;
  top: 0;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
  z-index: var(--z-index, 1);
}

.scroll-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Initially off-screen right, only visible when animating */
  transform: translateX(100%);
  will-change: transform;
}

.slide-image-wrapper {
  position: absolute;
  inset: 0;
}

.slide-text {
  position: relative;
  z-index: 2;
  padding: 2rem;
  /* Text styling */
}
```

### Revised JavaScript Logic

```javascript
function initScrollTelling() {
  const container = document.getElementById("scrollTelling")
  if (!container) return

  const sections = container.querySelectorAll(".scroll-section")
  const totalSections = sections.length
  const viewportHeight = window.innerHeight

  // Set container height: each section gets 100dvh of scroll space
  container.style.height = `${viewportHeight * totalSections}px`

  function updateScroll() {
    const scrollY = window.scrollY

    sections.forEach((section, index) => {
      // Each section becomes "active" at this scroll position
      const sectionStart = index * viewportHeight
      const sectionEnd = sectionStart + viewportHeight

      // Only animate if scroll is within this section's zone
      if (scrollY >= sectionStart && scrollY <= sectionEnd) {
        // Calculate progress: 0 = section start, 1 = section end
        const rawProgress = (scrollY - sectionStart) / viewportHeight
        const progress = Math.max(0, Math.min(1, rawProgress))

        const content = section.querySelector(".scroll-content")
        // translateX(100% - 100% * progress)
        // - progress 0: translateX(100%) - off-screen right
        // - progress 1: translateX(0%) - fully visible
        content.style.transform = `translateX(calc(100% - (100% * ${progress})))`
      }
      // If scrollY > sectionEnd: content stays at translateX(0%)
      // If scrollY < sectionStart: content stays at translateX(100%)
    })
  }

  // Use requestAnimationFrame for smooth updates
  let ticking = false
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScroll()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })
  updateScroll() // Initial call
}
```

---

## Scroll Behavior Diagram

```mermaid
flowchart TD
    A[User Scrolls Down] --> B{sectionStart<br/>≤ scrollY ≤ sectionEnd?}
    B -->|Yes| C[Calculate progress<br/>0 → 1]
    B -->|No| D{scrollY < sectionStart?}
    D -->|Yes| E[translateX(100%)<br/>off-screen right]
    D -->|No| F[translateX(0%)<br/>fully visible]
    C --> G[Apply transform<br/>slide in from right]

    H[User Scrolls Up] --> I{sectionStart<br/>≤ scrollY ≤ sectionEnd?}
    I -->|Yes| J[Calculate progress<br/>decreases]
    I -->|No| K[Stay at current<br/>translateX value]
    J --> L[Apply transform<br/>slide out to right]
```

---

## Scroll Progress Timeline

```
scrollY: 0          vpH           2vpH          3vpH
         │           │             │             │
         ▼           ▼             ▼             ▼
    ┌─────────┐ ┌─────────┐  ┌─────────┐  ┌─────────┐
    │ S1 anim │ │ S1 done │  │ S2 anim │  │ S2 done │
    │ S2 wait │ │ S2 wait │  │ S1 done │  │ S3 anim │
    │ S3 wait │ │ S3 wait │  │ S3 wait │  │ S1 done │
    └─────────┘ └─────────┘  └─────────┘  └─────────┘
         │           │             │             │
         └─────┬─────┘             └─────┬─────┘
               │                         │
               ▼                         ▼
    S1: translateX(100%)          S1: translateX(0%)
    S2: translateX(100%)          S2: translateX(100%)
```

---

## Comparison Table

| Aspect            | Current                             | Proposed (Revised)                 |
| ----------------- | ----------------------------------- | ---------------------------------- |
| Animation trigger | When section bottom enters viewport | When scrollY reaches section start |
| Exit behavior     | Exits when scrolled past            | Stays visible once fully in place  |
| Reverse scroll    | Partial support                     | Full support                       |
| Scroll snap       | Yes                                 | No                                 |
| Position          | `relative` + `fixed` content        | `sticky` sections                  |

---

## Files to Modify

1. `src/components/cmp/scrollTelling.astro`
   - Update HTML structure
   - Rewrite CSS styles
   - Rewrite JavaScript scroll logic

---

## Testing Checklist

- [ ] Section 1 slides in when reaching top of scrollTelling
- [ ] Section 1 stays visible once fully in place
- [ ] Section 2 slides in on top of Section 1
- [ ] Section 2 stays visible once fully in place
- [ ] Scrolling up reverses each section correctly
- [ ] Works with 6-10 slides
- [ ] Responsive design (mobile/desktop)
- [ ] Smooth transitions (no jank)
- [ ] Duotone effects still work
- [ ] Text remains readable over images
