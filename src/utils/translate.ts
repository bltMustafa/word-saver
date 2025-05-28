export function translateWord(word: string): Promise<string> {
    const url = `https://translate.google.com/translate_a/single?client=gtx&sl=en&tl=tr&dt=t&q=${encodeURIComponent(word)}`;
    return fetch(url)
        .then(res => res.json())
        .then(data => data[0][0][0])
        .catch(error => {
            console.error('Translation error:', error);
            return word; // Return original word if translation fails
        });
} 