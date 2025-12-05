 const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');
    const messagesDiv = document.getElementById('messages');

    const userColors = {};

    function getRandomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    }

    const eventSource = new EventSource('http://localhost:3000/events');

    eventSource.onmessage = function(event) {
        const { username, message, time } = JSON.parse(event.data);
        if (!userColors[username]) {
        userColors[username] = getRandomColor();
        }
        const msgDiv = document.createElement('div');
        msgDiv.style.backgroundColor = userColors[username];
        msgDiv.innerText = `[${time}] ${username}: ${message}`;
        messagesDiv.appendChild(msgDiv);
    };

    function sendMessage() {
        const username = usernameInput.value;
        const message = messageInput.value;
        if (!username || !message) return;
        fetch('http://localhost:3000/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, message })
        });
        messageInput.value = '';
    }