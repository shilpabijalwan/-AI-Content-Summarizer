import axios from "axios";

// pages/api/summarize.js
export default async function handler(text) {
  console.log(text,"text from api.js");
  if (!text || text.trim() === "") {
    return "Please provide some text to summarize.";
  }
  
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Summarize this content in bullet points:\n\n${text}`,
              },
            ],
          },
        ],
      }
    );

    const data = response.data;
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {

      return "No summary available. Please try again.";
    }

    return content;
  } catch (error) {
    return "An error occurred while summarizing the text. Please try again.";
  }

}
