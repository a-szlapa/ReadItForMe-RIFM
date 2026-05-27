let isPlaying = false;
let currentUtterance = null;

chrome.runtime.onMessage.addListener((message) => {

    if (message.action === "toggleRead") {

        if (isPlaying) {
            stopReading();
        } else {
            readText(message.text);
        }

    }

    if (message.action === "stopReading") {
        stopReading();
    }

});

function readText(text) {

    if (!text) return;

    window.speechSynthesis.cancel();

    currentUtterance = new SpeechSynthesisUtterance(text);

    currentUtterance.rate = 1;
    currentUtterance.pitch = 1;
    currentUtterance.volume = 1;

    currentUtterance.onend = () => {
        isPlaying = false;
        currentUtterance = null;
    };

    let voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.speak(currentUtterance);
        };
    } else {
        window.speechSynthesis.speak(currentUtterance);
    }

    isPlaying = true;
}

function stopReading() {

    window.speechSynthesis.cancel();

    isPlaying = false;
    currentUtterance = null;
}