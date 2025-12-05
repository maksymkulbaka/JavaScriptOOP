const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const port = 3000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname + "/public"));

function broadcast(data) {
    for (const client of wss.clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    }
}

let price = 100;

wss.on("connection", ws => {
    ws.balance = 1000;
    ws.crypto = 0;

    ws.send(JSON.stringify({
        type: "init",
        balance: ws.balance,
        crypto: ws.crypto,
        price: price
    }));

    ws.on("message", msg => {
        const data = JSON.parse(msg);
        const amount = Number(data.amount || 1);

        if (data.type === "buy") {
            const total = price * amount;

            if (ws.balance >= total) {
                ws.balance -= total;
                ws.crypto += amount;
            }
        }
        if (data.type === "sell") {
            if (ws.crypto >= amount) {
                ws.crypto -= amount;
                ws.balance += price * amount;
            }
        }

        ws.send(JSON.stringify({
            type: "update",
            balance: ws.balance,
            crypto: ws.crypto,
            price: price
        }));
    });
});

setInterval(() => {
    const change = Math.floor(Math.random() * 11) - 5;
    price += change;
    if (price < 1) price = 1;
    broadcast({ type: "price", price: price });
}, 3000);


server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
