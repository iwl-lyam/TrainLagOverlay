import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({
    port: 8080
});

let conns = []

setInterval(() => {
    for (let con of conns) {
        if (!con.runner) {
            con.instance.send(JSON.stringify({op: 2}))
        }
    }
    console.log("fired")
}, 300000)

wss.on('connection', function connection(ws, req) {
    let d = {
        runner: false,
        name: "",
        instance: ws
    }
    ws.on('error', console.error);

    ws.on('message', function message(data) {

        data = JSON.parse(data)
        switch (data.op) {
            case 0:
                d.runner = data.runner
                d.name = data.name
                conns.push(d)
                break
            case 3:
                if (data.name !== d.name) return
                for (let con of conns) {
                    if (con.runner && !d.runner) {
                        con.instance.send(JSON.stringify({op: 4, name: d.name, loc: data.loc}))
                    }
                }
        }
    });
});
