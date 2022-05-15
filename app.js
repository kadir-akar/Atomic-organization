const counttf = document.getElementById("twentyfive");
const countdown = document.getElementById("countdown");
const countfifty = document.getElementById("fifty");
const reset = document.getElementById("reset");
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
const sundaych = document.querySelectorAll(".sunday-ch");
const mondaych = document.querySelectorAll(".monday-ch");
const tuesdaych = document.querySelectorAll(".tuesday-ch");
const wednesdaych = document.querySelectorAll(".wednesday-ch")
const thursdaych = document.querySelectorAll(".Thursday-ch")
const fridaych = document.querySelectorAll(".friday-ch")
const saturdaych = document.querySelectorAll(".saturday-ch")
const totalPomodoros = document.querySelector(".TotalPomodoros")
const audio = new Audio("https://dl.dropboxusercontent.com/s/1cdwpm3gca9mlo0/kick.mp3");

let countTime;
let lastChecked;


//functions

//clean checkboxes
function cleanTheDay(day) {
  for (const checkbox of day) {
    checkbox.checked = false;
    localStorage.clear(day)
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

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", handleCheck)
);

//chart.js grafik
Chart.defaults.color = "black"  

const week = document.getElementById('week').getContext('2d');
const weekChart = new Chart(week,{
    type: 'bar',
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'point of day',
            data: [5, 2, 6, 5, 7, 3,5],
            backgroundColor: [
                'rgba(255, 99, 132 , 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(153, 102, 255, 0.3)',
                'rgba(255, 159, 64, 0.3)',
                'rgba(53, 159, 64, 0.3)'
            ],
            color:"black",
            borderColor: [
                'black',
                'black',
                'black',
                'black',
                'black',
                'black',
                'black'
            ],
            borderWidth: 1,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


//change image
var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};
