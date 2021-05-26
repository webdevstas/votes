"use strict";
const tBody = document.getElementById('answers__tbody');
const addAnswerBtn = document.getElementById('add-answer');
let answerRows;
let answerRowEl;
// Initialise answerRows and answerRowEl variables
init();
// Add listener and handler for addAnswerBtn, calls in next eventLoop iteration
setTimeout(() => {
    addAnswerBtn.addEventListener('click', (event) => {
        event.preventDefault();
        // Set title for additional inputs
        answerRowEl.firstChild.textContent = 'Additional answer';
        // Clear copied input
        const input = findInput(answerRowEl.childNodes);
        input.value = '';
        // Add the new answer row
        tBody.appendChild(answerRowEl);
        // Add the deleteBtn
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = '-';
        deleteBtn.addEventListener('click', function (event) {
            event.preventDefault();
            this.parentNode.parentNode.removeChild(this.parentNode);
        });
        answerRowEl.appendChild(deleteBtn);
        // Reinitialise variables
        init();
    });
}, 0);
function init() {
    answerRows = document.getElementsByClassName('answers__trow');
    answerRowEl = answerRows[0].cloneNode(true);
}
function findInput(nodes) {
    let input;
    Array.from(nodes).forEach((node) => {
        if (node.nodeName === 'INPUT') {
            input = node;
        }
        else if (node.hasChildNodes()) {
            input = findInput(node.childNodes);
        }
        else
            input = null;
    });
    return input;
}
