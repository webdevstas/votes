import { io } from 'socket.io-client'
const socket = io('http://localhost:1001')
import {SimpleNode} from '../lib/classes/Answer'

const answerTable = document.getElementById('answer-table')
const answerForm = document.getElementById('answer-form')

export function voteProcess(): void{
    socket.on('render', (node) => {
        render(answerTable, node)
    })

    answerForm.addEventListener('submit', (event) => {
        event.preventDefault()
        socket.emit('answer', {
            name: answerForm.querySelector<HTMLInputElement>('[name="username"]').value,
            choose: answerForm.querySelector<HTMLInputElement>('[name="answer"]').value, //TODO: Разобраться
            url: answerForm.querySelector<HTMLInputElement>('[name="url"]').value
        })
    })
}


function render(parent: Node, node: SimpleNode): void {
    const answerRow = document.createElement(node.tag)
    node.childNodes.forEach((childNode) => {
        const answerCell = document.createElement(childNode.tag)
        answerCell.innerText = childNode.content
        answerRow.appendChild(answerCell)
    })
    parent.appendChild(answerRow)
}
