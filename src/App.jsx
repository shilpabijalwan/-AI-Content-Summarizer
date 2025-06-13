import { useState } from "react";
import handler from "./utils/api";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleGeminiSummarize = () => {
    setLoading(true);
    setSummary("");
    handler(text)
      .then((result) => {
        setSummary(result);
      })
      .catch((error) => {
        console.error("Error summarizing text:", error);
        setSummary("An error occurred while summarizing the text. Please try again.");
        setText("");
        setLoading(false);
       
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className=" p-4 max-w-2xl mx-auto mt-10 w-full">
      <h1 className="text-2xl font-bold flex justify-center"> AI Content Summarizer</h1>
      <textarea
      className="border border-gray-300 p-2 mt-4 w-full"
        rows={10}
        cols={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste some text..."
      />
      <div className="mt-4 flex justify-center">
        <button onClick={() => handleGeminiSummarize()} disabled={loading} className="bg-blue-500 text-white w-4/5 px-4 py-2 mt-4 rounded hover:bg-blue-600 disabled:opacity-50 ">
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </div>

      {summary && (
        <div className="mt-4">
          <h3 className="font-bold">Summary:</h3>
          <pre>{summary}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
