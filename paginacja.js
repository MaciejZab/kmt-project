"use strict";

// Select the necessary HTML elements
const paginationElement = document.querySelectorAll(".pagination");
const totalElement = document.querySelector("[name='pageCounter']");

// Get the total number of pages from the "pageCounter" input element
const totalPages = totalElement !== null ? parseInt(totalElement.value) : null;

if (totalPages === null) {
  throw new Error("Lack of 'totalElement' on DOM");
}

// Get the current URL and extract the search parameters
const url = new URL(window.location.href);
const searched = document.querySelector("#searched")?.value || null;
const sort = url.searchParams.get("sort");
const gd = parseInt(url.searchParams.get("gd")) || null;
const gm = parseInt(url.searchParams.get("gm")) || null;

// Set the current page number based on the "page" search parameter in the URL
let currentPage = parseInt(url.searchParams.get("page")) || 1;

// If the current page number is less than 1, set it to 1
if (currentPage < 1) currentPage = 1;

function renderPagination(page) {
  // Render pagination

  let pageQuery;
  if (searched === null) {
    if (gd === null) {
      pageQuery = `?sort=${sort}`;
    } else if (gm === null) {
      pageQuery = `?gd=${gd}&sort=${sort}`;
    } else {
      pageQuery = `?gd=${gd}&gm=${gm}&sort=${sort}`;
    }
  } else {
    pageQuery = `?searchBar=${searched}&sort=${sort}`;
  }

  const leftArrowComponent = `<a class="pagination-arrowLeft" href="${pageQuery}&page=${
    page > 1 ? page - 1 : page
  }">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#121212" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
  </a>`;
  const rightArrowComponent = `<a class="pagination-arrowRight" href="${pageQuery}&page=${
    page < totalPages ? page + 1 : page
  }">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#121212" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
  </a>`;
  const lastPageComponent =
    page !== totalPages
      ? `<span>...</span>
  <a class="last" href="${pageQuery}&page=${totalPages}">${totalPages}</a>`
      : `<span>...</span>
  <span>${totalPages}</span>`;

  let startPage, endPage;

  if (totalPages <= 3) {
    startPage = 1;
    endPage = totalPages;
  } else if (page <= 2) {
    startPage = 1;
    endPage = 3;
  } else if (page + 1 >= totalPages) {
    startPage = totalPages - 2;
    endPage = totalPages;
  } else {
    startPage = page - 1;
    endPage = page + 1;
  }

  let insert = "";
  if (page > 1) {
    insert += `${leftArrowComponent}`;
  }

  for (let i = startPage; i <= endPage; i++) {
    if (i === page) {
      insert += `<a class="page active" href="${pageQuery}&page=${i}">${i}</a>`;
    } else {
      insert += `<a class="page" href="${pageQuery}&page=${i}">${i}</a>`;
    }
  }

  insert += `${lastPageComponent}`;

  if (page < totalPages) {
    insert += `${rightArrowComponent}`;
  }

  if (paginationElement !== null) {
    paginationElement.forEach((element) => {
      element.innerHTML = insert;
    });
  }

  // Handle click events
  function handlePaginationClick() {
    const pageLinks = document.querySelectorAll(".page");

    pageLinks.forEach((pageLink) => {
      pageLink.addEventListener("click", () => {
        const pageNumber = parseInt(pageLink.innerHTML);
        handlePageChange(pageNumber);
      });
    });
  }

  if (paginationElement !== null) {
    handlePaginationClick();
  }
}

renderPagination(currentPage);
