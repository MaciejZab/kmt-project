"use strict";

// footer

document.getElementById("currentYear").innerHTML = new Date().getFullYear();

toggleExpand();

function toggleExpand() {
  const mediaQuery = window.matchMedia("(min-width: 1250px)");
  const boolean = mediaQuery.matches;
  const buttons = document.querySelectorAll(".footer-toggle");

  function HandleButtonClick(event) {
    const button = event.currentTarget;
    const container = button.nextElementSibling;

    //ArrowUp
    const arrowUp = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>`;

    // ArrowDown
    const arrowDown = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>`;
    // Target the SVG element inside arrowUpDown and replace its content
    const svgElement = button.querySelector("svg");

    const isOpened = button.getAttribute("aria-expanded");
    if (isOpened === "true") {
      button.setAttribute("aria-expanded", "false");
      svgElement.innerHTML = arrowUp;
    } else {
      button.setAttribute("aria-expanded", "true");
      svgElement.innerHTML = arrowDown;
    }

    container.classList.toggle("expanded");
  }

  buttons.forEach((element) => {
    if (boolean) {
      element.removeEventListener("click", HandleButtonClick);
    } else {
      element.addEventListener("click", HandleButtonClick);
    }
  });
}
