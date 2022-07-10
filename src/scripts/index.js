const features = document.querySelectorAll(".feature-box");
window.addEventListener("scroll", (e) => {
  features.forEach((feature) => {
    const content = feature.children[0];
    if (!content.length) {
      const featureRect = feature.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      content.style.opacity =
        (window.innerHeight / 2 -
          contentRect.height / 2 -
          Math.abs(featureRect.top)) /
        (window.innerHeight / 2 - contentRect.height / 2);
    }
  });
});
