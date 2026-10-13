
/* =====================================
   CABVEB — WEBSITE FUNCTIONALITY
   ===================================== */

// CabVeb WhatsApp number with India country code
const CABVEB_WHATSAPP = "917500135075";

const bookingForm = document.getElementById("bookingForm");
const formError = document.getElementById("formError");
const travelDate = document.getElementById("travelDate");

// Set the earliest selectable travel date to today
function getLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

travelDate.min = getLocalDate();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after selecting a section
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Route card buttons fill the booking form
document.querySelectorAll(".route-button").forEach(function (button) {
  button.addEventListener("click", function () {
    document.getElementById("pickup").value =
      button.dataset.pickup;

    document.getElementById("destination").value =
      button.dataset.destination;

    document.getElementById("booking").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    document.getElementById("rideType").focus({
      preventScroll: true
    });
  });
});

// Send booking enquiry to WhatsApp
bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();
  formError.textContent = "";

  // Check form fields
  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  const selectedDate = travelDate.value;

  if (selectedDate < getLocalDate()) {
    formError.textContent =
      "Please select today or a future travel date.";
    travelDate.focus();
    return;
  }

  // Read form values
  const rideType = document.getElementById("rideType").value;
  const pickup = document.getElementById("pickup").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const passengers = document.getElementById("passengers").value;
  const time = document.getElementById("travelTime").value;
  const details = document.getElementById("extraDetails").value.trim();

  if (!pickup || !destination) {
    formError.textContent =
      "Please enter both pickup and destination.";
    return;
  }

  // Prepare the WhatsApp message
  const message = [
    "Hello CabVeb! I want to enquire about a ride.",
    "",
    "Ride type: " + rideType,
    "Pickup: " + pickup,
    "Destination: " + destination,
    "Travel date: " + selectedDate,
    "Preferred time: " + time,
    "Passengers: " + passengers,
    "Extra details: " + (details || "None"),
    "",
    "Please share the availability and fare."
  ].join("\n");

  const whatsappURL =
    "https://wa.me/" +
    CABVEB_WHATSAPP +
    "?text=" +
    encodeURIComponent(message);

  // Open WhatsApp with the enquiry ready to send
  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

// Automatically update copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();