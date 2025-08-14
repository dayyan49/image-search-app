const accessKey = "bNH_A0AZVEWqpxi5GQQvLz8BtbMLetoZNIxZ-0Bo710";
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imgContainer = document.querySelector(".images-container");
const load = document.querySelector(".load");

let page = 1;

// Function to fetch images using unsplash API
const fetchImages = async (query, pageNo) => {
  try {
    if (page == 1) {
      imgContainer.innerHTML = "";
    }
    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=20&page=${pageNo}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      data.results.forEach((photo) => {
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

        //creating overlay
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        // creating overlay text
        const overlayText = document.createElement("h3");
        overlayText.innerText = `${photo.alt_description}`;
        overlayElement.appendChild(overlayText);

        imageElement.appendChild(overlayElement);
        imgContainer.appendChild(imageElement);
      });

      if (data.total_pages === page) {
        load.style.display = "none";
      } else {
        load.style.display = "block";
      }
    } else {
      imgContainer.innerHTML = `<h2>No image found</h2>`;
      if (load.style.display === "block") {
        load.style.display = "none";
      }
    }
  } catch (error) {
    imgContainer.innerHTML = `<h2>Failed to fetch images</h2>`;
  }
};

//Adding Event Listener to search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    page = 1;
    fetchImages(inputText, page);
  } else {
    imgContainer.innerHTML = `<h2>Please enter a search query</h2>`;
    if (load.style.display === "block") {
      load.style.display = "none";
    }
  }
});

// Adding Evenet Listenenr to load more button to fetch more images
load.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});
