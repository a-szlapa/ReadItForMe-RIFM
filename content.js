chrome.runtime.onMessage.addListener((message) => {

    if (message.action === "readText") {

        const text = message.text;

        if (!text) return;

        // stop previous speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        // IMPORTANT: wait for voices (fixes silent bug)
        let voices = window.speechSynthesis.getVoices();

        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.speak(utterance);
            };
        } else {
            window.speechSynthesis.speak(utterance);
        }
    }

    if (message.action === "stopReading") {

        const text = message.text;

        if (!text) return;

        // stop previous speech
        window.speechSynthesis.cancel();
    }


});