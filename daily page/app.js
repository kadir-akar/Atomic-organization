const counttf = document.getElementById("twentyfive");
const countdown = document.getElementById("countdown");
const countfifty = document.getElementById("fifty"); 
const reset = document.getElementById("reset");

let countTime; 
//events
counttf.addEventListener("click",()=>{
  timer(1500)
})
countfifty.addEventListener("click",()=>{
  timer(3000)
})
reset.addEventListener("click",()=>{
  timer(0)
})



//functions
function timer(seconds){
  //clear any existing timers
  clearInterval(countTime)

  const now = Date.now();
  const then = now + seconds * 1000
  displayTimeLeft(seconds);

  countTime = setInterval(()=>{
    const secondsLeft = Math.round((then - Date.now())/ 1000)
    //stop statement
    if(secondsLeft <= 0){
      clearInterval(countTime)
      return;
    }
    displayTimeLeft(secondsLeft)
  },1000)
}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60
  console.log({minutes, remainderSeconds})
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  document.title = display
  countdown.textContent =display
}