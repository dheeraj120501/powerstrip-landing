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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = JSON.stringify({
    full_name: e.target[0].value,
    phone: e.target[1].value,
    email: e.target[2].value,
    pincode: e.target[3].value,
  });
  fetch("https://dev.powerstrip.in/api/v1/customer/query", {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: input,
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
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

function initMap() {
  const uluru = { lat: 28.6448, lng: 77.216721 };

  function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    uluru.lat = lat;
    uluru.lng = lng;
  }

  function error() {}

  navigator.geolocation.getCurrentPosition(success, error);
  const map = new google.maps.Map(document.querySelector(".map"), {
    zoom: 4,
    center: uluru,
  });

  fetch("https://dev.powerstrip.in/api/v1/device/get-all")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      const devices = res.devices;
      const map_devices = devices.filter(
        (device) => device.lat !== undefined && device.lng !== undefined
      );
      map_devices.forEach((map_device) => {
        new google.maps.Marker({
          position: { lat: map_device.lat, lng: map_device.lng },
          map: map,
        });
      });
    });
}

window.initMap = initMap;
