console.log(`Hallo from Author \u00A9 Melke`);

let timer;

let sec = 0;
let min = 0;
let hr = 0;

document.querySelector(".secInput input").value = document.querySelector(
  ".secInput input"
).value = sec.toString().padStart(2, "0");

//function called when START button is clicked

function setValues() {
  if (!timer) {
    sec = document.querySelector(".secInput input").value;
    min = document.querySelector(".minInput input").value;
    hr = document.querySelector(".hourInput input").value;
    document.getElementById("stop").innerHTML = "stop";
    let arr = [sec, min, hr];

    if (arr[0] > 59 || arr[1] > 59 || arr[2] > 23) {
      alert("Please Enter correct values: min & sec < 60, hr < 24 ");
      return false;
    }

    //don't start timer if time is 0 (avoid annecessary sound alarm)
    if (arr.some((e) => e > 0)) {
      document.getElementById("alarm").pause();
      timer = setInterval(secondCounter, 1000);
    }
    // TRy stop alarm

    //try stop
    //restart counter every timer start is pressed
  } else if (timer) {
    sec = document.querySelector(".secInput input").value;
    min = document.querySelector(".minInput input").value;
    hr = document.querySelector(".hourInput input").value;

    document.getElementById("alarm").currentTime = 0;
  }
}

function secondCounter() {
  //set Seconds
  let secContent = document.querySelector(".sec");
  let secEdited = sec.toString().padStart(2, "0");
  secContent.innerHTML = secEdited;

  //set Minutes
  let minContent = document.querySelector(".min");
  let minEdited = min.toString().padStart(2, "0");
  minContent.innerHTML = minEdited;

  //set Hours

  let hrContent = document.querySelector(".hour");
  let hrEdited = hr.toString().padStart(2, "0");

  hrContent.innerHTML = hrEdited;
  if (sec > 0) {
    --sec;
  } else if (min > 0) {
    sec = 59;

    --min;
  } else if (hr > 0) {
    min = 59;
    sec = 59;
    --hr;
  }
  if (hr == 0 && min == 0) {
    document
      .querySelectorAll("#display")
      .forEach((e) => (e.style.color = "red"));
  } else {
    document
      .querySelectorAll("#display")
      .forEach((e) => (e.style.color = "rgb(49, 197, 19)"));
  }

  let arr = [secEdited, minEdited, hrEdited];
  if (arr.every((e) => e == 0)) {
    clearInterval(timer);
    timer = false;
    console.log(document.getElementById("alarm").currentTime);

    document.getElementById("alarm").play();
    setTimeout(() => {
      document.getElementById("alarm").pause();
      console.log(document.getElementById("alarm").currentTime);
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

function stopCount() {
  document.getElementById("alarm").currentTime = 0;
  let arrTest = [
    document.querySelector(".sec").innerHTML,
    document.querySelector(".min").innerHTML,
    document.querySelector(".hour").innerHTML,
  ];
  if (timer && arrTest.some((e) => e > 0)) {
    clearInterval(timer);
    timer = false;
    document.getElementById("stop").innerHTML = "go";
    document.getElementById("alarm").pause();

    console.log("timer stopped");
  } else if (arrTest.some((e) => e > 0)) {
    document.getElementById("stop").innerHTML = "stop";
    timer = setInterval(secondCounter, 1000);
  } else {
    clearInterval(timer);
    timer = false;

    document.getElementById("alarm").pause();
  }
}

function resetCounter() {
  document.getElementById("alarm").currentTime = 0;
  document.getElementById("alarm").pause();
  clearInterval(timer);
  timer = false;
  document.getElementById("stop").innerHTML = "stop";
  document.querySelector(".sec").innerHTML = "00";
  document.querySelector(".min").innerHTML = "00";
  document.querySelector(".hour").innerHTML = "00";
  document.querySelector(".secInput input").value = "00";
  document.querySelector(".minInput input").value = "00";
  document.querySelector(".hourInput input").value = "00";
  document
    .querySelectorAll("#display")
    .forEach((e) => (e.style.color = "rgb(49, 197, 19)"));
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

let inputControl = document.querySelectorAll("input");

inputControl.forEach((e) => e.addEventListener("input", addLeadingZero));

let buttons = document.querySelectorAll("button");

function buttonEffect(event) {
  this.style.backgroundColor = "red";
  setTimeout(() => {
    this.style.backgroundColor = "black";
  }, 100);
}
buttons.forEach((e) => e.addEventListener("click", buttonEffect));
