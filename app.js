const counttf = document.getElementById("twentyfive");
const countdown = document.getElementById("countdown");
const countfifty = document.getElementById("fifty");
const reset = document.getElementById("reset");
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
const sundaych = document.querySelectorAll(".sunday-ch");
const mondaych = document.querySelectorAll(".monday-ch");
const tuesdaych = document.querySelectorAll(".tuesday-ch");
const wednesdaych = document.querySelectorAll(".wednesday-ch");
const thursdaych = document.querySelectorAll(".Thursday-ch");
const fridaych = document.querySelectorAll(".friday-ch");
const saturdaych = document.querySelectorAll(".saturday-ch");
const totalPomodoros = document.querySelector(".TotalPomodoros");
let d = new Date();

// const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]


//functions

//clean checkboxes
function cleanTheDay(day) {
  for (const checkbox of day) {
    checkbox.checked = false;
    localStorage.clear(day);
  }
}

function timer(seconds) {
  //clear any existing timers
  clearInterval(countTime);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countTime = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //stop statement
    if (secondsLeft < 0) {
      clearInterval(countTime);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  console.log({ minutes, remainderSeconds });
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display;
  countdown.textContent = display;
}

//hold the shift
function handleCheck(e) {
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    //loop over every single checkbox
    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  lastChecked = this;
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", handleCheck);
});

//chart.js grafik
Chart.defaults.color = "black";

//change image
var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};
const today = d.getDay();

switch (today) {
  case 1:
    //pazartesi
    sundaych.forEach((e) => {
      e.removeAttribute("disabled");
    });
    break;
  case 2:
    mondaych.forEach((e) => {
      e.removeAttribute("disabled");
    });
    break;
  case 3:
    tuesdaych.forEach((e) => {
      e.removeAttribute("disabled");
    });
    break;
  case 4:
    wednesdaych.forEach((e) => {
      e.removeAttribute("disabled");
    });
    break;
  case 5:
    thursdaych.forEach((e) => {
      e.removeAttribute("disabled");
    });
    break
  case 6:
    fridaych.forEach((e) => {
      e.removeAttribute("disabled");
    });
    break
  case 7:
    saturdaych.forEach((e) => {
      e.removeAttribute("disabled");
    });
    break
}