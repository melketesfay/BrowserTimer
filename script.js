let timer;

let sec = 0;
let min = 0;
let hr = 0;

document.querySelector(".secInput input").value = document
  .querySelector(".secInput input")
  .value = sec.toString()
  .padStart(2, "0");

function setValues() {
  if (!timer) {
    sec = document.querySelector(".secInput input").value;
    min = document.querySelector(".minInput input").value;
    hr = document.querySelector(".hourInput input").value;
    document.getElementById("stop").innerHTML = "stop";
    let arr = [sec, min, hr];

    //don't start timer if time is 0 (avoid annecessary sound alarm)
    if (arr.some((e) => e > 0)) {
      timer = setInterval(secondCounter, 1000);
    }
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
  let end;
  if (arr.every((e) => e == 0)) {
    document.getElementById("alarm").play();
  }
  console.log("Timer running");
  return arr;
}

// function startCounter() {
//   setValues();
//   timer = setInterval(secondCounter, 1000);
// }
// second = setInterval(secondCounter, 1000);

function stopCount() {
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
  // this.location.reload();
}

function resetCounter() {
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


document.addEventListener(
  "keypress",
  (event) => {
    const keyName = event.key;

    if (keyName === "Enter") {
      setValues()
    }else if(keyName === " ")
{stopCount()}
  else if(keyName === "Escape"){
    resetCounter();
  }
}
);