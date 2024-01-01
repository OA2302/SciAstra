const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;
    const botResponse = generateBotResponse(userMessage);
    res.json({ botResponse });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function generateBotResponse(userMessage) {
    // Implement more sophisticated logic based on user messages
    if (userMessage.toLowerCase().includes('services') && userMessage.toLowerCase().includes('offer')) {
        return "SciAstra offers a range of services, including educational programs, workshops, and consulting services. You can explore our website for detailed information on each service.";
    } else if (userMessage.toLowerCase().includes('educational programs')) {
        return "SciAstra provides various educational programs focused on science, technology, engineering, and mathematics (STEM). Our programs aim to inspire and educate individuals of all ages. Feel free to explore our program offerings on the website.";
    } else if (userMessage.toLowerCase().includes('get involved')) {
        return "Getting involved with SciAstra is easy! You can participate in our events, join our community, or explore volunteer opportunities. Check our website for the latest updates on upcoming events and ways to contribute.";
    } else {
        return "Thanks for your message! If you have specific questions, feel free to ask, and I'll do my best to assist you.";
    }
}
