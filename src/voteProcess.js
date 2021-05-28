"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteProcess = void 0;
const socket_io_client_1 = require("socket.io-client");
const socket = socket_io_client_1.io('http://localhost:1001');
const answerTable = document.getElementById('answer-table');
const answerForm = document.getElementById('answer-form');
function voteProcess() {
    socket.on('render', (node) => {
        render(answerTable, node);
    });
    answerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        socket.emit('answer', {
            name: answerForm.querySelector('[name="username"]').value,
            choose: answerForm.querySelector('[name="answer"]').value,
            url: answerForm.querySelector('[name="url"]').value
        });
    });
}
exports.voteProcess = voteProcess;
function render(parent, node) {
    const answerRow = document.createElement(node.tag);
    node.childNodes.forEach((childNode) => {
        const answerCell = document.createElement(childNode.tag);
        answerCell.innerText = childNode.content;
        answerRow.appendChild(answerCell);
    });
    parent.appendChild(answerRow);
}
