/**
 * Self-invoking function that sets up event listeners and handles API requests for NASA EPIC images.
 */
(function () {

  /**
   * Event listener for DOMContentLoaded, triggers setup of the application.
   */
  document.addEventListener("DOMContentLoaded", function () {
      // Define the image types in a constant array
const imageTypes = ['natural', 'enhanced', 'aerosol', 'cloud'];

// Initialize the data cache and image cache dynamically
const dateCache = {};
const imageCache = {};

// Populate the caches based on the image types
imageTypes.forEach(type => {
  dateCache[type] = null;
  imageCache[type] = new Map();
});
 // Create a singleton object to hold the application state
 const EpicApplication = {
    images: [],
    selectedImageType: "",
    dateCache: {}, // Include dateCache as a property of EpicApplication
  };

  // Populate the dateCache based on the image types
  imageTypes.forEach(type => {
    EpicApplication.dateCache[type] = null;
  });

  // Function to generate DOM <options> elements
  function generateOptionElements() {
    const selectElement = document.getElementById('type');
    imageTypes.forEach(type => {
      const optionElement = document.createElement('option');
      optionElement.value = type;
      optionElement.text = type.charAt(0).toUpperCase() + type.slice(1);
      selectElement.appendChild(optionElement);
    });
  }

  generateOptionElements();
    // Declare images variable outside the event listener
    let images;

    /**
     * Represents the date input element.
     * @type {HTMLInputElement}
     */
    let date = document.getElementById("date");

    /**
     * Represents the type input element.
     * @type {HTMLSelectElement}
     */
    let type = document.getElementById("type");

    // Set the maximum date for the type input
    setMaxDate(type);

    /**
     * Fetches data from the given URL using the fetch API.
     *
     * @param {string} url - The URL to fetch data from.
     * @returns {Promise} A promise that resolves to the fetched data.
     */
    function fetchData(url) {
      return fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          throw error;
        });
    }

    /**
     * Sets the maximum date for the given image type.
     *
     * @param {HTMLSelectElement} imageType - The select element for image type.
     */
    function setMaxDate(imageType) {
        // TODO dates that get fetched are wrong
        // Construct the API URL with the given image type
        imageType = imageType.value;
        let latestDate = null;
        if (EpicApplication.dateCache[imageType] == null) {
          const apiUrl = "https://epic.gsfc.nasa.gov/api/" + imageType + "/all";
          // Make a request to the API
          fetchData(apiUrl)
            .then((dates) => {
              let listOfDates = [];
              console.log(dates);
              dates.forEach((obj) => {
                listOfDates.push(obj.date.toString());
              });
              let sortedDates = listOfDates.sort((a, b) => b - a);
              latestDate = sortedDates[0];
              let dateInput = document.querySelector("#date");
              EpicApplication.dateCache[imageType] = latestDate;
              console.log(EpicApplication.dateCache);
              dateInput.max = latestDate;
    
              // Set the max attribute of the date input field
            })
            .catch((error) => {
              console.error("Error fetching data from NASA API:", error);
            });
        } else {
          latestDate = EpicApplication.dateCache[imageType];
        }
        document.getElementById("date").setAttribute("max", latestDate);
      }
    

    /**
     * Handles the click event on menu items (date list items).
     *
     * @param {Array} images - The array of image data.
     * @returns {function} Event handler function.
     */
    function menuItemPressed(images) {
      return function (event) {
        const imageFrame = document.getElementById("earth-image");
        if (event.target.tagName === "LI") {
          const index = event.target.getAttribute("data-index");

          // Check if images and index are defined
          if (images && images[index]) {
            const dateElement = document.getElementById("earth-image-date");
            const titleElement = document.getElementById("earth-image-title");
            let type = document.getElementById("type");

            // Split the date string to remove the time part
            const dateParts = images[index].date.split(" ");
            const formattedDate = dateParts[0].replace(/-/g, "/");
            type = type.value;
            let imagesrc =
              "https://epic.gsfc.nasa.gov/archive/" +
              type +
              "/" +
              formattedDate +
              "/jpg/" +
              images[index].image +
              ".jpg";

            imageFrame.src = imagesrc;
            dateElement.textContent = images[index].date;
            titleElement.textContent = images[index].caption;
          }
        }
      };
    }

    /**
     * Clears all child elements of the given parent element.
     *
     * @param {HTMLElement} listOfImages - The parent element to clear.
     */
    function deleteLIs(listOfImages) {
      while (listOfImages.firstChild) {
        listOfImages.removeChild(listOfImages.firstChild);
      }
    }

    /**
     * Creates list items for the given images and appends them to the specified parent element.
     *
     * @param {Array} images - The array of image data.
     * @param {HTMLElement} listOfImages - The parent element to which list items will be appended.
     */
    function makeLiForImages(images, listOfImages) {
      if (images.length === 0) {
        let imageLi = document.createElement("li");
        let noDate = document.createTextNode("No available dates");
        imageLi.appendChild(noDate);
        listOfImages.appendChild(imageLi);
      } else {
        for (let i = 0; i < images.length; i++) {
          let imageLi = document.createElement("li");
          imageLi.classList.add("liElement");
          imageLi.addEventListener("click", menuItemPressed(images));
          let imageDate = document.createTextNode(images[i].date);

          imageLi.setAttribute("data-index", i);

          imageLi.appendChild(imageDate);
          listOfImages.appendChild(imageLi);
        }
      }
    }

    // Form
    const form = document.getElementById("request_form");

    /**
     * Event listener for form submission, triggers data fetching and updates the UI.
     *
     * @param {Event} event - The submit event.
     */
    function submitForm(event) {
        event.preventDefault();
      
        const dateInput = document.getElementById("date");
        const type = document.getElementById("type").value;
        const type2 = document.getElementById("type");
        const listOfImages = document.getElementById("image-menu");
      
        // Check if the date field is valid
        if (dateInput.checkValidity() || type2.chec) {
          const date = dateInput.value;
          const url = "https://epic.gsfc.nasa.gov/api/" + type + "/date/" + date;
          const typeMap = imageCache[type];
      
          const existingIndex = typeMap.has(date) ? typeMap.get(date): -1;
      
          if (existingIndex === -1) {
            fetchData(url)
              .then((data) => {
                EpicApplication.images = data;
                EpicApplication.selectedImageType = type;
                
                // Create a new Map entry for the given date
                typeMap.set(date, 
                   data.map((item) => item),
                );
                    console.log(typeMap);
                deleteLIs(listOfImages);
                makeLiForImages(EpicApplication.images, listOfImages);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          } else {
            console.log("no fetch required");
            EpicApplication.images = existingIndex;
            console.log(imageCache);
            deleteLIs(listOfImages);
            makeLiForImages(EpicApplication.images, listOfImages);
          }
        } else {
          // Show an error message or perform other actions for an invalid date
          console.log("Invalid date");
        }
      }

    // Every time the form is submitted, there is a new max date, and the form is submitted
    form.addEventListener("submit", function () {
      submitForm(event);
      setMaxDate(type);
    });

    // Every time the type is changed, there is a new max date, and the form is submitted
    type.addEventListener("change", function () {
      submitForm(event);
      setMaxDate(type);
    });

    // Every time the date is changed, the form gets submitted
    date.addEventListener("change", function () {
      submitForm(event);
    });
  });
})();
