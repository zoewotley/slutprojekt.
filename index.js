/* gör så att man kan klicka fram bort menyn, så att den inte alltid är synlig. Man måste ju uppskatta dessa diskreta scripter*/
let navbar = document.querySelector('.navbar');
document.querySelector('#menyikon').onclick=() =>{
    navbar.classList.toggle('active');
}

/* gör så att man kan klicka fram och bort sökrutan*/

let search = document.querySelector('.search');
document.querySelector('#sökikon').onclick=() =>{
    search.classList.toggle('active');
}

/*cool js hoppas vi*/
/*variablar*/ 
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; // Öka/minska detta nummer för att ändra känsligheten för trackpad-gester (upp = mindre känslig; ner = mer känslig)
var slideDurationSetting = 600; // Tid som slide är "låst"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

/* Bestäm delta/scroll-håll */
function parallaxScroll(evt) {
  var delta;

  if (isFirefox) {
    // Sätt delta för Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    // Sätt delta för IE
    delta = -evt.deltaY;
  } else {
    // Sätt delta för alla andra webbläsare
    delta = evt.wheelDelta;
  }

  if (ticking !== true) {
    if (delta <= -scrollSensitivitySetting) {
      // Neråt-scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      // Uppåt-scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

/* Timer för att tillfälligt låsa slides - så att man hinner läsa */
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- LÄGG TILL EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- SLIDE-RÖRELSE ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}