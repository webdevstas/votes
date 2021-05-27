"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteProcess = void 0;
const socket_io_client_1 = require("socket.io-client");
const socket = socket_io_client_1.io('http://localhost:1001');
function voteProcess() {
    socket.on('connect', () => {
        console.log(socket.id);
    });
}
exports.voteProcess = voteProcess;
