const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { prompt } = JSON.parse(event.body);

    // Fetch the API key securely from Netlify's environment variables
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`  // Use the API key securely
            },
            body: JSON.stringify({
                model: "text-davinci-003",  // You can change this to "gpt-3.5-turbo" if you prefer
                prompt: prompt,
                max_tokens: 100
            })
        });

        const data = await response.json();
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
