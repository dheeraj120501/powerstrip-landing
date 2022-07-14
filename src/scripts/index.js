const features = document.querySelectorAll(".feature-box");
const main_btn = document.querySelector(".btn-filled");
const benifit_section = document.querySelector(".benifits");
const modal = document.querySelector(".modal");
const form = document.querySelector(".form");
const navbar = document.querySelector("nav");
const modal_close_btn = document.querySelector(".close-btn");

main_btn.addEventListener("click", () => {
  modal.classList.toggle("off");
});

modal.addEventListener("click", () => {
  modal.classList.toggle("off");
});

modal_close_btn.addEventListener("click", () => {
  modal.classList.toggle("off");
});

form.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("scroll", () => {
  const benifit_section_rect = benifit_section.getBoundingClientRect();
  if (benifit_section_rect.top < 0) {
    main_btn.classList.add("main-btn");
    navbar.classList.add("nav-fixed");
  } else {
    main_btn.classList.remove("main-btn");
    navbar.classList.remove("nav-fixed");
  }
  features.forEach((feature) => {
    const content = feature.children[0];
    if (!content.length) {
      const featureRect = feature.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      content.style.opacity =
        featureRect.top < 0
          ? (window.innerHeight / 2 -
              contentRect.height / 2 -
              Math.abs(featureRect.top)) /
            (window.innerHeight / 2 - contentRect.height / 2)
          : (window.innerHeight / 2 +
              contentRect.height / 2 -
              Math.abs(featureRect.top)) /
            (window.innerHeight / 2);
    }
  });
});
