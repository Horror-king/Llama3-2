const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const accessToken = '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';

app.get('/ai', async (req, res) => {
    const prompt = req.query.prompt;

    if (!prompt) {
        return res.status(400).send({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/gpt-neo-2.7B', // You can replace this with your desired model endpoint
            {
                inputs: prompt,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch response from Hugging Face API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
