function cleanMarkdown(text) {
  return (
    text
      // headers ### ##
      .replace(/^\s{0,3}#{1,6}\s+/gm, " ")

      // bold **text**
      .replace(/\*\*(.*?)\*\*/g, "$1")

      // italic *text*
      .replace(/\*(.*?)\*/g, "$1")

      // inline code `code`
      .replace(/`([^`]*)`/g, "$1")

      // links [text](url) → text
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")

      // unordered lists - item
      .replace(/^\s*[-*+]\s+/gm, "")

      // ordered lists 1. item
      .replace(/^\s*\d+\.\s+/gm, "")

      // collapse multiple new lines into pauses
      .replace(/\n{2,}/g, ". ")

      // single new lines → space
      .replace(/\n/g, " ")

      // remove leftover markdown symbols
      .replace(/[_~>]/g, "")

      // acronym handling (R.E.D → R ... E ... D)
      .replace(/\b(?:[A-Za-z]\.){2,}[A-Za-z]?\b/g, (match) => {
        return match.replace(/\./g, " , ").trim();
      })

      .trim()
  );
}

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

  const cleanText = cleanMarkdown(text);

  window.speechSynthesis.cancel();

  currentUtterance = new SpeechSynthesisUtterance(cleanText);

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
