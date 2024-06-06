AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 500, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
document.addEventListener("DOMContentLoaded", function() {
  // Get references to the modals
  const recipeModal = document.getElementById("recipeModal");
  const virtualInventoryModal = document.getElementById("virtualInventoryModal");
  const virtualSuperstoreModal = document.getElementById("virtualSuperstoreModal");
  const blackJackModal = document.getElementById("blackJackModal");
  const appointmentAppModal = document.getElementById("appointmentAppModal");
  // Get references to the "View sample" buttons
  const appointmentButton = document.getElementById("appointmentModalButton");
  const recipeButton = document.getElementById("recipeModalButton");
  const virtualInventoryButton = document.getElementById("openModalButton");
  const virtualSuperstoreButton= document.getElementById("virtualsuperstoreButton");
  const blackJackButton = document.getElementById("blackJackModalButton");

  // Function to open the modal
  function openModal(modal) {
    modal.style.display = "block";
  }
  appointmentButton.addEventListener("click",function(){
    event.preventDefault();
    openModal(appointmentAppModal);
  });

  // Add click event listeners to the buttons
  recipeButton.addEventListener("click", function(event) {
    event.preventDefault();
    openModal(recipeModal);
  });

  virtualSuperstoreButton.addEventListener("click",function(event){
    console.log("Tg")
    event.preventDefault();
    openModal(virtualSuperstoreModal);
  })

  virtualInventoryButton.addEventListener("click", function(event) {
    event.preventDefault();
    openModal(virtualInventoryModal);
  });



  blackJackButton.addEventListener("click", function(event) {
    event.preventDefault();
    openModal(blackJackModal);
  });

  // Close the modal when the close button is clicked
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const modal = button.closest(".modal");
      modal.style.display = "none";
    });
  });

  // Close the modal when clicking outside of it
  window.addEventListener("click", function(event) {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  });
});