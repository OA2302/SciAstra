document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const chatBox = document.getElementById('chat-box');

    // Display predefined questions when the page loads
    const predefinedQuestions = [
        "What services does SciAstra offer?",
        "Tell me about SciAstra's educational programs.",
        "How can I get involved with SciAstra?",
        "Is SciAstra a sponsor of IISER TVM?",
        "Why should I join SciAstra?",
        "What courses does SciAstra offer for IISC, IISER, NISER, ISI, CMI, CEBS, IACS?",
        // Add more questions as needed
    ];

    predefinedQuestions.forEach(question => {
        chatBox.innerHTML += `<div class="bot-message"><strong>Questions:</strong> ${question}</div>`;
    });

    // Add event listener for dynamically generated bot responses
    chatBox.addEventListener('click', (event) => {
        if (event.target.classList.contains('bot-message')) {
            const clickedQuestion = event.target.textContent.trim().replace('>SciAstra Bot:', '');
            sendUserMessage(clickedQuestion);
        }
    });

    sendButton.addEventListener('click', () => {
        sendMessage();
    });
});

async function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    var chatBox = document.getElementById("chat-box");
    var userMessage = `<div class="user-message"><strong>User:</strong> ${userInput}</div>`;
    chatBox.innerHTML += userMessage;

    // Make a request to the server to handle the user's message
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        var botResponse = `<div class="bot-message"><strong>SciAstra Bot:</strong> ${data.botResponse}</div>`;
        chatBox.innerHTML += botResponse;
    } catch (error) {
        console.error('Error:', error);
    }

    // Clear the input field
    document.getElementById("user-input").value = "";
}

// Function to send a user message as if the user clicked a predefined question
function sendUserMessage(message) {
    var chatBox = document.getElementById("chat-box");
    var userMessage = `<div class="user-message"><strong>User:</strong> ${message}</div>`;
    chatBox.innerHTML += userMessage;

    // Simulate a response from the chatbot
    setTimeout(function() {
        var botResponse = generateBotResponse(message);
        chatBox.innerHTML += `<div class="bot-message"><strong>SciAstra Bot:</strong> ${botResponse}</div>`;
        // You can add more complex logic for actual chatbot responses here
    }, 500);
}

// Function to generate bot responses based on user messages
function generateBotResponse(userMessage) {
    // Implement more sophisticated logic based on user messages
    if (userMessage.toLowerCase().includes('services') && userMessage.toLowerCase().includes('offer')) {
        return "SciAstra offers a range of services, including educational programs, workshops, and consulting services. You can explore our website for detailed information on each service.";
    } else if (userMessage.toLowerCase().includes('educational programs')) {
        return "SciAstra provides various educational programs focused on science, technology, engineering, and mathematics (STEM). Our programs aim to inspire and educate individuals of all ages. For more details, you can visit our [Materials](https://www.sciastra.com/materials) page.";
    } else if (userMessage.toLowerCase().includes('get involved')) {
        return "Getting involved with SciAstra is easy! You can participate in our events, join our community, or explore volunteer opportunities. Check our website for the latest updates on upcoming events and ways to contribute. Visit our [Teams](https://www.sciastra.com/teams) page to learn more about our team members.";
    } else if (userMessage.toLowerCase().includes('sponsor of iiser tvm')) {
        return "Yes, SciAstra is now the official sponsor of Anvesha, the Science Fest of IISER TVM. We are dedicated to supporting and collaborating with educational institutions and events.";
    } else if (userMessage.toLowerCase().includes('join sciastra')) {
        return "Join the Community! SciAstra is the biggest community of science scholars in India for IISER Aptitude test (IAT), National Entrance Screening Test (NEST), ISI, CMI, and IACS. We provide valuable resources, live classes, course materials, tests, and a supportive community for your educational journey.";
    } else if (userMessage.toLowerCase().includes('courses does sciastra offer')) {
        return "SciAstra offers the best courses for IISc, IISER, NISER, ISI, CMI, CEBS, and IACS. Explore our courses to prepare for exams like IAT, NEST, KVPY, ISI, and more. Visit our [Courses](https://www.sciastra.com/) page for detailed information.";
    } else {
        return "Thanks for your message! If you have specific questions, feel free to ask, and I'll do my best to assist you.";
    }
}

// resizing
let isResizing = false;

function startDrag(e) {
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopDrag);
}

function handleMouseMove(e) {
    if (isResizing) {
        const newHeight = Math.min(550, window.innerHeight - e.clientY);
        document.getElementById('chat-container').style.height = `${newHeight}px`;
    }
}

function stopDrag() {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopDrag);
}