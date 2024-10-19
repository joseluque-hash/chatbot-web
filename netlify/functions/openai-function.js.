const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { prompt } = JSON.parse(event.body);

    // Fetch the API key securely from Netlify's environment variables
    const apiKey = process.env.OPENAI_API_KEY;

    // Call the OpenAI API with the user prompt
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",  // Or another model like "gpt-3.5-turbo"
            prompt: prompt,
            max_tokens: 100
        })
    });

    // Parse the API response
    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify({ result: data.choices[0].text })
    };
};
