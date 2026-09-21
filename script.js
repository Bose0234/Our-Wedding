// ================= PRELOADER =================
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add('fade-out');

    setTimeout(() => {
      preloader.remove();
    }, 1000);

  }, 8000); // reduced from 8000 because we like usable websites
});


// ================= Header =================
document.addEventListener("DOMContentLoaded", function () {

    const menu = document.getElementById("weddingMenu");
    const overlay = document.querySelector(".mobile-menu-overlay");
    const closeButton = document.querySelector(".mobile-menu-close");
    const toggler = document.querySelector(".navbar-toggler");

    if (!menu || !overlay || !closeButton || !toggler) {
        return;
    }

    const menuLinks = menu.querySelectorAll(".nav-link");


    /* OPEN MENU */
    function openMobileMenu() {

        menu.classList.add("show");
        overlay.classList.add("active");

        document.body.classList.add("menu-open");

        toggler.classList.add("menu-open");
        toggler.setAttribute("aria-expanded", "true");
    }


    /* CLOSE MENU */
    function closeMobileMenu() {

        menu.classList.remove("show");
        overlay.classList.remove("active");

        document.body.classList.remove("menu-open");

        toggler.classList.remove("menu-open");
        toggler.setAttribute("aria-expanded", "false");
    }


    /* HAMBURGER */
    toggler.addEventListener("click", function (event) {

        event.preventDefault();

        if (menu.classList.contains("show")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }

    });


    /* CLOSE BUTTON */
    closeButton.addEventListener("click", function () {
        closeMobileMenu();
    });


    /* OVERLAY */
    overlay.addEventListener("click", function () {
        closeMobileMenu();
    });


    /* MENU LINKS */
    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            closeMobileMenu();
        });

    });


    /* ESCAPE */
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /* RESET ON DESKTOP */
    window.addEventListener("resize", function () {

        if (window.innerWidth >= 992) {
            closeMobileMenu();
        }

    });

});

// ================= COUNTDOWN =================
const countDownDate = new Date("Jan 1, 2027 00:00:00").getTime();

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

function updateCountdown() {
  const now = new Date().getTime();
  let distance = countDownDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    const el = document.getElementById("countdown");
    if (el) el.innerHTML = "EXPIRED";
    return;
  }

  const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  setText("years", years.toString().padStart(2, "0"));
  setText("months", months.toString().padStart(2, "0"));
  setText("days", days.toString().padStart(2, "0"));
  setText("hours", hours.toString().padStart(2, "0"));
  setText("minutes", minutes.toString().padStart(2, "0"));
  setText("seconds", seconds.toString().padStart(2, "0"));
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();


// ================= CUSTOM CURSOR =================
const cursor = document.querySelector('.cursor-main');

if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.top = (e.pageY - 10) + "px";
    cursor.style.left = (e.pageX - 10) + "px";
  });

  document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
      cursor.classList.remove("expand");
    }, 500);
  });
}


// ================= LIGHTBOX =================

document.addEventListener("click", function (e) {
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox img");

  if (!lightbox || !lightboxImg) return;

  // 🔹 OPEN (click on grid item)
  const wrapper = e.target.closest(".img");
  if (wrapper && wrapper.closest(".editorial-grid")) {
    const img = wrapper.querySelector("img");
    if (!img) return;

    lightboxImg.src = img.getAttribute("src");
    lightbox.classList.add("active");
    return; // stop here so it doesn't trigger close logic
  }

  // 🔹 CLOSE (close button)
  if (e.target.matches(".lightbox .close")) {
    lightbox.classList.remove("active");
    return;
  }

  // 🔹 CLOSE (click outside image)
  if (e.target.classList.contains("lightbox")) {
    lightbox.classList.remove("active");
  }
});


// ================= ESC CLOSE =================
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelector(".lightbox")?.classList.remove("active");
  }
});