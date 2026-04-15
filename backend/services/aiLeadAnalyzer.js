const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.HF_TOKEN,
    baseURL: "https://api.groq.com/openai/v1",
});

module.exports = {
    analyzeLead: async (lead) => {
        try {
            const prompt = `
    Analyze this lead and give score from 0-100.
    
    Lead Info:
    Name: ${lead.name}
    Email: ${lead.email}
    Company: ${lead.company}
    
    Return JSON:
    {
    score: number,
    quality: "High | Medium | Low"
    }
    `;

            const response = await client.chat.completions.create({
                model: "llama-3.1-8b-instant",
                response_format: { type: "json_object" },
                messages: [
                    { role: "system", content: "You are a helpful assistant that outputs JSON." },
                    { role: "user", content: prompt }
                ],
            });

            const aiResponse = response.choices[0].message.content;

            let cleaned = aiResponse
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const result = JSON.parse(cleaned);

            return result;


        } catch (error) {

            return {
                score: Math.floor(Math.random() * 100),
                quality: "Medium",
            }
        }

    }
};     