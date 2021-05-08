import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { SocketContext, socket } from './socketconfig';

const Room = ()=>{
    
    const [users , setusers] = useState([]);
    const {roomid}  = useParams();
    socket.on("getusers",(obj)=>{
        setusers(obj.data);
    })
    useEffect(() => {
        socket.emit("getusers", roomid);
    }, [socket, roomid])
    return (
        <div className="Room">
            <h1>{users}</h1>
            <h1>{roomid}</h1>
            <h1>thise is room</h1>
            <p>thise is room </p>
    
        </div>
    )
}
export default  Room;