import { useEffect, useState } from "react";

export default function Popup() {
    const [words, setWords] = useState<string[]>([]);

    useEffect(() => {
        chrome.storage.local.get({ words: [] }, (result) => {
            console.log("Loaded words:", result.words); // Debug için
            setWords(result.words);
        });
    }, []);

    const deleteWord = (wordToDelete: string) => {
        const updated = words.filter((w) => w !== wordToDelete);
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
            width: "250px",
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
                                background: "#f0f0f0",
                                marginBottom: "6px",
                                padding: "8px 10px",
                                borderRadius: "6px",
                                fontSize: "14px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <span style={{ wordBreak: "break-word" }}>
                                {word}
                            </span>
                            <button
                                onClick={() => deleteWord(word)}
                                style={{
                                    background: "#ff4444",
                                    border: "none",
                                    color: "white",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    marginLeft: "8px",
                                    padding: "4px 8px",
                                    borderRadius: "3px",
                                    minWidth: "20px"
                                }}
                                title="Delete"
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}