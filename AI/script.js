const API_KEY = "AQ.Ab8RN6KyYACPt20A5U_jgZr7nAaujYvJ7A9DUIiIBhN_w9WOCg";
async function aiReply(message) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: message
                            }
                        ]
                    }
                ]
            })
        }
    );
    const data = await response.json();

    return data.candidates[0].content.parts[0].text;
}

async function sendMessage() {

    const input = document.getElementById("userInput");
    const text = input.value.trim();

    if (!text) return;

    const chat = document.getElementById("chat-box");

    chat.innerHTML += `<div class="user">${text}</div>`;

    input.value = "";

    const reply = await aiReply(text);

    chat.innerHTML += `<div class="bot">${reply}</div>`;

    chat.scrollTop = chat.scrollHeight;
}