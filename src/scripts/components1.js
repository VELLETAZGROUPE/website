let Util = function () {
  return;
};

Util.addClass = function (el, className) {
  var classList = className.split(" ");
  el.classList.add(classList[0]);
  if (classList.length > 1) Util.addClass(el, classList.slice(1).join(" "));
};

Util.removeClass = function (el, className) {
  var classList = className.split(" ");
  el.classList.remove(classList[0]);
  if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(" "));
};

Util.osHasReducedMotion = function () {
  if (!window.matchMedia) return false;
  var matchMediaObj = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (matchMediaObj) return matchMediaObj.matches;
  return false;
};

// File#: _1_scrolling-animations
// Usage: codyhouse.co/license
(function () {
  var ScrollFx = function (element, scrollableSelector) {
    this.element = element;
    this.options = [];
    this.boundingRect = this.element.getBoundingClientRect();
    this.windowHeight = window.innerHeight;
    this.scrollingFx = [];
    this.animating = [];
    this.deltaScrolling = [];
    this.observer = [];
    this.scrollableSelector = scrollableSelector; // if the scrollable element is not the window
    this.scrollableElement = false;
    initScrollFx(this);
    // ToDo - option to pass two selectors to target the element start and stop animation scrolling values -> to be used for sticky/fixed elements
  };

  function initScrollFx(element) {
    // do not animate if reduced motion is on
    if (Util.osHasReducedMotion()) return;
    // get scrollable element
    setScrollableElement(element);
    // get animation params
    var animation = element.element.getAttribute("data-scroll-fx");
    if (animation) {
      element.options.push(extractAnimation(animation));
    } else {
      getAnimations(element, 1);
    }
    // set Intersection Observer
    initObserver(element);
    // update params on resize
    initResize(element);
  }

  function setScrollableElement(element) {
    if (element.scrollableSelector)
      element.scrollableElement = document.querySelector(
        element.scrollableSelector
      );
  }

  function initObserver(element) {
    for (var i = 0; i < element.options.length; i++) {
      (function (i) {
        element.scrollingFx[i] = false;
        element.deltaScrolling[i] = getDeltaScrolling(element, i);
        element.animating[i] = false;

        element.observer[i] = new IntersectionObserver(
          function (entries, observer) {
            scrollFxCallback(element, i, entries, observer);
          },
          {
            rootMargin:
              element.options[i][5] -
              100 +
              "% 0px " +
              (0 - element.options[i][4]) +
              "% 0px",
          }
        );

        element.observer[i].observe(element.element);

        // set initial value
        setTimeout(function () {
          animateScrollFx.bind(element, i)();
        });
      })(i);
    }
  }

  function scrollFxCallback(element, index, entries, observer) {
    if (entries[0].isIntersecting) {
      if (element.scrollingFx[index]) return; // listener for scroll event already added
      // reset delta
      resetDeltaBeforeAnim(element, index);
      triggerAnimateScrollFx(element, index);
    } else {
      if (!element.scrollingFx[index]) return; // listener for scroll event already removed
      window.removeEventListener("scroll", element.scrollingFx[index]);
      element.scrollingFx[index] = false;
    }
  }

  function triggerAnimateScrollFx(element, index) {
    element.scrollingFx[index] = animateScrollFx.bind(element, index);
    element.scrollableElement
      ? element.scrollableElement.addEventListener(
          "scroll",
          element.scrollingFx[index]
        )
      : window.addEventListener("scroll", element.scrollingFx[index]);
  }

  function animateScrollFx(index) {
    // if window scroll is outside the proper range -> return
    if (getScrollY(this) < this.deltaScrolling[index][0]) {
      setCSSProperty(this, index, this.options[index][1]);
      return;
    }
    if (getScrollY(this) > this.deltaScrolling[index][1]) {
      setCSSProperty(this, index, this.options[index][2]);
      return;
    }
    if (this.animating[index]) return;
    this.animating[index] = true;
    window.requestAnimationFrame(updatePropertyScroll.bind(this, index));
  }

  function updatePropertyScroll(index) {
    // get value
    // check if this is a theme value or a css property
    if (isNaN(this.options[index][1])) {
      // this is a theme value to update
      getScrollY(this) >= this.deltaScrolling[index][1]
        ? setCSSProperty(this, index, this.options[index][2])
        : setCSSProperty(this, index, this.options[index][1]);
    } else {
      // this is a CSS property
      var value =
        this.options[index][1] +
        ((this.options[index][2] - this.options[index][1]) *
          (getScrollY(this) - this.deltaScrolling[index][0])) /
          (this.deltaScrolling[index][1] - this.deltaScrolling[index][0]);
      // update css property
      setCSSProperty(this, index, value);
    }

    this.animating[index] = false;
  }

  function setCSSProperty(element, index, value) {
    if (isNaN(value)) {
      // this is a theme value that needs to be updated
      setThemeValue(element, value);
      return;
    }
    if (
      element.options[index][0] == "--scroll-fx-skew" ||
      element.options[index][0] == "--scroll-fx-scale"
    ) {
      // set 2 different CSS properties for the transformation on both x and y axis
      element.element.style.setProperty(
        element.options[index][0] + "-x",
        value + element.options[index][3]
      );
      element.element.style.setProperty(
        element.options[index][0] + "-y",
        value + element.options[index][3]
      );
    } else {
      // set single CSS property
      element.element.style.setProperty(
        element.options[index][0],
        value + element.options[index][3]
      );
    }
  }

  function setThemeValue(element, value) {
    // if value is different from the theme in use -> update it
    if (element.element.getAttribute("data-theme") != value) {
      Util.addClass(element.element, "scroll-fx--theme-transition");
      element.element.offsetWidth;
      element.element.setAttribute("data-theme", value);
      element.element.addEventListener("transitionend", function cb() {
        element.element.removeEventListener("transitionend", cb);
        Util.removeClass(element.element, "scroll-fx--theme-transition");
      });
    }
  }

  function getAnimations(element, index) {
    var option = element.element.getAttribute("data-scroll-fx-" + index);
    if (option) {
      // multiple animations for the same element - iterate through them
      element.options.push(extractAnimation(option));
      getAnimations(element, index + 1);
    }
    return;
  }

  function extractAnimation(option) {
    var array = option.split(",").map(function (item) {
      return item.trim();
    });
    var propertyOptions = getPropertyValues(array[1], array[2]);
    var animation = [
      getPropertyLabel(array[0]),
      propertyOptions[0],
      propertyOptions[1],
      propertyOptions[2],
      parseInt(array[3]),
      parseInt(array[4]),
    ];
    return animation;
  }

  function getPropertyLabel(property) {
    var propertyCss = "--scroll-fx-";
    for (var i = 0; i < property.length; i++) {
      propertyCss =
        property[i] == property[i].toUpperCase()
          ? propertyCss + "-" + property[i].toLowerCase()
          : propertyCss + property[i];
    }
    if (propertyCss == "--scroll-fx-rotate") {
      propertyCss = "--scroll-fx-rotate-z";
    } else if (propertyCss == "--scroll-fx-translate") {
      propertyCss = "--scroll-fx-translate-x";
    }
    return propertyCss;
  }

  function getPropertyValues(val1, val2) {
    var nbVal1 = parseFloat(val1),
      nbVal2 = parseFloat(val2),
      unit = val1.replace(nbVal1, "");
    if (isNaN(nbVal1)) {
      // property is a theme value
      nbVal1 = val1;
      nbVal2 = val2;
      unit = "";
    }
    return [nbVal1, nbVal2, unit];
  }

  function getDeltaScrolling(element, index) {
    // this retrieve the max and min scroll value that should trigger the animation
    var topDelta =
        getScrollY(element) -
        (element.windowHeight -
          ((element.windowHeight + element.boundingRect.height) *
            element.options[index][4]) /
            100) +
        element.boundingRect.top,
      bottomDelta =
        getScrollY(element) -
        (element.windowHeight -
          ((element.windowHeight + element.boundingRect.height) *
            element.options[index][5]) /
            100) +
        element.boundingRect.top;
    return [topDelta, bottomDelta];
  }

  function initResize(element) {
    var resizingId = false;
    window.addEventListener("resize", function () {
      clearTimeout(resizingId);
      resizingId = setTimeout(resetResize.bind(element), 500);
    });
    // emit custom event -> elements have been initialized
    var event = new CustomEvent("scrollFxReady");
    element.element.dispatchEvent(event);
  }

  function resetResize() {
    // on resize -> make sure to update all scrolling delta values
    this.boundingRect = this.element.getBoundingClientRect();
    this.windowHeight = window.innerHeight;
    for (var i = 0; i < this.deltaScrolling.length; i++) {
      this.deltaScrolling[i] = getDeltaScrolling(this, i);
      animateScrollFx.bind(this, i)();
    }
    // emit custom event -> elements have been resized
    var event = new CustomEvent("scrollFxResized");
    this.element.dispatchEvent(event);
  }

  function resetDeltaBeforeAnim(element, index) {
    element.boundingRect = element.element.getBoundingClientRect();
    element.windowHeight = window.innerHeight;
    element.deltaScrolling[index] = getDeltaScrolling(element, index);
  }

  function getScrollY(element) {
    if (!element.scrollableElement) return window.scrollY;
    return element.scrollableElement.scrollTop;
  }

  window.ScrollFx = ScrollFx;

  var scrollFx = document.getElementsByClassName("js-scroll-fx");
  for (var i = 0; i < scrollFx.length; i++) {
    (function (i) {
      var scrollableElement = scrollFx[i].getAttribute(
        "data-scrollable-element"
      );
      new ScrollFx(scrollFx[i], scrollableElement);
    })(i);
  }
})();

// File#: _1_anim-menu-btn
// Usage: codyhouse.co/license
(function () {
  var menuBtns = document.getElementsByClassName("js-anim-menu-btn");
  if (menuBtns.length > 0) {
    for (var i = 0; i < menuBtns.length; i++) {
      (function (i) {
        initMenuBtn(menuBtns[i]);
      })(i);
    }

    function initMenuBtn(btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        var status = !btn.classList.contains("anim-menu-btn--state-b");
        btn.classList.toggle("anim-menu-btn--state-b", status);
        // emit custom event
        var event = new CustomEvent("anim-menu-btn-clicked", {
          detail: status,
        });
        btn.dispatchEvent(event);
      });
    }
  }
})();

// File#: _1_sticky-feature
// Usage: codyhouse.co/license
(function () {
  var StickyFeature = function (element) {
    this.element = element;
    this.contentList = this.element.getElementsByClassName(
      "js-sticky-feature__content-list"
    );
    this.assetsList = this.element.getElementsByClassName(
      "js-sticky-feature__media-list"
    );

    if (this.contentList.length < 1 || this.assetsList.length < 1) return;

    this.contentItems = this.contentList[0].getElementsByClassName(
      "js-sticky-feature__content-item"
    );
    this.assetItems = this.assetsList[0].getElementsByClassName(
      "js-sticky-feature__media-item"
    );

    this.titleItems = this.contentList[0].getElementsByClassName(
      "js-sticky-feature__title"
    );
    this.activeSectionClass = "sticky-feature-current-item";
    this.bindScroll = false;
    this.scrolling = false;
    initStickyFeature(this);
  };

  function initStickyFeature(el) {
    // init observer - detect when feature list enters the viewport and change section
    var observer = new IntersectionObserver(stickyFeatureObserve.bind(el));
    observer.observe(el.contentList[0]);

    // init click on title
    for (var i = 0; i < el.titleItems.length; i++) {
      (function (i) {
        el.titleItems[i].addEventListener("click", function (event) {
          scrollToSection(el, i);
        });
      })(i);
    }
  }

  function stickyFeatureObserve(entries) {
    if (entries[0].isIntersecting) {
      if (!this.bindScroll) {
        getSelectSection(this); // update selected section
        bindScroll(this); // bind window scroll
      }
    } else if (this.bindScroll) {
      unbindScroll(this); // unbind window scroll
      resetSectionVisibility(this); // reset selected section
    }
  }

  function updateVisibleSection(el) {
    // on scroll, detect which section should be selected
    var self = this;
    if (this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(function () {
      getSelectSection(self);
      self.scrolling = false;
    });
  }

  function getSelectSection(el) {
    resetSectionVisibility(el); // remove selected class from all sections
    // get the section to select
    var index = [];
    for (var i = 0; i < el.contentItems.length; i++) {
      if (
        el.contentItems[i].getBoundingClientRect().top <=
        window.innerHeight / 2
      )
        index.push(i);
    }
    var itemIndex = index.length > 0 ? index[index.length - 1] : 0; // select either the first section or the one in the center of the viewport
    selectSection(el, itemIndex);
  }

  function resetSectionVisibility(el) {
    // no section is selected -> remove selected class
    var selectedItems = el.element.getElementsByClassName(
      el.activeSectionClass
    );
    while (selectedItems[0]) {
      selectedItems[0].classList.remove(el.activeSectionClass);
    }
  }

  function selectSection(el, index) {
    el.contentItems[index].classList.add(el.activeSectionClass);
    el.assetItems[index].classList.add(el.activeSectionClass);
  }

  function scrollToSection(el, index) {
    // on click - scroll to the selected section
    if (el.assetsList[0].offsetWidth < 1) return;
    window.scrollBy({
      top:
        el.titleItems[index].getBoundingClientRect().top -
        window.innerHeight / 2 +
        10,
      behavior: "smooth",
    });
  }

  function bindScroll(el) {
    if (!el.bindScroll) {
      el.bindScroll = updateVisibleSection.bind(el);
      window.addEventListener("scroll", el.bindScroll);
    }
  }

  function unbindScroll(el) {
    if (el.bindScroll) {
      window.removeEventListener("scroll", el.bindScroll);
      el.bindScroll = false;
    }
  }

  window.StickyFeature = StickyFeature;

  //initialize the StickyFeature objects
  var stickyFeatures = document.getElementsByClassName("js-sticky-feature");
  if (stickyFeatures.length > 0) {
    for (var i = 0; i < stickyFeatures.length; i++) {
      (function (i) {
        new StickyFeature(stickyFeatures[i]);
      })(i);
    }
  }
})();

// File#: _1_modal-window
// Usage: codyhouse.co/license
(function () {
  var Modal = function (element) {
    this.element = element;
    this.triggers = document.querySelectorAll(
      '[aria-controls="' + this.element.getAttribute("id") + '"]'
    );
    this.firstFocusable = null;
    this.lastFocusable = null;
    this.moveFocusEl = null; // focus will be moved to this element when modal is open
    this.modalFocus = this.element.getAttribute("data-modal-first-focus")
      ? this.element.querySelector(
          this.element.getAttribute("data-modal-first-focus")
        )
      : null;
    this.selectedTrigger = null;
    this.preventScrollEl = this.getPreventScrollEl();
    this.showClass = "modal--is-visible";
    this.initModal();
  };

  Modal.prototype.getPreventScrollEl = function () {
    var scrollEl = false;
    var querySelector = this.element.getAttribute("data-modal-prevent-scroll");
    if (querySelector) scrollEl = document.querySelector(querySelector);
    return scrollEl;
  };

  Modal.prototype.initModal = function () {
    var self = this;
    //open modal when clicking on trigger buttons
    if (this.triggers) {
      for (var i = 0; i < this.triggers.length; i++) {
        this.triggers[i].addEventListener("click", function (event) {
          event.preventDefault();
          if (self.element.classList.contains(self.showClass)) {
            self.closeModal();
            return;
          }
          self.selectedTrigger = event.currentTarget;
          self.showModal();
          self.initModalEvents();
        });
      }
    }

    // listen to the openModal event -> open modal without a trigger button
    this.element.addEventListener("openModal", function (event) {
      if (event.detail) self.selectedTrigger = event.detail;
      self.showModal();
      self.initModalEvents();
    });

    // listen to the closeModal event -> close modal without a trigger button
    this.element.addEventListener("closeModal", function (event) {
      if (event.detail) self.selectedTrigger = event.detail;
      self.closeModal();
    });

    // if modal is open by default -> initialise modal events
    if (this.element.classList.contains(this.showClass)) this.initModalEvents();
  };

  Modal.prototype.showModal = function () {
    var self = this;
    this.element.classList.add(this.showClass);
    this.getFocusableElements();
    if (this.moveFocusEl) {
      this.moveFocusEl.focus();
      // wait for the end of transitions before moving focus
      this.element.addEventListener("transitionend", function cb(event) {
        self.moveFocusEl.focus();
        self.element.removeEventListener("transitionend", cb);
      });
    }
    this.emitModalEvents("modalIsOpen");
    // change the overflow of the preventScrollEl
    if (this.preventScrollEl) this.preventScrollEl.style.overflow = "hidden";
  };

  Modal.prototype.closeModal = function () {
    if (!this.element.classList.contains(this.showClass)) return;
    this.element.classList.remove(this.showClass);
    this.firstFocusable = null;
    this.lastFocusable = null;
    this.moveFocusEl = null;
    if (this.selectedTrigger) this.selectedTrigger.focus();
    //remove listeners
    this.cancelModalEvents();
    this.emitModalEvents("modalIsClose");
    // change the overflow of the preventScrollEl
    if (this.preventScrollEl) this.preventScrollEl.style.overflow = "";
  };

  Modal.prototype.initModalEvents = function () {
    //add event listeners
    this.element.addEventListener("keydown", this);
    this.element.addEventListener("click", this);
  };

  Modal.prototype.cancelModalEvents = function () {
    //remove event listeners
    this.element.removeEventListener("keydown", this);
    this.element.removeEventListener("click", this);
  };

  Modal.prototype.handleEvent = function (event) {
    switch (event.type) {
      case "click": {
        this.initClick(event);
      }
      case "keydown": {
        this.initKeyDown(event);
      }
    }
  };

  Modal.prototype.initKeyDown = function (event) {
    if (
      (event.keyCode && event.keyCode == 9) ||
      (event.key && event.key == "Tab")
    ) {
      //trap focus inside modal
      this.trapFocus(event);
    } else if (
      ((event.keyCode && event.keyCode == 13) ||
        (event.key && event.key == "Enter")) &&
      event.target.closest(".js-modal__close")
    ) {
      event.preventDefault();
      this.closeModal(); // close modal when pressing Enter on close button
    }
  };

  Modal.prototype.initClick = function (event) {
    //close modal when clicking on close button or modal bg layer
    if (
      !event.target.closest(".js-modal__close") &&
      !event.target.classList.contains("js-modal")
    )
      return;
    event.preventDefault();
    this.closeModal();
  };

  Modal.prototype.trapFocus = function (event) {
    if (this.firstFocusable == document.activeElement && event.shiftKey) {
      //on Shift+Tab -> focus last focusable element when focus moves out of modal
      event.preventDefault();
      this.lastFocusable.focus();
    }
    if (this.lastFocusable == document.activeElement && !event.shiftKey) {
      //on Tab -> focus first focusable element when focus moves out of modal
      event.preventDefault();
      this.firstFocusable.focus();
    }
  };

  Modal.prototype.getFocusableElements = function () {
    //get all focusable elements inside the modal
    var allFocusable = this.element.querySelectorAll(focusableElString);
    this.getFirstVisible(allFocusable);
    this.getLastVisible(allFocusable);
    this.getFirstFocusable();
  };

  Modal.prototype.getFirstVisible = function (elements) {
    //get first visible focusable element inside the modal
    for (var i = 0; i < elements.length; i++) {
      if (isVisible(elements[i])) {
        this.firstFocusable = elements[i];
        break;
      }
    }
  };

  Modal.prototype.getLastVisible = function (elements) {
    //get last visible focusable element inside the modal
    for (var i = elements.length - 1; i >= 0; i--) {
      if (isVisible(elements[i])) {
        this.lastFocusable = elements[i];
        break;
      }
    }
  };

  Modal.prototype.getFirstFocusable = function () {
    if (!this.modalFocus || !Element.prototype.matches) {
      this.moveFocusEl = this.firstFocusable;
      return;
    }
    var containerIsFocusable = this.modalFocus.matches(focusableElString);
    if (containerIsFocusable) {
      this.moveFocusEl = this.modalFocus;
    } else {
      this.moveFocusEl = false;
      var elements = this.modalFocus.querySelectorAll(focusableElString);
      for (var i = 0; i < elements.length; i++) {
        if (isVisible(elements[i])) {
          this.moveFocusEl = elements[i];
          break;
        }
      }
      if (!this.moveFocusEl) this.moveFocusEl = this.firstFocusable;
    }
  };

  Modal.prototype.emitModalEvents = function (eventName) {
    var event = new CustomEvent(eventName, {detail: this.selectedTrigger});
    this.element.dispatchEvent(event);
  };

  function isVisible(element) {
    return (
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    );
  }

  window.Modal = Modal;

  //initialize the Modal objects
  var modals = document.getElementsByClassName("js-modal");
  // generic focusable elements string selector
  var focusableElString =
    '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary';
  if (modals.length > 0) {
    var modalArrays = [];
    for (var i = 0; i < modals.length; i++) {
      (function (i) {
        modalArrays.push(new Modal(modals[i]));
      })(i);
    }

    window.addEventListener("keydown", function (event) {
      //close modal window on esc
      if (
        (event.keyCode && event.keyCode == 27) ||
        (event.key && event.key.toLowerCase() == "escape")
      ) {
        for (var i = 0; i < modalArrays.length; i++) {
          (function (i) {
            modalArrays[i].closeModal();
          })(i);
        }
      }
    });
  }
})();

// File#: _1_custom-cursor
// Usage: codyhouse.co/license
(function () {
  var CustomCursor = function (element) {
    this.element = element;
    this.targets = document.querySelectorAll(
      '[data-custom-cursor="' + this.element.getAttribute("id") + '"]'
    );
    this.target = false;
    this.moving = false;

    // cursor classes
    this.inClass = "c-cursor--in";
    this.outClass = "c-cursor--out";
    this.positionClass = "c-cursor--";

    initCustomCursor(this);
  };

  function initCustomCursor(obj) {
    if (!window.matchMedia("(pointer: coarse)").matches) {
      if (obj.targets.length == 0) return;
      // init events
      for (var i = 0; i < obj.targets.length; i++) {
        (function (i) {
          obj.targets[i].addEventListener("mouseenter", handleEvent.bind(obj));
        })(i);
      }
    }
  }

  function handleEvent(event) {
    if (
      document.querySelectorAll(
        '[data-custom-cursor="' + this.element.getAttribute("id") + '"]'
      ).length > 0
    ) {
      switch (event.type) {
        case "mouseenter": {
          initMouseEnter(this, event);
          break;
        }
        case "mouseleave": {
          initMouseLeave(this, event);
          break;
        }
        case "mousemove": {
          initMouseMove(this, event);
          break;
        }
      }
    } else {
      initMouseLeave(this, event);
    }
  }

  function initMouseEnter(obj, event) {
    removeTargetEvents(obj);
    obj.target = event.currentTarget;
    // listen for move and leave events
    obj.target.addEventListener("mousemove", handleEvent.bind(obj));
    obj.target.addEventListener("mouseleave", handleEvent.bind(obj));
    // show custom cursor
    toggleCursor(obj, true);
    // place custom cursor
    moveCursor(obj, event);
  }

  function initMouseLeave(obj, event) {
    removeTargetEvents(obj);
    toggleCursor(obj, false);
    if (obj.moving) {
      window.cancelAnimationFrame(obj.moving);
      obj.moving = false;
    }
  }

  function removeTargetEvents(obj) {
    if (obj.target) {
      obj.target.removeEventListener("mousemove", handleEvent.bind(obj));
      obj.target.removeEventListener("mouseleave", handleEvent.bind(obj));
      obj.target = false;
    }
  }

  function initMouseMove(obj, event) {
    if (obj.moving) return;
    obj.moving = window.requestAnimationFrame(function () {
      moveCursor(obj, event);
    });
  }

  function moveCursor(obj, event) {
    obj.element.style.transform =
      "translateX(" + event.clientX + "px) translateY(" + event.clientY + "px)";
    // set position classes
    updatePositionClasses(obj, event.clientX, event.clientY);
    obj.moving = false;
  }

  function updatePositionClasses(obj, xposition, yposition) {
    if (!obj.target) return;
    var targetBoundingRect = obj.target.getBoundingClientRect();
    var isLeft =
        xposition < targetBoundingRect.left + targetBoundingRect.width / 2,
      isTop =
        yposition < targetBoundingRect.top + targetBoundingRect.height / 2;

    // reset classes
    obj.element.classList.toggle(obj.positionClass + "left", isLeft);
    obj.element.classList.toggle(obj.positionClass + "right", !isLeft);
    obj.element.classList.toggle(obj.positionClass + "top", isTop);
    obj.element.classList.toggle(obj.positionClass + "bottom", !isTop);
  }

  function toggleCursor(obj, bool) {
    obj.element.classList.toggle(obj.outClass, !bool);
    obj.element.classList.toggle(obj.inClass, bool);
  }

  window.CustomCursor = CustomCursor;

  var cCursor = document.getElementsByClassName("js-c-cursor");
  if (
    cCursor.length > 0 &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    for (var i = 0; i < cCursor.length; i++) {
      (function (i) {
        let tmp = new CustomCursor(cCursor[i]);
      })(i);
    }
  }
})();

// File#: _1_filter
// Usage: codyhouse.co/license
(function () {
  var Filter = function (opts) {
    this.options = extendProps(Filter.defaults, opts); // used to store custom filter/sort functions
    this.element = this.options.element;
    this.elementId = this.element.getAttribute("id");
    this.items = this.element.querySelectorAll(".js-filter__item");
    this.controllers = document.querySelectorAll(
      '[aria-controls="' + this.elementId + '"]'
    ); // controllers wrappers
    this.fallbackMessage = document.querySelector(
      '[data-fallback-gallery-id="' + this.elementId + '"]'
    );
    this.filterString = []; // combination of different filter values
    this.sortingString = ""; // sort value - will include order and type of argument (e.g., number or string)
    // store info about sorted/filtered items
    this.filterList = []; // list of boolean for each this.item -> true if still visible , otherwise false
    this.sortingList = []; // list of new ordered this.item -> each element is [item, originalIndex]

    // store grid info for animation
    this.itemsGrid = []; // grid coordinates
    this.itemsInitPosition = []; // used to store coordinates of this.items before animation
    this.itemsIterPosition = []; // used to store coordinates of this.items before animation - intermediate state
    this.itemsFinalPosition = []; // used to store coordinates of this.items after filtering

    // animation off
    this.animateOff =
      this.element.getAttribute("data-filter-animation") == "off";
    // used to update this.itemsGrid on resize
    this.resizingId = false;
    // default acceleration style - improve animation
    this.accelerateStyle =
      "will-change: transform, opacity; transform: translateZ(0); backface-visibility: hidden;";

    // handle multiple changes
    this.animating = false;
    this.reanimate = false;

    initFilter(this);
  };

  function initFilter(filter) {
    resetFilterSortArray(filter, true, true); // init array filter.filterList/filter.sortingList
    createGridInfo(filter); // store grid coordinates in filter.itemsGrid
    initItemsOrder(filter); // add data-orders so that we can reset the sorting

    // events handling - filter update
    for (var i = 0; i < filter.controllers.length; i++) {
      filter.filterString[i] = ""; // reset filtering

      // get proper filter/sorting string based on selected controllers
      (function (i) {
        filter.controllers[i].addEventListener("change", function (event) {
          if (event.target.tagName.toLowerCase() == "select") {
            // select elements
            !event.target.getAttribute("data-filter")
              ? setSortingString(
                  filter,
                  event.target.value,
                  event.target.options[event.target.selectedIndex]
                )
              : setFilterString(filter, i, "select");
          } else if (
            event.target.tagName.toLowerCase() == "input" &&
            (event.target.getAttribute("type") == "radio" ||
              event.target.getAttribute("type") == "checkbox")
          ) {
            // input (radio/checkboxed) elements
            !event.target.getAttribute("data-filter")
              ? setSortingString(
                  filter,
                  event.target.getAttribute("data-sort"),
                  event.target
                )
              : setFilterString(filter, i, "input");
          } else {
            // generic inout element
            !filter.controllers[i].getAttribute("data-filter")
              ? setSortingString(
                  filter,
                  filter.controllers[i].getAttribute("data-sort"),
                  filter.controllers[i]
                )
              : setFilterString(filter, i, "custom");
          }

          updateFilterArray(filter);
        });

        filter.controllers[i].addEventListener("click", function (event) {
          // retunr if target is select/input elements
          var filterEl = event.target.closest("[data-filter]");
          var sortEl = event.target.closest("[data-sort]");
          if (!filterEl && !sortEl) return;
          if (
            filterEl &&
            (filterEl.tagName.toLowerCase() == "input" ||
              filterEl.tagName.toLowerCase() == "select")
          )
            return;
          if (
            sortEl &&
            (sortEl.tagName.toLowerCase() == "input" ||
              sortEl.tagName.toLowerCase() == "select")
          )
            return;
          if (sortEl && sortEl.classList.contains("js-filter__custom-control"))
            return;
          if (
            filterEl &&
            filterEl.classList.contains("js-filter__custom-control")
          )
            return;
          // this will be executed only for a list of buttons -> no inputs
          event.preventDefault();
          resetControllersList(filter, i, filterEl, sortEl);
          sortEl
            ? setSortingString(filter, sortEl.getAttribute("data-sort"), sortEl)
            : setFilterString(filter, i, "button");
          updateFilterArray(filter);
        });

        // target search inputs -> update them on 'input'
        filter.controllers[i].addEventListener("input", function (event) {
          if (
            event.target.tagName.toLowerCase() == "input" &&
            (event.target.getAttribute("type") == "search" ||
              event.target.getAttribute("type") == "text")
          ) {
            setFilterString(filter, i, "custom");
            updateFilterArray(filter);
          }
        });
      })(i);
    }

    // handle resize - update grid coordinates in filter.itemsGrid
    window.addEventListener("resize", function () {
      clearTimeout(filter.resizingId);
      filter.resizingId = setTimeout(function () {
        createGridInfo(filter);
      }, 300);
    });

    // check if there are filters/sorting values already set
    checkInitialFiltering(filter);

    // reset filtering results if filter selection was changed by an external control (e.g., form reset)
    filter.element.addEventListener("update-filter-results", function (event) {
      // reset filters first
      for (var i = 0; i < filter.controllers.length; i++)
        filter.filterString[i] = "";
      filter.sortingString = "";
      checkInitialFiltering(filter);
    });
  }

  function checkInitialFiltering(filter) {
    for (var i = 0; i < filter.controllers.length; i++) {
      // check if there's a selected option
      // buttons list
      var selectedButton =
        filter.controllers[i].getElementsByClassName("js-filter-selected");
      if (selectedButton.length > 0) {
        var sort = selectedButton[0].getAttribute("data-sort");
        sort
          ? setSortingString(
              filter,
              selectedButton[0].getAttribute("data-sort"),
              selectedButton[0]
            )
          : setFilterString(filter, i, "button");
        continue;
      }

      // input list
      var selectedInput =
        filter.controllers[i].querySelectorAll("input:checked");
      if (selectedInput.length > 0) {
        var sort = selectedInput[0].getAttribute("data-sort");
        sort
          ? setSortingString(filter, sort, selectedInput[0])
          : setFilterString(filter, i, "input");
        continue;
      }
      // select item
      if (filter.controllers[i].tagName.toLowerCase() == "select") {
        var sort = filter.controllers[i].getAttribute("data-sort");
        sort
          ? setSortingString(
              filter,
              filter.controllers[i].value,
              filter.controllers[i].options[filter.controllers[i].selectedIndex]
            )
          : setFilterString(filter, i, "select");
        continue;
      }
      // check if there's a generic custom input
      var radioInput = filter.controllers[i].querySelector(
          'input[type="radio"]'
        ),
        checkboxInput = filter.controllers[i].querySelector(
          'input[type="checkbox"]'
        );
      if (!radioInput && !checkboxInput) {
        var sort = filter.controllers[i].getAttribute("data-sort");
        var filterString = filter.controllers[i].getAttribute("data-filter");
        if (sort) setSortingString(filter, sort, filter.controllers[i]);
        else if (filterString) setFilterString(filter, i, "custom");
      }
    }

    updateFilterArray(filter);
  }

  function setSortingString(filter, value, item) {
    // get sorting string value-> sortName:order:type
    var order = item.getAttribute("data-sort-order") ? "desc" : "asc";
    var type = item.getAttribute("data-sort-number") ? "number" : "string";
    filter.sortingString = value + ":" + order + ":" + type;
  }

  function setFilterString(filter, index, type) {
    // get filtering array -> [filter1:filter2, filter3, filter4:filter5]
    if (type == "input") {
      var checkedInputs =
        filter.controllers[index].querySelectorAll("input:checked");
      filter.filterString[index] = "";
      for (var i = 0; i < checkedInputs.length; i++) {
        filter.filterString[index] =
          filter.filterString[index] +
          checkedInputs[i].getAttribute("data-filter") +
          ":";
      }
    } else if (type == "select") {
      if (filter.controllers[index].multiple) {
        // select with multiple options
        filter.filterString[index] = getMultipleSelectValues(
          filter.controllers[index]
        );
      } else {
        // select with single option
        filter.filterString[index] = filter.controllers[index].value;
      }
    } else if (type == "button") {
      var selectedButtons = filter.controllers[index].querySelectorAll(
        ".js-filter-selected"
      );
      filter.filterString[index] = "";
      for (var i = 0; i < selectedButtons.length; i++) {
        filter.filterString[index] =
          filter.filterString[index] +
          selectedButtons[i].getAttribute("data-filter") +
          ":";
      }
    } else if (type == "custom") {
      filter.filterString[index] =
        filter.controllers[index].getAttribute("data-filter");
    }
  }

  function resetControllersList(filter, index, target1, target2) {
    // for a <button>s list -> toggle js-filter-selected + custom classes
    var multi = filter.controllers[index].getAttribute("data-filter-checkbox"),
      customClass = filter.controllers[index].getAttribute(
        "data-selected-class"
      );

    customClass = customClass
      ? "js-filter-selected " + customClass
      : "js-filter-selected";
    if (multi == "true") {
      // multiple options can be on
      target1
        ? toggleClass(
            target1,
            customClass,
            !target1.classList.contains("js-filter-selected")
          )
        : toggleClass(
            target2,
            customClass,
            !target2.classList.contains("js-filter-selected")
          );
    } else {
      // only one element at the time
      // remove the class from all siblings
      var selectedOption = filter.controllers[index].querySelector(
        ".js-filter-selected"
      );
      if (selectedOption) removeClass(selectedOption, customClass);
      target1 ? addClass(target1, customClass) : addClass(target2, customClass);
    }
  }

  function updateFilterArray(filter) {
    // sort/filter strings have been updated -> so you can update the gallery
    if (filter.animating) {
      filter.reanimate = true;
      return;
    }
    filter.animating = true;
    filter.reanimate = false;
    createGridInfo(filter); // get new grid coordinates
    sortingGallery(filter); // update sorting list
    filteringGallery(filter); // update filter list
    resetFallbackMessage(filter, true); // toggle fallback message
    if (reducedMotion || filter.animateOff) {
      resetItems(filter);
    } else {
      updateItemsAttributes(filter);
    }
  }

  function sortingGallery(filter) {
    // use sorting string to reorder gallery
    var sortOptions = filter.sortingString.split(":");
    if (sortOptions[0] == "" || sortOptions[0] == "*") {
      // no sorting needed
      restoreSortOrder(filter);
    } else {
      // need to sort
      if (filter.options[sortOptions[0]]) {
        // custom sort function -> user takes care of it
        filter.sortingList = filter.options[sortOptions[0]](filter.sortingList);
      } else {
        filter.sortingList.sort(function (left, right) {
          var leftVal = left[0].getAttribute("data-sort-" + sortOptions[0]),
            rightVal = right[0].getAttribute("data-sort-" + sortOptions[0]);
          if (sortOptions[2] == "number") {
            leftVal = parseFloat(leftVal);
            rightVal = parseFloat(rightVal);
          }
          if (sortOptions[1] == "desc") return leftVal <= rightVal ? 1 : -1;
          else return leftVal >= rightVal ? 1 : -1;
        });
      }
    }
  }

  function filteringGallery(filter) {
    // use filtering string to reorder gallery
    resetFilterSortArray(filter, true, false);
    // we can have multiple filters
    for (var i = 0; i < filter.filterString.length; i++) {
      //check if multiple filters inside the same controller
      if (
        filter.filterString[i] != "" &&
        filter.filterString[i] != "*" &&
        filter.filterString[i] != " "
      ) {
        singleFilterGallery(filter, filter.filterString[i].split(":"));
      }
    }
  }

  function singleFilterGallery(filter, subfilter) {
    if (!subfilter || subfilter == "" || subfilter == "*") return;
    // check if we have custom options
    var customFilterArray = [];
    for (var j = 0; j < subfilter.length; j++) {
      if (filter.options[subfilter[j]]) {
        // custom function
        customFilterArray[subfilter[j]] = filter.options[subfilter[j]](
          filter.items
        );
      }
    }

    for (var i = 0; i < filter.items.length; i++) {
      var filterValues = filter.items[i].getAttribute("data-filter").split(" ");
      var present = false;
      for (var j = 0; j < subfilter.length; j++) {
        if (
          filter.options[subfilter[j]] &&
          customFilterArray[subfilter[j]][i]
        ) {
          // custom function
          present = true;
          break;
        } else if (
          subfilter[j] == "*" ||
          filterValues.indexOf(subfilter[j]) > -1
        ) {
          present = true;
          break;
        }
      }
      filter.filterList[i] = !present ? false : filter.filterList[i];
    }
  }

  function updateItemsAttributes(filter) {
    // set items before triggering the update animation
    // get offset of all elements before animation
    storeOffset(filter, filter.itemsInitPosition);
    // set height of container
    filter.element.setAttribute(
      "style",
      "height: " +
        parseFloat(filter.element.offsetHeight) +
        "px; width: " +
        parseFloat(filter.element.offsetWidth) +
        "px;"
    );

    for (var i = 0; i < filter.items.length; i++) {
      // remove hidden class from items now visible and scale to zero
      if (
        filter.items[i].classList.contains("hidden") &&
        filter.filterList[i]
      ) {
        filter.items[i].setAttribute("data-scale", "on");
        filter.items[i].setAttribute(
          "style",
          filter.accelerateStyle + "transform: scale(0.5); opacity: 0;"
        );
        removeClass(filter.items[i], "hidden");
      }
    }
    // get new elements offset
    storeOffset(filter, filter.itemsIterPosition);
    // translate items so that they are in the right initial position
    for (var i = 0; i < filter.items.length; i++) {
      if (filter.items[i].getAttribute("data-scale") != "on") {
        filter.items[i].setAttribute(
          "style",
          filter.accelerateStyle +
            "transform: translateX(" +
            parseInt(
              filter.itemsInitPosition[i][0] - filter.itemsIterPosition[i][0]
            ) +
            "px) translateY(" +
            parseInt(
              filter.itemsInitPosition[i][1] - filter.itemsIterPosition[i][1]
            ) +
            "px);"
        );
      }
    }

    animateItems(filter);
  }

  function animateItems(filter) {
    var transitionValue =
      "transform " +
      filter.options.duration +
      "ms cubic-bezier(0.455, 0.03, 0.515, 0.955), opacity " +
      filter.options.duration +
      "ms";

    // get new index of items in the list
    var j = 0;
    for (var i = 0; i < filter.sortingList.length; i++) {
      var item = filter.items[filter.sortingList[i][1]];
      if (
        item.classList.contains("hidden") ||
        !filter.filterList[filter.sortingList[i][1]]
      ) {
        // item is hidden or was previously hidden -> final position equal to first one
        filter.itemsFinalPosition[filter.sortingList[i][1]] =
          filter.itemsIterPosition[filter.sortingList[i][1]];
        if (item.getAttribute("data-scale") == "on") j = j + 1;
      } else {
        filter.itemsFinalPosition[filter.sortingList[i][1]] = [
          filter.itemsGrid[j][0],
          filter.itemsGrid[j][1],
        ]; // left/top
        j = j + 1;
      }
    }

    setTimeout(function () {
      for (var i = 0; i < filter.items.length; i++) {
        if (
          filter.filterList[i] &&
          filter.items[i].getAttribute("data-scale") == "on"
        ) {
          // scale up item
          filter.items[i].setAttribute(
            "style",
            filter.accelerateStyle +
              "transition: " +
              transitionValue +
              "; transform: translateX(" +
              parseInt(
                filter.itemsFinalPosition[i][0] - filter.itemsIterPosition[i][0]
              ) +
              "px) translateY(" +
              parseInt(
                filter.itemsFinalPosition[i][1] - filter.itemsIterPosition[i][1]
              ) +
              "px) scale(1); opacity: 1;"
          );
        } else if (filter.filterList[i]) {
          // translate item
          filter.items[i].setAttribute(
            "style",
            filter.accelerateStyle +
              "transition: " +
              transitionValue +
              "; transform: translateX(" +
              parseInt(
                filter.itemsFinalPosition[i][0] - filter.itemsIterPosition[i][0]
              ) +
              "px) translateY(" +
              parseInt(
                filter.itemsFinalPosition[i][1] - filter.itemsIterPosition[i][1]
              ) +
              "px);"
          );
        } else {
          // scale down item
          filter.items[i].setAttribute(
            "style",
            filter.accelerateStyle +
              "transition: " +
              transitionValue +
              "; transform: scale(0.5); opacity: 0;"
          );
        }
      }
    }, 50);

    // wait for the end of transition of visible elements
    setTimeout(function () {
      resetItems(filter);
    }, filter.options.duration + 100);
  }

  function resetItems(filter) {
    // animation was off or animation is over -> reset attributes
    for (var i = 0; i < filter.items.length; i++) {
      filter.items[i].removeAttribute("style");
      toggleClass(filter.items[i], "hidden", !filter.filterList[i]);
      filter.items[i].removeAttribute("data-scale");
    }

    for (var i = 0; i < filter.items.length; i++) {
      // reorder
      filter.element.appendChild(filter.items[filter.sortingList[i][1]]);
    }

    filter.items = [];
    filter.items = filter.element.querySelectorAll(".js-filter__item");
    resetFilterSortArray(filter, false, true);
    filter.element.removeAttribute("style");
    filter.animating = false;
    if (filter.reanimate) {
      updateFilterArray(filter);
    }

    resetFallbackMessage(filter, false); // toggle fallback message

    // emit custom event - end of filtering
    filter.element.dispatchEvent(new CustomEvent("filter-selection-updated"));
  }

  function resetFilterSortArray(filter, filtering, sorting) {
    for (var i = 0; i < filter.items.length; i++) {
      if (filtering) filter.filterList[i] = true;
      if (sorting) filter.sortingList[i] = [filter.items[i], i];
    }
  }

  function createGridInfo(filter) {
    var containerWidth = parseFloat(
        window.getComputedStyle(filter.element).getPropertyValue("width")
      ),
      itemStyle,
      itemWidth,
      itemHeight,
      marginX,
      marginY,
      colNumber;

    // get offset first visible element
    for (var i = 0; i < filter.items.length; i++) {
      if (!filter.items[i].classList.contains("hidden")) {
        (itemStyle = window.getComputedStyle(filter.items[i])),
          (itemWidth = parseFloat(itemStyle.getPropertyValue("width"))),
          (itemHeight = parseFloat(itemStyle.getPropertyValue("height"))),
          (marginX =
            parseFloat(itemStyle.getPropertyValue("margin-left")) +
            parseFloat(itemStyle.getPropertyValue("margin-right"))),
          (marginY =
            parseFloat(itemStyle.getPropertyValue("margin-bottom")) +
            parseFloat(itemStyle.getPropertyValue("margin-top")));
        if (marginX == 0 && marginY == 0) {
          // grid is set using the gap property and not margins
          var margins = resetMarginValues(filter);
          marginX = margins[0];
          marginY = margins[1];
        }
        var colNumber = parseInt(
          (containerWidth + marginX) / (itemWidth + marginX)
        );
        filter.itemsGrid[0] = [
          filter.items[i].offsetLeft,
          filter.items[i].offsetTop,
        ]; // left, top
        break;
      }
    }

    for (var i = 1; i < filter.items.length; i++) {
      var x = i < colNumber ? i : i % colNumber,
        y = i < colNumber ? 0 : Math.floor(i / colNumber);
      filter.itemsGrid[i] = [
        filter.itemsGrid[0][0] + x * (itemWidth + marginX),
        filter.itemsGrid[0][1] + y * (itemHeight + marginY),
      ];
    }
  }

  function storeOffset(filter, array) {
    for (var i = 0; i < filter.items.length; i++) {
      array[i] = [filter.items[i].offsetLeft, filter.items[i].offsetTop];
    }
  }

  function initItemsOrder(filter) {
    for (var i = 0; i < filter.items.length; i++) {
      filter.items[i].setAttribute("data-init-sort-order", i);
    }
  }

  function restoreSortOrder(filter) {
    for (var i = 0; i < filter.items.length; i++) {
      filter.sortingList[
        parseInt(filter.items[i].getAttribute("data-init-sort-order"))
      ] = [filter.items[i], i];
    }
  }

  function resetFallbackMessage(filter, bool) {
    if (!filter.fallbackMessage) return;
    var show = true;
    for (var i = 0; i < filter.filterList.length; i++) {
      if (filter.filterList[i]) {
        show = false;
        break;
      }
    }
    if (bool) {
      // reset visibility before animation is triggered
      if (!show) addClass(filter.fallbackMessage, "hidden");
      return;
    }
    toggleClass(filter.fallbackMessage, "hidden", !show);
  }

  function getMultipleSelectValues(multipleSelect) {
    // get selected options of a <select multiple> element
    var options = multipleSelect.options,
      value = "";
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        if (value != "") value = value + ":";
        value = value + options[i].value;
      }
    }
    return value;
  }

  function resetMarginValues(filter) {
    var gapX = getComputedStyle(filter.element).getPropertyValue("--gap-x"),
      gapY = getComputedStyle(filter.element).getPropertyValue("--gap-y"),
      gap = getComputedStyle(filter.element).getPropertyValue("--gap"),
      gridGap = [0, 0];

    // if the gap property is used to create the grid (not margin left/right) -> get gap values rather than margins
    // check if the --gap/--gap-x/--gap-y
    var newDiv = document.createElement("div"),
      cssText = "position: absolute; opacity: 0; width: 0px; height: 0px";
    if (gapX && gapY) {
      cssText =
        "position: absolute; opacity: 0; width: " + gapX + "; height: " + gapY;
    } else if (gap) {
      cssText =
        "position: absolute; opacity: 0; width: " + gap + "; height: " + gap;
    } else if (gapX) {
      cssText =
        "position: absolute; opacity: 0; width: " + gapX + "; height: 0px";
    } else if (gapY) {
      cssText = "position: absolute; opacity: 0; width: 0px; height: " + gapY;
    } else {
      // --gap/--gap-x/--gap-y properties are not defined -> get grid gap property values
      gapX = getGridGap(filter, "columns", filter.element.offsetWidth);
      gapY = getGridGap(filter, "rows", filter.element.offsetHeight);
      if (isNaN(gapY)) gapY = gapX;
      cssText =
        "position: absolute; opacity: 0; width: " + gapX + "; height: " + gapY;
    }
    newDiv.style.cssText = cssText;
    filter.element.appendChild(newDiv);
    var boundingRect = newDiv.getBoundingClientRect();
    gridGap = [boundingRect.width, boundingRect.height];
    filter.element.removeChild(newDiv);
    return gridGap;
  }

  function getGridGap(filter, direction, containerSize) {
    var computedStyle = getComputedStyle(filter.element),
      template = computedStyle.getPropertyValue("grid-template-" + direction);

    var arrayEl = template.split(" "),
      gap =
        (containerSize - parseFloat(arrayEl[0]) * arrayEl.length) /
        (arrayEl.length - 1);
    return gap + "px";
  }

  function toggleClass(el, className, bool) {
    if (bool) addClass(el, className);
    else removeClass(el, className);
  }

  function addClass(el, className) {
    var classList = className.split(" ");
    el.classList.add(classList[0]);
    if (classList.length > 1) addClass(el, classList.slice(1).join(" "));
  }

  function removeClass(el, className) {
    var classList = className.split(" ");
    el.classList.remove(classList[0]);
    if (classList.length > 1) removeClass(el, classList.slice(1).join(" "));
  }

  var extendProps = function () {
    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;
    // Check if a deep merge
    if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
      deep = arguments[0];
      i++;
    }
    // Merge the object into the extended object
    var merge = function (obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          // If deep merge and property is an object, merge properties
          if (
            deep &&
            Object.prototype.toString.call(obj[prop]) === "[object Object]"
          ) {
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };
    // Loop through each object and conduct a merge
    for (; i < length; i++) {
      var obj = arguments[i];
      merge(obj);
    }
    return extended;
  };

  Filter.defaults = {
    element: false,
    duration: 400,
  };

  window.Filter = Filter;

  // init Filter object
  var filterGallery = document.getElementsByClassName("js-filter"),
    reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  if (filterGallery.length > 0) {
    for (var i = 0; i < filterGallery.length; i++) {
      var duration = filterGallery[i].getAttribute("data-filter-duration");
      if (!duration) duration = Filter.defaults.duration;
      new Filter({element: filterGallery[i], duration: duration});
    }
  }
})();

// File#: _1_filter-navigation
// Usage: codyhouse.co/license
(function () {
  var FilterNav = function (element) {
    this.element = element;
    this.wrapper = this.element.getElementsByClassName(
      "js-filter-nav__wrapper"
    )[0];
    this.nav = this.element.getElementsByClassName("js-filter-nav__nav")[0];
    this.list = this.nav.getElementsByClassName("js-filter-nav__list")[0];
    this.control = this.element.getElementsByClassName(
      "js-filter-nav__control"
    )[0];
    this.modalClose = this.element.getElementsByClassName(
      "js-filter-nav__close-btn"
    )[0];
    this.placeholder = this.element.getElementsByClassName(
      "js-filter-nav__placeholder"
    )[0];
    this.marker = this.element.getElementsByClassName("js-filter-nav__marker");
    this.layout = "expanded";
    initFilterNav(this);
  };

  function initFilterNav(element) {
    checkLayout(element); // init layout
    if (element.layout == "expanded") placeMarker(element);
    element.element.addEventListener("update-layout", function (event) {
      // on resize - modify layout
      checkLayout(element);
    });

    // update selected item
    element.wrapper.addEventListener("click", function (event) {
      var newItem = event.target.closest(".js-filter-nav__btn");
      if (newItem) {
        updateCurrentItem(element, newItem);
        return;
      }
      // close modal list - mobile version only
      if (
        event.target.classList.contains("js-filter-nav__wrapper") ||
        event.target.closest(".js-filter-nav__close-btn")
      )
        toggleModalList(element, false);
    });

    // open modal list - mobile version only
    element.control.addEventListener("click", function (event) {
      toggleModalList(element, true);
    });

    // listen for key events
    window.addEventListener("keyup", function (event) {
      // listen for esc key
      if (
        (event.keyCode && event.keyCode == 27) ||
        (event.key && event.key.toLowerCase() == "escape")
      ) {
        // close navigation on mobile if open
        if (
          element.control.getAttribute("aria-expanded") == "true" &&
          isVisible(element.control)
        ) {
          toggleModalList(element, false);
        }
      }
      // listen for tab key
      if (
        (event.keyCode && event.keyCode == 9) ||
        (event.key && event.key.toLowerCase() == "tab")
      ) {
        // close navigation on mobile if open when nav loses focus
        if (
          element.control.getAttribute("aria-expanded") == "true" &&
          isVisible(element.control) &&
          !document.activeElement.closest(".js-filter-nav__wrapper")
        )
          toggleModalList(element, false);
      }
    });
  }

  function updateCurrentItem(element, btn) {
    if (btn.getAttribute("aria-current") == "true") {
      toggleModalList(element, false);
      return;
    }
    var activeBtn = element.wrapper.querySelector("[aria-current]");
    if (activeBtn) activeBtn.removeAttribute("aria-current");
    btn.setAttribute("aria-current", "true");
    // update trigger label on selection (visible on mobile only)
    element.placeholder.textContent = btn.textContent;
    toggleModalList(element, false);
    if (element.layout == "expanded") placeMarker(element);
  }

  function toggleModalList(element, bool) {
    element.control.setAttribute("aria-expanded", bool);
    element.wrapper.classList.toggle("filter-nav__wrapper--is-visible", bool);
    if (bool) {
      element.nav.querySelectorAll("[href], button:not([disabled])")[0].focus();
    } else if (isVisible(element.control)) {
      element.control.focus();
    }
  }

  function isVisible(element) {
    return (
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    );
  }

  function checkLayout(element) {
    if (element.layout == "expanded" && switchToCollapsed(element)) {
      // check if there's enough space
      element.layout = "collapsed";
      element.element.classList.remove("filter-nav--expanded");
      element.element.classList.add("filter-nav--collapsed");
      element.modalClose.classList.remove("hidden");
      element.control.classList.remove("hidden");
    } else if (element.layout == "collapsed" && switchToExpanded(element)) {
      element.layout = "expanded";
      element.element.classList.add("filter-nav--expanded");
      element.element.classList.remove("filter-nav--collapsed");
      element.modalClose.classList.add("hidden");
      element.control.classList.add("hidden");
    }
    // place background element
    if (element.layout == "expanded") placeMarker(element);
  }

  function switchToCollapsed(element) {
    return element.nav.scrollWidth > element.nav.offsetWidth;
  }

  function switchToExpanded(element) {
    element.element.style.visibility = "hidden";
    element.element.classList.add("filter-nav--expanded");
    element.element.classList.remove("filter-nav--collapsed");
    var switchLayout = element.nav.scrollWidth <= element.nav.offsetWidth;
    element.element.classList.remove("filter-nav--expanded");
    element.element.classList.add("filter-nav--collapsed");
    element.element.style.visibility = "visible";
    return switchLayout;
  }

  function placeMarker(element) {
    var activeElement = element.wrapper.querySelector(
      '.js-filter-nav__btn[aria-current="true"]'
    );
    if (element.marker.length == 0 || !activeElement) return;
    element.marker[0].style.width = activeElement.offsetWidth + "px";
    element.marker[0].style.transform =
      "translateX(" +
      (activeElement.getBoundingClientRect().left -
        element.list.getBoundingClientRect().left) +
      "px)";
  }

  var filterNav = document.getElementsByClassName("js-filter-nav");
  if (filterNav.length > 0) {
    var filterNavArray = [];
    for (var i = 0; i < filterNav.length; i++) {
      filterNavArray.push(new FilterNav(filterNav[i]));
    }

    var resizingId = false,
      customEvent = new CustomEvent("update-layout");

    window.addEventListener("resize", function () {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 100);
    });

    // wait for font to be loaded
    if (document.fonts) {
      document.fonts.onloadingdone = function (fontFaceSetEvent) {
        doneResizing();
      };
    }

    function doneResizing() {
      for (var i = 0; i < filterNavArray.length; i++) {
        (function (i) {
          filterNavArray[i].element.dispatchEvent(customEvent);
        })(i);
      }
    }
  }
})();
