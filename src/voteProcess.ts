import { io } from 'socket.io-client'
const socket = io('http://localhost:1001')

export function voteProcess(): void{
    socket.on('connect', () => {
        console.log(socket.id)
    })
}
