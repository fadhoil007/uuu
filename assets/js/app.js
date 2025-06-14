// Afirmasi harian fade
const affirmations = [
  "Saya terus berkembang menjadi versi terbaik dari diri saya.",
  "Saya mampu menghadapi segala tantangan yang datang.",
  "Saya layak untuk dicintai dan dihargai.",
  "Saya percaya pada proses dan waktu yang saya jalani.",
  "Saya punya potensi besar untuk sukses dan bahagia."
];

let currentAffirmation = 0;
function updateAffirmation() {
  const element = document.getElementById("affirmation");
  element.style.opacity = 0;
  setTimeout(() => {
    element.textContent = affirmations[currentAffirmation];
    element.style.opacity = 1;
    currentAffirmation = (currentAffirmation + 1) % affirmations.length;
  }, 500);
}
setInterval(updateAffirmation, 5000);
updateAffirmation();

// Update tampilan slider karakter
const slider = document.getElementById("charLength");
const charValue = document.getElementById("charValue");
slider.addEventListener("input", () => {
  charValue.textContent = slider.value;
});
