import { useEffect, useState } from "react";

interface WordEntry {
    original: string;
    translation: string;
    timestamp: number;
}

export default function Popup() {
    const [words, setWords] = useState<WordEntry[]>([]);

    useEffect(() => {
        chrome.storage.local.get({ words: [] }, (result) => {
            const processedWords = result.words.map((word: any) => {
                if (typeof word === 'string') {
                    return {
                        original: word,
                        translation: word,
                        timestamp: Date.now()
                    };
                }
                return word;
            });
            setWords(processedWords);
        });
    }, []);

    const deleteWord = (wordToDelete: string) => {
        const updated = words.filter((w) => w.original !== wordToDelete);
        chrome.storage.local.set({ words: updated }, () => {
            setWords(updated);
        });
    };

    const clearAll = () => {
        chrome.storage.local.set({ words: [] }, () => {
            setWords([]);
        });
    };

    return (
        <div style={{
            padding: "16px",
            fontFamily: "Arial, sans-serif",
            width: "300px",
            minHeight: "200px"
        }}>
            <h2 style={{
                fontSize: "18px",
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "4px"
            }}>
                📚 Saved Words ({words.length})
            </h2>

            {words.length > 0 && (
                <button
                    onClick={clearAll}
                    style={{
                        marginBottom: "10px",
                        backgroundColor: "#e74c3c",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "13px"
                    }}
                >
                    Clear All
                </button>
            )}

            {words.length === 0 ? (
                <p style={{ color: "#777" }}>No words saved yet.</p>
            ) : (
                <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                    {words.map((word, i) => (
                        <li
                            key={i}
                            style={{
                                background: "#f8f9fa",
                                marginBottom: "8px",
                                padding: "12px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                border: "1px solid #e9ecef"
                            }}
                        >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start"
                            }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        fontWeight: "bold",
                                        color: "#2c3e50",
                                        marginBottom: "4px",
                                        wordBreak: "break-word"
                                    }}>
                                        🇺🇸 {word.original}
                                    </div>
                                    <div style={{
                                        color: "#e74c3c",
                                        fontSize: "13px",
                                        wordBreak: "break-word"
                                    }}>
                                        🇹🇷 {word.translation}
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteWord(word.original)}
                                    style={{
                                        background: "#ff4444",
                                        border: "none",
                                        color: "white",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                        marginLeft: "8px",
                                        padding: "4px 8px",
                                        borderRadius: "3px",
                                        minWidth: "20px",
                                        flexShrink: 0
                                    }}
                                    title="Delete"
                                >
                                    ×
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}