const express = require('express');
const port = 3000;

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

let clients = [];

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push(res);

  req.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
});

app.post('/send', (req, res) => {
  const { username, message } = req.body;
  const time = new Date().toLocaleTimeString();

  const data = JSON.stringify({ username, message, time });
  clients.forEach(client => {
    client.write(`data: ${data}\n\n`);
  });

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});