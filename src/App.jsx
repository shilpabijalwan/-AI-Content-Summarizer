import { useState } from "react";
import handler from "./utils/api";
import ReactMarkdown from "react-markdown";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) {
      setSummary("Please provide some text to summarize.");
      return;
    }
    setLoading(true);
    setSummary("");
    try {
      const result = await handler(text);
      setSummary(result);
    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummary(
        "An error occurred while summarizing the text. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-900">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg p-8 bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
          ✨ AI Text Summarizer
        </h1>

        <textarea
          rows={10}
          className="text-gray-100 w-full p-4 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Paste or type your content here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleSummarize}
          disabled={loading || !text.trim()}
          className={`mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition ${
            loading || !text.trim() ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {summary && (
          <div className="mt-6 text-gray-100">
            <h2 className="text-xl font-semibold mb-2 text-gray-200">
              📝 Summary
            </h2>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  strong: ({ node, ...props }) => (
                    <strong className="text-yellow-400 font-semibold" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 text-gray-100" {...props} />
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
