    const socket = new WebSocket("ws://localhost:3000");

    const priceEl = document.getElementById("price");
    const balanceEl = document.getElementById("balance");
    const cryptoEl = document.getElementById("crypto");

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);

        if (data.type === "init") {
            priceEl.textContent = data.price;
            balanceEl.textContent = data.balance;
            cryptoEl.textContent = data.crypto;
        }

        if (data.type === "price") {
            priceEl.textContent = data.price;
        }

        if (data.type === "update") {
            priceEl.textContent = data.price;
            balanceEl.textContent = data.balance;
            cryptoEl.textContent = data.crypto;
        }
    };

    document.getElementById("buyButton").onclick = () => {
        socket.send(JSON.stringify({ type: "buy", amount: 1 }));
    };

    document.getElementById("sellButton").onclick = () => {
        socket.send(JSON.stringify({ type: "sell", amount: 1 }));
    };