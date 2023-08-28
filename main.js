let textArea = document.getElementById("speech");
let playBtn = document.querySelector(".options .play")
let pauseBtn = document.querySelector(".options .pause")
let stopBtn = document.querySelector(".options .stop");

let speechUtterance = new SpeechSynthesisUtterance()

playBtn.addEventListener("click", () => {
  speechUtterance.text = textArea.value;

  speechSynthesis.speak(speechUtterance);
  
  textArea.disabled = true;
})

speechUtterance.onend = () => {
  textArea.disabled = false;
}

stopBtn.addEventListener("click", () => {
  speechSynthesis.cancel();

  textArea.disabled = false;
});

// console.log(speechUtterance)
// console.log(speechSynthesis)