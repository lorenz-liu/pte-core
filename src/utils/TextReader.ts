class TextReader {
    read(text: string) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }
}

export default TextReader;
