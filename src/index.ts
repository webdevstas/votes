import { newVote } from './newVote'
import { voteProcess } from './voteProcess'

if (window.location.pathname === '/') {
    newVote()
}
else if(window.location.pathname.includes('votes')) {
    voteProcess()
}
