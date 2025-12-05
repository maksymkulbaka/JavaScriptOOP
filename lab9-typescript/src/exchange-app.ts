// Part 7
import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
const port = 3000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static(__dirname + "/public"));

interface UserState {
    balance: number;
    crypto: number;
}

interface InitMessage {
    readonly type: "init";
    readonly balance: number;
    readonly crypto: number;
    readonly price: number;
}

interface UpdateMessage {
    readonly type: "update";
    readonly balance: number;
    readonly crypto: number;
    readonly price: number;
}

interface PriceMessage {
    readonly type: "price";
    readonly price: number;
}

type ServerMessage = InitMessage | UpdateMessage | PriceMessage;

interface ClientBuy {
    readonly type: "buy";
    readonly amount: number;
}

interface ClientSell {
    readonly type: "sell";
    readonly amount: number;
}

type ClientMessage = ClientBuy | ClientSell;

function isBuy(msg: ClientMessage): msg is ClientBuy {
    return msg.type === "buy";
}

function isSell(msg: ClientMessage): msg is ClientSell {
    return msg.type === "sell";
}

let price = 100;

function broadcast(data: ServerMessage): void {
    for (const client of wss.clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    }
}

wss.on("connection", ws => {
    const state: UserState = {
        balance: 1000,
        crypto: 0
    };

    const initData: InitMessage = {
        type: "init",
        balance: state.balance,
        crypto: state.crypto,
        price: price
    };

    ws.send(JSON.stringify(initData));

    ws.on("message", msg => {
        const data: ClientMessage = JSON.parse(msg.toString());
        const amount = Number(data.amount);

        if (isBuy(data)) {
            const total = price * amount;
            if (state.balance >= total) {
                state.balance -= total;
                state.crypto += amount;
            }
        }

        if (isSell(data)) {
            if (state.crypto >= amount) {
                state.crypto -= amount;
                state.balance += price * amount;
            }
        }

        const updateMsg: UpdateMessage = {
            type: "update",
            balance: state.balance,
            crypto: state.crypto,
            price: price
        };

        ws.send(JSON.stringify(updateMsg));
    });
});

setInterval(() => {
    const change = Math.floor(Math.random() * 11) - 5;
    price += change;
    if (price < 1) price = 1;

    const msg: PriceMessage = {
        type: "price",
        price: price
    };

    broadcast(msg);
}, 3000);

server.listen(port);