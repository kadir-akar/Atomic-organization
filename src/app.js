const counttf = document.getElementById("twentyfive");
const countdown = document.getElementById("countdown");
const countfifty = document.getElementById("fifty");
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
const totalPomodoros = document.querySelector(".TotalPomodoros");
const quoteH = document.getElementById("checkbox-section");
const daily = document.getElementById("daily");

let count = 0;
let countTime;
let lastChecked;
let theDay;

const d = new Date();
const today = d.getDay();

//functions

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

//check the day
const daysOfWeek = [
  "sundaych",
  "mondaych",
  "tuesdaych",
  "wednesdaych",
  "thursdaych",
  "fridaych",
  "saturdaych",
];
const classOfDays = [
  "sunday-ch",
  "monday-ch",
  "tuesday-ch",
  "wednesday-ch",
  "thursday-ch",
  "friday-ch",
  "saturday-ch",
];

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
    checkboxes.addEventListener("click", () => {
      if (checkboxes.checked) {
        count++;
      } else {
        count--;
      }
      saveToLocal();
    });
    if (
      checkboxes.classList != classOfDays[today] &&
      reset.classList != classOfDays[today]
    ) {
      checkboxes.disabled = true;
      reset.disabled = true;
    } else {
      myChart.update();
    }
    form.appendChild(checkboxes);
    reset.addEventListener("click", () => {
      if (checkboxes.classList == classOfDays[today]) {
        checkboxes.checked = false;
        localStorage.removeItem(classOfDays[today]);
        count = 0;
        myChart.update();
      }
    });
  }
  day.appendChild(reset);
}
function saveToLocal() {
  let theDay = classOfDays[today];
  localStorage.setItem(theDay, count);
  myChart.data.datasets[0].data[today - 1] = count;
  myChart.update();
}

function loadFromLocal() {
  const sunday = document.querySelectorAll(".sunday-ch");
  const monday = document.querySelectorAll(".monday-ch");
  const tuesday = document.querySelectorAll(".tuesday-ch");
  const wednesday = document.querySelectorAll(".wednesday-ch");
  const thursday = document.querySelectorAll(".thursday-ch");
  const friday = document.querySelectorAll(".friday-ch");
  const saturday = document.querySelectorAll(".saturday-ch");
  const days = [sunday, monday, tuesday, wednesday, thursday, friday, saturday];

  for (let i = 0; i < 7; i++) {
    let localDay = classOfDays[i];
    let local = localStorage.getItem(localDay);
    myChart.data.datasets[0].data[i] = localStorage.getItem(localDay);
    myChart.update();
    for (let m = 0; m < local; m++) {
      days[i][m].checked =true
    }
  }
}
loadFromLocal();
