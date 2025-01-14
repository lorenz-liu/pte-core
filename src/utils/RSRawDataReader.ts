class RSRawDataReader {
    private sentences: string[] = [];

    constructor() {
        this.sentences = [];
    }

    async loadFile(path: string): Promise<void> {
        try {
            const response = await fetch(path);
            const text = await response.text();
            this.sentences = text.split('\n').filter(line => line.trim() !== '');
        } catch (error) {
            console.error('Error loading sentences:', error);
        }
    }

    getRandomSentence(): string {
        if (this.sentences.length === 0) {
            return 'No sentences loaded';
        }
        const randomIndex = Math.floor(Math.random() * this.sentences.length);
        return this.sentences[randomIndex];
    }
}

export default RSRawDataReader;
