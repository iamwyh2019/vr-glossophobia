window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";

// If I add recognition.start() here it asks to access the microphone

// Presentation word bank
const wordsArray = ["introduction", "conclusion", "hello"];

recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

    if (e.results[0].isFinal) {
    // Get the final results of the speech recognition

        // Split the words being said
        const partsArray = transcript.split(" ");

        // Check if words said are in the presentation word bank
        for (let i = 0; i < wordsArray.length; i++) {
            if (partsArray.includes(wordsArray[i])) {
                // If the word is in the word bank, trigger the attention event
                document.dispatchEvent(attention);
                break;
            }
        }
    }
});
