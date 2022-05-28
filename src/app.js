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
const quoteH = document.getElementById("checkbox-section");
const daily = document.getElementById("daily");

let totalC = 0;
let countTime;
let lastChecked;
let theDay;

const d = new Date();
const today = d.getDay();

//functions

//clean checkboxes
function cleanTheDay(day) {
  for (const checkbox of day) {
    checkbox.checked = false;
    totalC = 0;
  }
}
window.addEventListener("DOMContentLoaded", () => {
  whichDay();
});
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
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display;
  countdown.textContent = display;
}

//change image
var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};

//total pomodoro
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked == true) {
      totalC++;
    }
  });
});

//check the day
const daysOfWeek = [
  "mondaych",
  "tuesdaych",
  "wednesdaych",
  "thursdaych",
  "fridaych",
  "saturdaych",
  "sundaych",
];

function whichDay() {
  theDay = daysOfWeek[today - 1];
  theDay.forEach((e) => {
    e.removeAttribute("disabled");
  });
}

//quote generator
const quotes = [
  "Eğlenen biriyle kıyaslanamazsın.",
  "Hedefe değil sisteme odaklan.",
  "dikkat yoğunluğu + çalışma süresi = yüksek kaliteli iş miktarı.",
  "Hergün %1 lik bir gelişim yıl sonu %37 lik ilerlemeye tekabül eder.",
  "Derin olmayan çalışmanın dünyaya ve kişiye faydası yoktur.",
];
function generateQuote() {
  var randomNumber = Math.floor(Math.random() * quotes.length);
  var quote = quotes[randomNumber];
  quoteH.innerHTML = `<h3>${quote}</h3>`;
}
generateQuote();

const nameOfDays = ["P", "PT", "S", "Ç", "PR", "C", "CT"];
const classOfDays = [
  "sunday-ch",
  "monday-ch",
  "tuesday-ch",
  "wednesday-ch",
  "Thursday-ch",
  "friday-ch",
  "saturday-ch",
];

// day generator
for (let i = 0; i < 7; i++) {
  const days = document.getElementById("days");
  const day = document.createElement("div");
  const p = document.createElement("p");
  const form = document.createElement("form");
  const reset = document.createElement("button");

  day.classList = `day ${nameOfDays[i]}`;
  p.innerHTML = nameOfDays[i];
  form.id = "pomodoro";
  form.classList = `center inbox`;
  reset.setAttribute("onclick", `cleanTheDay(${daysOfWeek[i]})`);
  reset.classList = `clean ${classOfDays[i]}`;
  reset.innerText = "X";

  day.appendChild(p);
  day.appendChild(form);
  days.appendChild(day);

  for (let j = 0; j < 20; j++) {
    const checkboxes = document.createElement("input");
    checkboxes.type = "checkbox";
    checkboxes.id = "check";
    checkboxes.classList = classOfDays[i];
    count = localStorage.getItem(i) ?? null;
    checkboxes.addEventListener("click", save);
    if (
      checkboxes.classList != classOfDays[today] &&
      reset.classList != classOfDays[today]
    ) {
      checkboxes.disabled = true;
      reset.disabled = true;
    }
    if (j < count) {
      checkboxes.disabled = false;
      reset.disabled = false;
      data["datasets"][0]["data"][i] = count;
      myChart.update();
    }
    form.appendChild(checkboxes);
  }
  day.appendChild(reset);
  // daily.append(days)
  // daily.appendChild(day);
}
function save() {
  localStorage.setItem(date, count);
  myChart.update();
}
