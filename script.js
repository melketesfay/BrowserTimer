console.log(`Hallo from Author \u00A9 Melke`);

let timer;

//User InputField

let secValue = document.querySelector(".secInput input");
let minValue = document.querySelector(".minInput input");
let hrValue = document.querySelector(".hourInput input");

//All Inputfields for input restriction to max 2 digits

let inputControl = document.querySelectorAll("input");

//CountDown Display numbers

let secContent = document.querySelector(".sec");
let minContent = document.querySelector(".min");
let hrContent = document.querySelector(".hour");

let allNumbers = document.querySelectorAll("#display");

//Control Buttons
let stopBtn = document.getElementById("stop");
let buttons = document.querySelectorAll("button");

//Alarm Sound

let alarmSound = document.getElementById("alarm");

// left and right arrows

let leftArrow = document.getElementById("left_arrow");

let rightArrow = document.getElementById("right_arrow");

//function called when START button is clicked

function setValues() {
  if (!timer) {
    sec = secValue.value;
    min = minValue.value;
    hr = hrValue.value;

    stopBtn.innerHTML = "stop";
    let arr = [sec, min, hr];

    if (arr[0] > 59 || arr[1] > 59 || arr[2] > 23) {
      alert("Please Enter correct values: min & sec < 60, hr < 24 ");
      return false;
    }

    //don't start timer if time is 0 (avoid annecessary sound alarm)
    if (arr.some((e) => e > 0)) {
      alarmSound.pause();
      timer = setInterval(secondCounter, 1000);
    }

    //restart counter every timer start is pressed
  } else if (timer) {
    sec = secValue.value;
    min = minValue.value;
    hr = hrValue.value;
    alarmSound.currentTime = 0;
  }
}

function secondCounter() {
  //set Seconds

  secContent.innerHTML = sec.toString().padStart(2, "0");

  //set Minutes

  minContent.innerHTML = min.toString().padStart(2, "0");

  //set Hours

  hrContent.innerHTML = hr.toString().padStart(2, "0");

  if (sec > 0) {
    sec--;
  } else if (min > 0) {
    sec = 59;

    min--;
  } else if (hr > 0) {
    min = 59;
    sec = 59;
    hr--;
  }
  if (hr == 0 && min == 0) {
    allNumbers.forEach((e) => (e.style.color = "red"));
  } else {
    allNumbers.forEach((e) => (e.style.color = "rgb(49, 197, 19)"));
  }

  let arr = [secContent.innerHTML, minContent.innerHTML, hrContent.innerHTML];
  if (arr.every((e) => e == 0)) {
    clearInterval(timer);
    timer = false;
    console.log(alarmSound.currentTime);
    document.getElementById("alarm").play();
    // alarmSound.play();
    setTimeout(() => {
      alarmSound.pause();
      console.log(alarmSound.currentTime);
      console.log(
        "timer ended!!! sound alarm turned off automatically after 15sec"
      );
    }, 15000);
  }

  console.log("Timer running");
  return arr;
}

// // function stop and play audio
// function stopAlarm() {
//   let arr = secondCounter();
//   if (arr.every((e) => e == 0)) {
//     document.getElementById("alarm").play();
//     setTimeout(() => {
//       document.getElementById("alarm").pause();
//       clearInterval(timer);
//       timer = false;
//       console.log("timer ended");
//     }, 15000);
//   }
// }

// document.addEventListener("click", stopAlarm);
// // // function stop and play audio

//function called when stop is pressed

function stopCount() {
  alarmSound.currentTime = 0;
  let arrTest = [
    secContent.innerHTML,
    minContent.innerHTML,
    hrContent.innerHTML,
  ];
  if (timer && arrTest.some((e) => e > 0)) {
    clearInterval(timer);
    timer = false;
    stopBtn.innerHTML = "go";
    alarmSound.pause();

    console.log("timer stopped");
  } else if (arrTest.some((e) => e > 0)) {
    stopBtn.innerHTML = "stop";
    timer = setInterval(secondCounter, 1000);
  } else {
    clearInterval(timer);
    timer = false;

    alarmSound.pause();
  }
}

//function called when reset is pressed

function resetCounter() {
  alarmSound.currentTime = 0;
  alarmSound.pause();
  clearInterval(timer);
  timer = false;
  stopBtn.innerHTML = "stop";
  secContent.innerHTML = "00";
  minContent.innerHTML = "00";
  hrContent.innerHTML = "00";
  secValue.value = "00";
  minValue.value = "00";
  hrValue.value = "00";
  allNumbers.forEach((e) => (e.style.color = "rgb(49, 197, 19)"));
  leftArrow.style.display = "block";
  rightArrow.style.display = "block";
}

// Keyboard Control

document.addEventListener("keypress", (event) => {
  const keyName = event.key;

  if (keyName === "Enter") {
    setValues();
  } else if (keyName === " ") {
    stopCount();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    resetCounter();
  }
});

// input fields enforce two number digits

function addLeadingZero(event) {
  // get maxlength attr
  const maxLength = parseInt(event.target.getAttribute("maxlength"));
  // check and flag if negative
  const isNegative = parseInt(event.target.value) < 0;
  // "0".repeat(maxLength) <-- create default pad with maxlength given
  // Math.abs(event.target.value) to make sure we proceed with positive value
  // append zero and slice last of attr maxlength value
  let newValue = (
    "0".repeat(maxLength) + Math.abs(event.target.value).toString()
  ).slice(-maxLength);
  // add - if flag negative is true
  if (isNegative) {
    newValue = "-" + newValue;
  }
  // change the value of input
  event.target.value = newValue;
}

inputControl.forEach((e) => e.addEventListener("input", addLeadingZero));

function buttonEffect(event) {
  this.style.backgroundColor = "red";
  setTimeout(() => {
    this.style.backgroundColor = "black";
  }, 100);
}
buttons.forEach((e) => e.addEventListener("click", buttonEffect));

//function stop arrows when user is typing

inputControl.forEach((e) => e.addEventListener("input", stopArrows));

function stopArrows() {
  leftArrow.style.display = "none";
  rightArrow.style.display = "none";
}
