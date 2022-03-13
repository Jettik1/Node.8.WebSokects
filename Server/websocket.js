const ws = require('ws');
const PORT = 5000

const wss = new ws.Server({
    port: PORT,
}, () => console.log(`Server started on ${PORT} port`))

wss.on('connection', function connection(ws) {
    ws.on('message', function(message) {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
    //ws.send(`User Jettik1 successfuly connected`)
})


function broadcastMessage(message, id) {
    wss.clients.forEach((client => {
        client.send(JSON.stringify(message))
    }))
}
