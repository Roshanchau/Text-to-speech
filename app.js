const btn = document.querySelector(".btn");
const textArea = document.querySelector("#text");
const voiceSelect = document.querySelector("#voice");

let synth = speechSynthesis,
    isSpeaking = true;

voices();

//generate voice to the voicesSelect options
function voices() {
    //iterate through each voices as voice
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceSelect.insertAdjacentHTML("beforeend", option);
    }
}

//is voice is changed then again call the voices function to insert another option
synth.addEventListener("voiceschanged", voices);


//convert text to speech using utterance
function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceSelect.value) {
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}


btn.addEventListener("click", e => {
    e.preventDefault();
    if (textArea.value !== "") {
        // Checks if not speaking, Speak textArea Text
        if (!synth.speaking) {
            textToSpeech(textArea.value);   
        }
        // If text was long, Add Resume and Pause Function and reduce it's speed to 0.5s
        if (textArea.value.length > 80) {
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    btn.innerText = "Convert To Speech";
                } else { }
            }, 500);
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                btn.innerText = "Pause Speech";
            } else {
                synth.pause();
                isSpeaking = true;
                btn.innerText = "Resume Speech";
            }
        } else {
            btn.innerText = "Convert To Speech";
        }   
    }
});