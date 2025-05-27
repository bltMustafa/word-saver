# 📚 Word Saver Extension

A minimal and clean Chrome Extension to save unfamiliar English words while reading — built with **React**, **TypeScript**, **Vite**, and **Bun**.

### 🔍 Features
- ✅ Right-click on selected words to **save** them.
- 📋 See saved words in a **popup**.
- 🗑️ Remove individual words or **clear all** with one click.
- 💾 Saves data in **Chrome local storage** (no backend needed).

---

### 🚀 Tech Stack

| Tool        | Use                             |
|-------------|----------------------------------|
| React + TS  | Popup UI                        |
| Vite        | Fast bundling                   |
| Bun         | Package manager + dev server    |
| Chrome APIs | `contextMenus`, `storage`       |

---

### 🖱️ How it works

1. Select a word in any webpage.
2. Right-click → `Save this word`.
3. Open the extension popup to view saved words.
4. Use 🗑️ to delete individual items or "Clear All".

---

### 🛠️ Installation (Dev)

```bash
bun install
bun run build
bunx tsc --outDir dist


