function setValues() {
  var sec = document.querySelector(".secInput input").value;
  var min = document.querySelector(".minInput input").value;

  function secondCounter() {
    let secContent = document.querySelector(".sec");
    secContent.innerHTML = sec;
    let minContent = document.querySelector(".min");
    minContent.innerHTML = min;
    if (sec > 0) {
      secContent.innerHTML = sec;
      --sec;
    } else if (min > 0) {
      sec = 59;

      --min;
    }
  }

  second = setInterval(secondCounter, 1000);
}

clearInterval(second);
