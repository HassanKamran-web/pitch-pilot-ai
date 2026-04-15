const OpenAI = require('openai');
const client = new OpenAI({
    apiKey: process.env.HF_TOKEN,
    baseURL: "https://api.groq.com/openai/v1",
});

module.exports = generateEmail = async (lead) => {
    try {
        const prompt = `
Write a short personalized cold email.

Company: ${lead.company}
Website: ${lead.website}
Industry: ${lead.industry}

Make it humanzied, friendly and professional.

Return response ONLY in JSON format like this:
{
 "subject": "email subject here",
 "body": "full email body here"
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
        const airesponse = response.choices[0].message.content;

        const parse = JSON.parse(airesponse);
        return {
            success: true,
            subject: parse.subject,
            body: parse.body
        };
    } catch (error) {
        return { error: error.message, success: false };
    }
}