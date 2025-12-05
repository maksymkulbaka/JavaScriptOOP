// Part 7
const socket = new WebSocket("ws://localhost:3000");

const priceEl = document.getElementById("price") as HTMLElement;
const balanceEl = document.getElementById("balance") as HTMLElement;
const cryptoEl = document.getElementById("crypto") as HTMLElement;

interface InitMessage {
    readonly type: "init";
    readonly price: number;
    readonly balance: number;
    readonly crypto: number;
}

interface PriceMessage {
    readonly type: "price";
    readonly price: number;
}

interface UpdateMessage {
    readonly type: "update";
    readonly price: number;
    readonly balance: number;
    readonly crypto: number;
}

type ServerMessage = InitMessage | PriceMessage | UpdateMessage;

function isInitMessage(msg: ServerMessage): msg is InitMessage {
    return msg.type === "init";
}

function isPriceMessage(msg: ServerMessage): msg is PriceMessage {
    return msg.type === "price";
}

function isUpdateMessage(msg: ServerMessage): msg is UpdateMessage {
    return msg.type === "update";
}

socket.onmessage = evt => {
    const data: ServerMessage = JSON.parse(evt.data);

    if (isInitMessage(data)) {
        priceEl.textContent = String(data.price);
        balanceEl.textContent = String(data.balance);
        cryptoEl.textContent = String(data.crypto);
        return;
    }

    if (isPriceMessage(data)) {
        priceEl.textContent = String(data.price);
        return;
    }

    if (isUpdateMessage(data)) {
        priceEl.textContent = String(data.price);
        balanceEl.textContent = String(data.balance);
        cryptoEl.textContent = String(data.crypto);
    }
};

interface ClientBuy {
    readonly type: "buy";
    readonly amount: number;
}

interface ClientSell {
    readonly type: "sell";
    readonly amount: number;
}

type ClientMessage = ClientBuy | ClientSell;

function sendMessage(msg: ClientMessage): void {
    socket.send(JSON.stringify(msg));
}

(document.getElementById("buyButton") as HTMLButtonElement).onclick = () => {
    sendMessage({ type: "buy", amount: 1 });
};

(document.getElementById("sellButton") as HTMLButtonElement).onclick = () => {
    sendMessage({ type: "sell", amount: 1 });
};