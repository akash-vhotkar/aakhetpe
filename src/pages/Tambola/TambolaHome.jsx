import { useState } from 'react';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SocketContext, socket } from './socketconfig';
import Room from './Tambolaroom';
import Tambolaroom from './Tambolaroom'
import { BrowserRouter as Router, Route, Link, Switch, Redirect ,useRouteMatch, useHistory} from 'react-router-dom'


const TambolaHome = () => {
    toast.configure();
    const {path}  = useRouteMatch();
    const history = useHistory();
    const [roomid, setroomid] = useState('');
    const [message, setmessage] = useState("");
    const [roomtype, setroomtype] = useState('');
    const [roomamount , setroomamount] = useState('');
    const name= "akash";
    console.log(roomid);
    socket.on('connect', () => {
        console.log("connected to server");
    })
    socket.on("tambolajoinroom", (obj) => {
        console.log(obj);
    })
    
    socket.on("tambolacreateroom", (obj) => {
        history.push(`/tambola/${obj.data.roomid}`);

    })
    socket.on("tambolamessage", (obj) => {
        setmessage(obj.message)
        toast(obj.message)
    })
    function createroom(e) {
        e.preventDefault() 
      socket.emit("tambolacreateroom", name,roomtype, roomamount );
     
    }
    function joinroom(e) {
        e.preventDefault() 
        socket.emit("tambolajoinroom",{roomtype,name});
    }
    function playonline() {
        socket.emit("tambolaplayonline")
    }


    return (
            <div className="Tambola">
                
                <div class="container">
                    <h1 class="text-center">Online Tambola game </h1>
                    <div class="row">
                        <div className="col-md-3">
                            <form onSubmit={joinroom}>
                                <h1>join room</h1>
                                <input type="text" value={roomid} onChange={(e)=>setroomid(e.target.value)} />
                                <button type="submit" class="btn btn-primary">join room </button>
                            </form>
                        </div>
                        <div className="col-md-3" onSubmit={createroom}>
                            <form>
                                <h1>create room</h1>
                                <label htmlFor=""  class="w-100">select game type</label>
                                <select class="w-100" onChange={(e)=> setroomtype(e.target.value)}>
                                    <option value="2"> two player</option>
                                    <option value="4">four player </option>
                                    
                                </select>
                                <br/>
                                <label htmlFor="">Enter the  roomamount</label>
                                <input type="number" value={roomamount} onChange={(e)=>setroomamount(e.target.value)}/>
                                <button class="btn btn-primary" type="submit">create own room</button>   
                            </form>
                            
                        </div>
                        <div className="col-md-3">
                            <button class="btn btn-primary">play online </button>
                        </div>


                    </div>
                </div>
            </div>
    )
}
export default TambolaHome
