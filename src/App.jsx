import { useState } from "react";
import handler from "./utils/api";
import ReactMarkdown from "react-markdown";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = () => {
    if (!text.trim()) {
      setSummary("Please provide some text to summarize.");
      return;
    }
    // Reset summary and loading state
    setLoading(true);
    setSummary("");
    handler(text)
      .then((result) => {
        setSummary(result);
      })
      .catch((error) => {
        console.error("Error summarizing text:", error);
        setSummary(
          "An error occurred while summarizing the text. Please try again."
        );
        setText("");
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
          ✨ AI Text Summarizer
        </h1>

        <textarea
          rows={10}
          cols={50}
          className="text-gray-300  w-full p-4 border rounded-lg focus:outline-none focus:ring-1"
          placeholder="Paste or type your content here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSummarize}
          disabled={loading || !text}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {summary && (
          <div className="mt-6 text-gray-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-300">
              📝 Summary
            </h2>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  strong: ({ node, ...props }) => (
                    <strong
                      className="text-yellow-600 font-semibold"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 text-gray-300" {...props} />
                  ),
                }}
              >
                {summary}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
