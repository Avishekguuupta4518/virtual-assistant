import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiUrl || !apiKey) {
      throw new Error("GEMINI_API_URL or GEMINI_API_KEY is missing in .env");
    }

    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type":"general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput":"<original user input>",
  "response":"<a short spoken response>"
}

Instructions:
- Determine the intent of the user.
- Remove assistant name from userInput if present.
- For Google/Youtube search, keep only the search text in userInput.
- Keep response short and voice-friendly.
- Use "${userName}" if asked who created you.
- Respond ONLY with valid JSON.

Type meanings:
      - "general": if it's a factual or informational question.aur agar koi aisa question puchta hai jiska answer tumhe pata hai usko bhi general ki category me rakho aur apne style me answer dena, bas short answer dena.
      - "google-search": if user wants to search something on Google.
      - "youtube-search": if user wants to search something on Yputube.
      - "youtube-play": if user wants to directly play a video or song.
      - "calculator-open": if user wants to open a calaulator .
      - "instagram-open": if user wants to open a instagram .
      - "facebook-open": if user wants to open a facebook .
      - "weather-show": if user wants to know weather .
      - "get-time": if user asks for current time .
      - "get-date": if user asks for today's date .
      - "get-day": if user asks what day it is .
      - "get-month": if user asks for the current month .

      Important:
      - USe "${userName}" agar koi puchhe tumhe kisne bnaya
      - only respond with the JSON object, nothing else.

      now your
User input: ${command}
`;

    const result = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey // ✅ THIS IS CRUCIAL
        }
      }
    );

    return result.data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    return null;
  }
};

export default geminiResponse;
