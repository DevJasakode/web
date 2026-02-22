import { NextApiRequest } from "next";
import { Server as NetServer } from "http";
import { WebSocketServer } from "ws";
import { Server as HTTPServer } from "http";
import { NextApiResponse } from "next";

export type NextApiResponseServerIO = NextApiResponse & {
    socket: {
        server: HTTPServer & {
            wss?: WebSocketServer;
        };
    };
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIO
) {
    if (!res.socket.server.wss) {
        const server: NetServer = res.socket.server as any;

        const wss = new WebSocketServer({ server });

        res.socket.server.wss = wss;

        wss.on("connection", (ws) => {
            console.log("Client connected");

            ws.send("Hallo");

            ws.on("message", (msg) => {
                ws.send(`Echo: ${msg}`);
            });
        });

        console.log("WebSocket server initialized");
    }

    res.end();
};