let textArea = document.getElementById("speech");
let speechUtterance = new SpeechSynthesisUtterance();

let playBtn = document.querySelector(".options .play");
let pauseBtn = document.querySelector(".options .pause");

playBtn.addEventListener("click", () => {
  if (speechSynthesis.paused) {
    speechSynthesis.paused = false;
    speechSynthesis.resume();
  } else {
    speechUtterance.text = textArea.value;

    speechSynthesis.speak(speechUtterance);

    textArea.disabled = true;
  }

  playBtn.classList.add("active");
  pauseBtn.classList.remove("active");
});

pauseBtn.addEventListener("click", () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();

    pauseBtn.classList.add("active");
    playBtn.classList.remove("active");
  }
});

speechUtterance.onend = () => {
  textArea.disabled = false;

  playBtn.classList.remove("active");
  pauseBtn.classList.remove("active");
};

let stopBtn = document.querySelector(".options .stop");

stopBtn.addEventListener("click", () => {
  // resuming in case the user paused then decided to end
  speechSynthesis.resume();

  setTimeout(function () {
    speechSynthesis.cancel();
  }, 0);

  textArea.disabled = false;
});

let speedInput = document.querySelector("input#speed");

speedInput.addEventListener("input", function () {
  speechUtterance.rate = this.value;
});

speedInput.addEventListener("change", function () {
  if (+this.value > 5) {
    this.value = 5;
  }
});

let voicesSelect = document.querySelector(".options .row select");
let voicesArr = [];
let isVoicesLoaded = false;

speechSynthesis.onvoiceschanged = () => {
  if (isVoicesLoaded === false) {
    speechSynthesis.getVoices().forEach((obj) => {
      if (obj.lang === "en-US") {
        let option = document.createElement("option");
        option.value = obj.name;
        option.textContent = obj.name;

        voicesArr.push(obj);

        voicesSelect.append(option);

        isVoicesLoaded = true;
      }
    });
  }
};

voicesSelect.addEventListener("input", function () {
  voicesArr.forEach((obj) => {
    if (obj.name === this.value) {
      speechUtterance.voice = obj;
    }
  });
});
