chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Word Saver Extension yüklendi");
  chrome.contextMenus.create({
    id: "saveWord",
    title: "Save this word",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  console.log("Context menu clicked:", info); // Debug için
  if (info.menuItemId === "saveWord" && info.selectionText) {
    console.log('Word Picked:', info.selectionText);
    const word = info.selectionText.trim();
    
    chrome.storage.local.get({ words: [] }, (result) => {
      const updated = [...new Set([...result.words, word])];
      chrome.storage.local.set({ words: updated }, () => {
        console.log('Word saved:', word);
      });
    });
  }
});