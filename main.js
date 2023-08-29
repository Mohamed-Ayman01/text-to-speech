let textArea = document.getElementById("speech");
let playBtn = document.querySelector(".options .play")
let pauseBtn = document.querySelector(".options .pause")
let stopBtn = document.querySelector(".options .stop");
let speedInput = document.querySelector("input#speed");

let speechUtterance = new SpeechSynthesisUtterance()

playBtn.addEventListener("click", () => {
  if (speechSynthesis.paused) {
    speechSynthesis.paused = false;
    speechSynthesis.resume();
  } else {
    speechUtterance.text = textArea.value;
    
    speechSynthesis.speak(speechUtterance);
    
    textArea.disabled = true;
  }
})

speechUtterance.onend = () => {
  textArea.disabled = false;
}

stopBtn.addEventListener("click", () => {
  speechSynthesis.cancel();

  textArea.disabled = false;
});

pauseBtn.addEventListener("click", () => {
  if (speechSynthesis.speaking) speechSynthesis.pause();
});

speedInput.addEventListener("change", function () {
  speechUtterance.rate = this.value;
})