import {useState, useEffect} from 'react'
import {Modal} from 'bootstrap'

export default function Chaser() {
    const [soc, setSoc] = useState(new WebSocket("ws://162.19.154.182:8080"))
    const [loc, setLoc] = useState("")
    const [usr, setUsr] = useState("TELL ME TO SET MY NAME")

    function login() {
        const socket = new WebSocket("ws://162.19.154.182:8080")
        setSoc(socket)
        socket.addEventListener("open", event => {
            socket.send(JSON.stringify({op: 0, name: usr, runner: false}))
        });

        socket.addEventListener("message", event => {
            const data = JSON.parse(event.data)
            if (data.op === 2) {
                (new Modal('#locModal')).show()
            }
        });
    }



    return (
        <div>
            <h1>Chaser panel</h1>

            <label htmlFor="exampleFormControlInput2" className="form-label">Username</label>
            <input className="form-control" onChange={e => setUsr(e.target.value)} id="exampleFormControlInput2" placeholder="develop331" />
            <button className="mt-3 btn btn-primary" onClick={login}>Login</button>

            <div className="modal" id="locModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Location</h5>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Location in SCR</label>
                                <input className="form-control" onChange={e => setLoc(e.target.value)} id="exampleFormControlInput1" placeholder="Benton" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={() => soc.send(JSON.stringify({op:3, name:usr, loc:loc}))}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}