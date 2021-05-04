import io from 'socket.io-client'
const TambolaHome= ()=>{
    const socket = io('http://localhost:4000');
    socket.on('connect',()=>{
        console.log("connected to server");
    })
    
    function createroom(){
        socket.emit("createroom")
    }
    function joinroom(){
        socket.emit("joinroom")
    }
    function playonline(){
       socket.emit("playonline") 
    }

    return (
        <div>
            <button onClick={joinroom}>Join Room</button>
            <button onClick={createroom}> create room </button>
            <button onClick={playonline}>play online  </button>
        </div>
    )
}
export default TambolaHome
