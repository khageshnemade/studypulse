import { io } from "socket.io-client";
const URL = "wss://api.studypulse.live";
export const socket = io(URL);
