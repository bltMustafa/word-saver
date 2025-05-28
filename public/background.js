chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Word Saver Extension yüklendi");
  chrome.contextMenus.create({
    id: "saveWord",
    title: "Save this word",
    contexts: ["selection"]
  });
});

// Translation function
function translateWord(word) {
  const url = `https://translate.google.com/translate_a/single?client=gtx&sl=en&tl=tr&dt=t&q=${encodeURIComponent(word)}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => data[0][0][0])
    .catch(error => {
      console.error('Translation error:', error);
      return word; // Return original word if translation fails
    });
}

chrome.contextMenus.onClicked.addListener(async (info) => {
  console.log("Context menu clicked:", info); // Debug için
  if (info.menuItemId === "saveWord" && info.selectionText) {
    console.log('Word Picked:', info.selectionText);
    const word = info.selectionText.trim();
    
    try {
      // Translate the word
      const translation = await translateWord(word);
      console.log('Translation:', translation);
      
      // Create word object with original and translation
      const wordObj = {
        original: word,
        translation: translation,
        timestamp: Date.now()
      };
      
      chrome.storage.local.get({ words: [] }, (result) => {
        // Check if word already exists (by original text)
        const existingIndex = result.words.findIndex(w => w.original === word);
        let updated;
        
        if (existingIndex >= 0) {
          // Update existing word
          updated = [...result.words];
          updated[existingIndex] = wordObj;
        } else {
          // Add new word
          updated = [...result.words, wordObj];
        }
        
        chrome.storage.local.set({ words: updated }, () => {
          console.log('Word saved with translation:', wordObj);
        });
      });
    } catch (error) {
      console.error('Error saving word:', error);
      // Fallback: save without translation
      const wordObj = {
        original: word,
        translation: word,
        timestamp: Date.now()
      };
      
      chrome.storage.local.get({ words: [] }, (result) => {
        const updated = [...result.words, wordObj];
        chrome.storage.local.set({ words: updated }, () => {
          console.log('Word saved without translation:', wordObj);
        });
      });
    }
  }
});