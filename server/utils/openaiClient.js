
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const getSchedulingRecommendations = async (employeeAvailability, jobRequests, constraints) => {
    const prompt = `
        Based on the following employee availability and job requests, suggest an optimal schedule that includes breaks for shifts over 6 hours,
        respects daily and weekly hour limits, and factors in drive times between jobs.
        
        Employee Availability: ${JSON.stringify(employeeAvailability)}
        Job Requests: ${JSON.stringify(jobRequests)}
        Constraints: ${JSON.stringify(constraints)}
    `;

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 500
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Error fetching scheduling recommendations:", error);
        throw new Error("Unable to generate schedule recommendations");
    }
};

module.exports = getSchedulingRecommendations;
