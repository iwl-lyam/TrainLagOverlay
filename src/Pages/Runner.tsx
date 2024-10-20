import {useState, useEffect} from 'react'

export default function Runner() {
    const [locData, setLocData] = useState([])
    const [soc, setSoc] = useState(new WebSocket("ws://162.19.154.182:8080"))
    const [usr, setUsr] = useState("TELL ME TO SET MY NAME")
    const [connd, connect] = useState(false)

    const signin = () => {
        const socket = new WebSocket("ws://162.19.154.182:8080")
        setSoc(socket)
        socket.addEventListener("open", event => {
            socket.send(JSON.stringify({op: 0, name: usr, runner: true}))
        });

        socket.addEventListener("message", event => {
            const data = JSON.parse(event.data)
            if (data.op === 4) {
                console.log("rec")
                setLocData(currentArray => [{name: data.name, loc: data.loc, time: (new Date()).toLocaleTimeString()}, ...currentArray]);
            }
        });
        connect(true)
    }

    const locDatas = []
    console.log(locData)
    locData.forEach(loc => {
        locDatas.push(<p key={loc.time}>{loc.name}: {loc.loc} at {loc.time}</p>)
    })

    return (
        <div>
            <h1>Runner panel</h1>
            {!connd ? (<div><label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                    <input className="form-control" onChange={e => setUsr(e.target.value)} id="exampleFormControlInput1" placeholder="develop331" />
            <button className="mt-3 btn btn-primary" onClick={signin}>Login</button></div>) : <div></div> }
            <br />
            <h3>Locations:</h3>
            <div>{locDatas}</div>
        </div>
    )
}