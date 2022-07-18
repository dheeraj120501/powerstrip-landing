const features = document.querySelectorAll(".feature-box");
const main_btns = document.querySelectorAll(".btn-filled");
const benifit_section = document.querySelector(".benifits");
const form_modal = document.querySelector(".form-modal");
const form = document.querySelector(".form");
const navbar = document.querySelector("nav");
const nav_holder = document.querySelector(".nav-holder");
const nav_btn = document.querySelector(".btn-nav");
const modal_close_btns = document.querySelectorAll(".modal-close-btn");
const toast = document.querySelector(".toast");
const modals = document.querySelectorAll(".modal");
const modal_contents = document.querySelectorAll(".modal-content");
const privacy_policy = document.querySelector(".privacy-policy");
const refund_policy = document.querySelector(".refund-policy");
const terms_service = document.querySelector(".terms-service");
const subscribe_input = document.querySelector(".subscribe-input");
const subscribe_btn = document.querySelector(".subscription-btn");
const cards = document.querySelectorAll(".card");
const nextCard = document.querySelector(".cards-btn-next");
const prevCard = document.querySelector(".cards-btn-prev");

const mobileMedia = window.matchMedia("(max-width: 600px)");

function handleMobileChange(e) {
  if (e.matches) {
    cards.forEach((card, indx) => {
      card.style.transform = `translateX(${indx * 100}%)`;
    });
  }
}

mobileMedia.addEventListener("change", handleMobileChange);

handleMobileChange(mobileMedia);

let curCard = 0;
let maxCard = cards.length - 1;

nextCard.addEventListener("click", function () {
  if (curCard === maxCard) {
    curCard = 0;
  } else {
    curCard++;
  }

  cards.forEach((card, indx) => {
    card.style.transform = `translateX(${100 * (indx - curCard)}%)`;
  });
});

prevCard.addEventListener("click", function () {
  if (curCard === 0) {
    curCard = maxCard;
  } else {
    curCard--;
  }

  cards.forEach((card, indx) => {
    card.style.transform = `translateX(${100 * (indx - curCard)}%)`;
  });
});

const openModal = (modal_name) => {
  modals.forEach((modal) => {
    if (modal.classList.contains(`${modal_name}-modal`)) {
      modal.classList.remove("off");
    }
  });
};

privacy_policy.addEventListener("click", (e) => {
  openModal("privacy-policy");
});
refund_policy.addEventListener("click", (e) => {
  openModal("refund-policy");
});
terms_service.addEventListener("click", (e) => {
  openModal("terms-service");
});

modal_contents.forEach((modal_content) => {
  modal_content.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

const throwToast = (title, status) => {
  if (status === "success") {
    toast.style["border-bottom-color"] = "greenyellow";
  } else if (status === "error") {
    toast.style["border-bottom-color"] = "red";
  }
  toast.innerText = title;
  toast.classList.add("throw-toast");

  setTimeout(() => {
    toast.classList.remove("throw-toast");
  }, 3010);
};

const closeModal = () => {
  modals.forEach((modal) => {
    modal.classList.add("off");
  });
};

main_btns.forEach((main_btn) => {
  main_btn.addEventListener("click", () => {
    form.reset();
    form_modal.classList.toggle("off");
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", () => {
    modal.classList.add("off");
  });
});

modal_close_btns.forEach((modal_close_btn) => {
  modal_close_btn.addEventListener("click", () => {
    closeModal();
  });
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
    .then((res) => {
      form_modal.classList.add("off");
      if (res.status === "success") {
        throwToast(
          "Submitted successfully!\nPowerstrip will connect with you soon.",
          "success"
        );
      } else {
        throwToast("Some error occured.", "error");
      }
    })
    .catch((err) => console.log(err));
});

window.addEventListener("scroll", () => {
  const benifit_section_rect = benifit_section.getBoundingClientRect();
  if (benifit_section_rect.top < 0) {
    nav_btn.classList.add("main-btn");
    navbar.classList.add("nav-fixed");
    nav_holder.classList.add("active-nav-holder");
  } else {
    nav_btn.classList.remove("main-btn");
    navbar.classList.remove("nav-fixed");
    nav_holder.classList.remove("active-nav-holder");
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

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

subscribe_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const input = JSON.stringify({
    email: subscribe_input.value,
  });
  if (validateEmail(subscribe_input.value)) {
    fetch("https://dev.powerstrip.in/api/v1/customer/newsletter", {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: input,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        subscribe_input.value = "";
        if (res.status === "success") {
          throwToast("Subscribed successfully!", "success");
        } else {
          throwToast("Some error occured.", "error");
        }
      })
      .catch((err) => console.log(err));
  } else {
    throwToast("Enter a valid email.", "error");
  }
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
      // const infoWindow = new google.maps.InfoWindow();
      map_devices.forEach((map_device) => {
        const marker = new google.maps.Marker({
          position: { lat: map_device.lat, lng: map_device.lng },
          map: map,
          icon: "./assets/map-pin.svg",
          title: map_device.site,
          animation: google.maps.Animation.DROP,
        });
        // marker.addListener("click", () => {
        //   // infoWindow.close();
        //   // infoWindow.setContent(marker.getTitle());
        //   // infoWindow.open(marker.getMap(), marker);
        //   window.open(
        //     `https://www.google.com/maps/search/?api=1&query=${map_device.lat}%2C${map_device.lng}`,
        //     "_blank"
        //   );
        // });
      });
    });
}

window.initMap = initMap;
