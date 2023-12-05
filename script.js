function setValues() {
  var sec = document.querySelector(".secInput input").value;
  var min = document.querySelector(".minInput input").value;
  var hr = document.querySelector(".hourInput input").value;

  function secondCounter() {
    //set Seconds
    let secContent = document.querySelector(".sec");
    secContent.innerHTML = sec;

    //set Minutes
    let minContent = document.querySelector(".min");
    minContent.innerHTML = min;

    //set Hours

    let hrContent = document.querySelector(".hour");
    hrContent.innerHTML = hr;
    if (sec > 0) {
      --sec;
    } else if (min > 0) {
      sec = 59;

      --min;
    } else if (hr > 0) {
      min = 59;

      --hr;
    }
    if (hr == 0 && min == 0) {
      document.querySelector(".container").style.color = "red";
    }
  }

  second = setInterval(secondCounter, 1000);

  return second;
}

function reLoad() {
  clearInterval(setValues().second);
  this.location.reload();
}
