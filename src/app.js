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

//clean checkboxes
function cleanTheDay(day) {
  for (const checkbox of day) {
    checkbox.checked = false;
    totalC = 0;
  }
}
// window.addEventListener("DOMContentLoaded", () => {
//   whichDay();
// });
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
  "sundaych",
  "mondaych",
  "tuesdaych",
  "wednesdaych",
  "thursdaych",
  "fridaych",
  "saturdaych",
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
    count = localStorage.getItem(classOfDays[i]) ?? null;
    checkboxes.addEventListener("click", saveToLocal);
    if (
      checkboxes.classList != classOfDays[today] &&
      reset.classList != classOfDays[today]
      ) {
        checkboxes.disabled = true;
        reset.disabled = true;
      }
    if (j < count) {
      myChart.update();
    }
    form.appendChild(checkboxes);
    //reset checkboxes
    reset.addEventListener("click", () => {
      if (checkboxes.classList == classOfDays[today]) {
        checkboxes.checked = false;
      }
    });
  }
  day.appendChild(reset);
  // daily.append(days)
  // daily.appendChild(day);
}
function saveToLocal() {
  // checkboxes.forEach((e)=>{
  //   if(e.checked == true){
  //     console.log("hi")
  //   }
  // })
  checkboxes.checked == true
    let theDay = classOfDays[today]
    count++
    localStorage.setItem(theDay,count)
    myChart.data.datasets[0].data[today] = count
    myChart.update()
    console.log("hi")
  
}
console.log(myChart.data.datasets[0].data);
