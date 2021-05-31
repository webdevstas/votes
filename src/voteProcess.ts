import { io } from 'socket.io-client'
import { SimpleNode } from '../lib/classes/Answer'

const socket = io('http://localhost:1001')

const answerTable = document.getElementById('answer-table')
const answerForm = document.getElementById('answer-form')

export function voteProcess(): void {
    socket.on('render', (node) => {
        render(answerTable, node)
    })

    answerForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const submitData = {
            name: answerForm.querySelector<HTMLInputElement>('[name="username"]').value,
            choose: answerForm.querySelector<HTMLInputElement>('[name="answer"]:checked').value,
            url: answerForm.querySelector<HTMLInputElement>('[name="url"]').value
        }

        if (document.cookie.includes(submitData.url)) {
            alert('You already voted!')
        } else {
            document.cookie = `${submitData.url}=voted`
            socket.emit('answer', submitData)
        }
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
