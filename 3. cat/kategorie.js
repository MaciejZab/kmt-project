function toggleCategorySideMenuExpand() {
  const buttons = document.querySelectorAll(".categorySide-toggle");
  const buttonMobile = document.querySelector(".categoryMobile-toggle");

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

    container.classList.toggle("displayed");
  }

  if (buttons.length > 0) {
    buttons.forEach((element) =>
      element.addEventListener("click", HandleButtonClick)
    );
  }

  if (buttonMobile !== null) {
    buttonMobile.addEventListener("click", HandleButtonClick);
  }
}

toggleCategorySideMenuExpand();

function ChangeSort() {
  const layout = document.querySelector(".layout");
  const layoutManager = layout.querySelectorAll("svg");

  function SendSortData(event) {
    const view = event.currentTarget;
    let qSort;
    if (view === layoutManager[0]) {
      qSort = "list";
    } else {
      qSort = "tile";
    }

    let currentUrl = window.location.href;
    const regex = /sort=.*?(&|$)/;
    newUrl = currentUrl.replace(regex, "");
    const redirect = `${newUrl}sort=${qSort}`;

    // Redirect
    window.location.href = redirect;
  }

  layoutManager[0].addEventListener("click", SendSortData);
  layoutManager[1].addEventListener("click", SendSortData);
}

ChangeSort();

function ChangeView() {
  const url = new URL(window.location.href);
  const sort = url.searchParams.get("sort");

  const layout = document.querySelector(".layout");
  const layoutManager = layout.querySelectorAll("svg");
  const categoryResult = document.querySelector(".categoryResult");
  const item = categoryResult.querySelectorAll(".item");
  const buy = categoryResult.querySelectorAll(".buy");
  const description = categoryResult.querySelectorAll(".description");
  const firstSection = categoryResult.querySelectorAll(".firstSection");
  const imgContainer = categoryResult.querySelectorAll(".imgContainerList");
  const img = categoryResult.querySelectorAll(".img");
  const cart = categoryResult.querySelectorAll(".cart");

  function list() {
    layoutManager[0].setAttribute("stroke", "#121212");
    layoutManager[1].setAttribute("stroke", "#70767C");
    categoryResult.classList.remove("categoryResultTile");
    item.forEach((element) => {
      element.classList.remove("tile");
      element.classList.add("list");
    });
    buy.forEach((element) => {
      element.classList.remove("buyTile");
      element.classList.add("buyList");
    });
    description.forEach((element) => {
      element.classList.remove("removed");
    });
    firstSection.forEach((element) => {
      element.classList.remove("firstSectionTile");
    });
    imgContainer.forEach((element) => {
      element.classList.remove("imgContainerTile");
      element.classList.add("imgContainerList");
    });
    img.forEach((element) => {
      element.classList.remove("imgTile");
      element.classList.add("img");
    });
    cart.forEach((element) => {
      element.classList.remove("cartTile");
    });
  }

  function tile() {
    layoutManager[1].setAttribute("stroke", "#121212");
    layoutManager[0].setAttribute("stroke", "#70767C");
    categoryResult.classList.add("categoryResultTile");
    item.forEach((element) => {
      element.classList.remove("list");
      element.classList.add("tile");
    });
    buy.forEach((element) => {
      element.classList.remove("buyList");
      element.classList.add("buyTile");
    });
    description.forEach((element) => {
      element.classList.add("removed");
    });
    firstSection.forEach((element) => {
      element.classList.add("firstSectionTile");
    });
    imgContainer.forEach((element) => {
      element.classList.remove("imgContainerList");
      element.classList.add("imgContainerTile");
    });
    img.forEach((element) => {
      element.classList.remove("img");
      element.classList.add("imgTile");
    });
    cart.forEach((element) => {
      element.classList.add("cartTile");
    });
  }

  if (sort === "tile") {
    tile();
  } else if (sort === "list") {
    list();
  }
}

ChangeView();

function adjustPhotos() {
  const firstSection = document.querySelectorAll(".firstSection");
  if (firstSection.length === 0) {
    throw new Error("Lack of 'firstSection' in DOM");
  }
  firstSection.forEach((element) => {
    const imgContainer = element.querySelector("div");
    const imgContainerHeight = `${imgContainer.offsetHeight}px`;
    const img = imgContainer.querySelector(".img");

    if (img.naturalHeight > imgContainer.offsetHeight * 0.75) {
      img.style.height = imgContainerHeight;
    }
  });
}

adjustPhotos();
