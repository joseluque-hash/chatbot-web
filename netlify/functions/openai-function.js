const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { prompt } = JSON.parse(event.body);
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  // Cambiar a gpt-3.5-turbo
                messages: [{ role: "user", content: prompt }],  // Estructura de mensajes para el nuevo modelo
                max_tokens: 100
            })
        });

        const data = await response.json();

        console.log("Response from OpenAI:", data);

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error("Error calling OpenAI API:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error communicating with OpenAI" })
        };
    }
};
