"use strict";

//nav

function HamburgerMenu() {
  const hamburger = document.querySelector("#nav-hamburger");
  const SubNavButtons = document.querySelectorAll(".nav-toggle");

  function HandleHamburgerClick() {
    const hamburgerMenu = document.querySelector("#mobileNav-container");
    const subNavContainer = document.querySelectorAll(
      ".mobileSubNav-container"
    );
    const arrowUpDown = document.querySelectorAll(".arrowUpDown");
    const mobileSearch = document.querySelector("#mobileNavSearch");
    const lowerNav = document.querySelector("#nav-lower");

    const isHamOpened = hamburger.getAttribute("aria-expanded");
    if (isHamOpened === "true") {
      hamburger.setAttribute("aria-expanded", "false");
      subNavContainer.forEach((el) => {
        el.setAttribute("aria-expanded", "false");
        if (el.classList.contains("expanded")) el.classList.remove("expanded");
      });
    } else {
      hamburger.setAttribute("aria-expanded", "true");
    }
    hamburgerMenu.classList.toggle("expanded");
    mobileSearch.classList.toggle("removed");
    lowerNav.classList.toggle("nav-lower");
  }

  hamburger.addEventListener("click", HandleHamburgerClick);

  function HandleSubMenuButtonClick(event) {
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
      hamburger.setAttribute("aria-expanded", "false");
      svgElement.innerHTML = arrowUp;
    } else {
      hamburger.setAttribute("aria-expanded", "true");
      svgElement.innerHTML = arrowDown;
    }

    container.classList.toggle("expanded");
  }

  SubNavButtons.forEach((element) => {
    element.addEventListener("click", HandleSubMenuButtonClick);
  });
}

function NavigationMenu() {
  const categories = document.querySelectorAll("#categories .categoryLi");
  const cartButtons = document.querySelectorAll(".doKoszykaTest");

  function ShowMenu(event) {
    // Toggle Mask Over Menu
    const target = event.currentTarget;
    const mask = target.querySelector(".mask");
    const menuContainer = target.querySelector(".categoryMenu-container");
    const targetStyles = window.getComputedStyle(target);
    const maskWidth = parseFloat(targetStyles.getPropertyValue("width")) + 32;

    mask.style.setProperty("--mask-width", `${maskWidth}px`);

    const targetPosition = target.getBoundingClientRect();
    const spaceOnRight = window.innerWidth - targetPosition.right + maskWidth;
    const desktop = 1250;

    if (
      (desktop < window.innerWidth && spaceOnRight < 600) ||
      (desktop > window.innerWidth && spaceOnRight < 400)
    ) {
      if (!menuContainer.classList.contains("toLeft"))
        menuContainer.classList.add("toLeft");
    } else {
      if (!menuContainer.classList.contains("toRight"))
        menuContainer.classList.add("toRight");
    }

    const menu = menuContainer.querySelector(".categoryMenu");

    if (!menu.classList.contains("displayedFlex"))
      menu.classList.add("displayedFlex");
  }

  function HideMenu(event) {
    const target = event.currentTarget;
    const menuContainer = target.querySelector(".categoryMenu-container");
    const targetStyles = window.getComputedStyle(target);
    const maskWidth = parseFloat(targetStyles.getPropertyValue("width")) + 32;
    const menu = menuContainer.querySelector(".categoryMenu");

    if (menu.classList.contains("displayedFlex"))
      menu.classList.remove("displayedFlex");

    const targetPosition = target.getBoundingClientRect();
    const spaceOnRight = window.innerWidth - targetPosition.right + maskWidth;
    const desktop = 1250;

    if (
      (desktop < window.innerWidth && spaceOnRight < 600) ||
      (desktop > window.innerWidth && spaceOnRight < 420)
    ) {
      if (menuContainer.classList.contains("toLeft"))
        menuContainer.classList.remove("toLeft");
    } else {
      if (menuContainer.classList.contains("toRight"))
        menuContainer.classList.remove("toRight");
    }
  }

  categories.forEach((element) => {
    element.addEventListener("mouseenter", ShowMenu);
    element.addEventListener("mouseleave", HideMenu);
  });

  function ProductAdded() {
    const logCart = document.querySelector("#logCart");
    const cart = document.querySelector("#logCart .cart");
    const mask = logCart.querySelector(".mask");
    const cartContainer = mask.nextElementSibling;
    let timeout;

    cart.classList.add("added");
    cart.style.setProperty("--cart-after-color", "#FFFFFF");
    cartContainer.classList.add("showed", "displayedFlex");
    mask.classList.add("displayed");

    timeout = setTimeout(function () {
      cart.classList.remove("added");
      cart.style.removeProperty("--cart-after-color");
      mask.classList.remove("displayed");
      cartContainer.classList.remove("showed", "displayedFlex");
    }, 5000);

    logCart.addEventListener("mouseover", function () {
      clearTimeout(timeout);
    });

    logCart.addEventListener("mouseout", function () {
      timeout = setTimeout(function () {
        cart.classList.remove("added");
        cart.style.removeProperty("--cart-after-color");
        mask.classList.remove("displayed");
        cartContainer.classList.remove("showed", "displayedFlex");
      }, 5000);
    });
  }

  cartButtons.forEach((element) => {
    element.addEventListener("click", ProductAdded);
  });

  function CartContains() {
    const cart = document.querySelector("#logCart .cart");
    const cartQuantity = parseInt(cart.getAttribute("cart-quantity"));

    if (!cartQuantity) {
      cart.style.setProperty("--cart-after-color", "transparent");
      cart.style.setProperty("--cart-after-background-color", "transparent");
    }
  }

  CartContains();
}

function AutoSuggestPopUp() {
  const mobileNavSearchInput = document.querySelector("#mobileNavSearch input");
  const navSearchInput = document.querySelector("#navSearch input");
  const autoSuggestMobile = document.querySelector(".autosuggestMobile");
  const autoSuggest = document.querySelector(".autosuggest");

  function AutoSuggestMobile() {
    const mobileNavSearchSvg = document.querySelector("#mobileNavSearch svg");

    mobileNavSearchInput.addEventListener("input", autoSuggestPopRemove);

    function autoSuggestPopRemove() {
      if (mobileNavSearchInput.value !== "") {
        autoSuggestMobile.classList.add("displayed");
        mobileNavSearchSvg.setAttribute("fill", "#495057");
      } else {
        autoSuggestMobile.classList.remove("displayed");
        mobileNavSearchSvg.setAttribute("fill", "#B2B6BA");
      }
    }

    function removeInputValue() {
      mobileNavSearchInput.value = "";
      autoSuggestMobile.classList.remove("displayed");
      mobileNavSearchSvg.setAttribute("fill", "#B2B6BA");
    }

    document.addEventListener("click", function (event) {
      const target = event.target;
      if (
        !target.closest("#mobileNavSearch") &&
        !target.closest(".autosuggestMobile")
      ) {
        removeInputValue();
      }
    });
  }

  AutoSuggestMobile();

  function AutoSuggest() {
    const navSearchSvg = document.querySelector("#navSearch svg");

    function autoSuggestPopRemove() {
      if (navSearchInput.value !== "") {
        autoSuggest.classList.add("displayed");
        navSearchSvg.setAttribute("fill", "#495057");
      } else {
        autoSuggest.classList.remove("displayed");
        navSearchSvg.setAttribute("fill", "#B2B6BA");
      }
    }

    navSearchInput.addEventListener("input", autoSuggestPopRemove);

    function removeInputValue() {
      navSearchInput.value = "";
      autoSuggest.classList.remove("displayed");
      navSearchSvg.setAttribute("fill", "#B2B6BA");
    }

    document.addEventListener("click", function (event) {
      const target = event.target;
      if (!target.closest("#navSearch") && !target.closest(".autosuggest")) {
        removeInputValue();
      }
    });
  }

  AutoSuggest();

  let timer = null;

  function SendData(event) {
    const device = event.currentTarget;
    let key;
    if (device === mobileNavSearchInput) {
      key = "mobileSearchBar";
    } else {
      key = "searchBar";
    }
    const value = device.value;
    if (value !== "") {
      clearTimeout(timer);

      timer = setTimeout(() => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://test.kmt.pl/index.asp");
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              console.log("Request successful.");
              const responseText = this.responseText;
              const regex = /<div\s+id="responseDiv">(.*?)<\/div>/;
              const match = regex.exec(responseText);
              const responseDivContent = match[1];
              //insert value of sql search
              if (device === mobileNavSearchInput) {
                autoSuggestMobile.innerHTML = responseDivContent;
              } else {
                autoSuggest.innerHTML = responseDivContent;
              }
            } else {
              console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            }
          }
        };
        xhr.send(`${key}=${encodeURIComponent(value)}`);
      }, 1000); // Delay in milliseconds
    }
  }

  mobileNavSearchInput.addEventListener("input", SendData);
  navSearchInput.addEventListener("input", SendData);
}

HamburgerMenu();
NavigationMenu();
AutoSuggestPopUp();
