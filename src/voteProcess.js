"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = socket_io_client_1.io('http://127.0.0.1:1001');
const answerTable = document.getElementById('answer-table');
const answerForm = document.getElementById('answer-form');
socket.on('render', (node) => {
    render(answerTable, node);
});
answerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitData = {
        name: answerForm.querySelector('[name="username"]').value,
        choose: answerForm.querySelector('[name="answer"]:checked').value,
        url: answerForm.querySelector('[name="url"]').value
    };
    if (document.cookie.includes(submitData.url)) {
        alert('You already voted!');
    }
    else {
        document.cookie = `${submitData.url}=voted`;
        socket.emit('answer', submitData);
    }
});
function render(parent, node) {
    const answerRow = document.createElement(node.tag);
    node.childNodes.forEach((childNode) => {
        const answerCell = document.createElement(childNode.tag);
        answerCell.innerText = childNode.content;
        answerRow.appendChild(answerCell);
    });
    parent.appendChild(answerRow);
}
