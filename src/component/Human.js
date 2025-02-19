import react, { useState,useEffect,useRef } from "react";
import "./GameStyle.css";   
import { useLocation } from 'react-router-dom';
import { findBestMove, handle_winner, handle_winner_5x5 ,easy_AI} from "../helpers";
import Board from "./Board";
import io from 'socket.io-client';
import socketIOClient from "socket.io-client";


const Human=()=>{
    const location = useLocation();
    const { size,colorBG,colorCell,id,Sympol } = location.state || { size: 25,colorbg:'black',colorc:'white' }
    const [board,setBoard]=useState(Array(size).fill(null))
    const [mark,setMark]=useState(true)
    const winner=handle_winner_5x5(board)
    const [count,setCount]=useState(0)
    const [player,setPlayer]=useState([])
    
    console.log(colorBG)
    console.log(colorCell)
    console.log(Sympol)
    
    
    const audioRef = useRef(null);
    const socketRef = useRef();
    // Lấy thông tin URL hiện tại

    const host ="https://tictactoeai-production.up.railway.app/"

    

    useEffect(() => {
        const audio = audioRef.current;

        // Mỗi lần URL thay đổi, phát âm thanh
        if (audio) {
        audio.play().catch((error) => {
            console.error("Lỗi khi phát âm thanh:", error);
        });
        }

        return () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Đặt lại âm thanh về đầu nếu cần khi chuyển trang
        }
        };
    }, [location])

    useEffect(() => {
        
        socketRef.current = socketIOClient.connect(host)
        
        socketRef.current.on('getId',id=>{
            setPlayer(id)
        })

        
    
        socketRef.current.on('sendDataServer',dataGot=>{
            setBoard(dataGot.board)
            setMark(dataGot.turn)
            console.log(dataGot.board)
        })
    
        return () => {
          socketRef.current.disconnect();
        };
      }, []);

    useEffect(()=>{
        turning(!mark)
    },[mark])
    
    // console.log(count)
    // console.log(winner)

    function turning(status){
        if (!status)
        {
            
            document.querySelector('.turningO').classList.add('turn_non')
            if (document.querySelector('.turningX.turn_non')){
                document.querySelector('.turningX').classList.remove('turn_non')
            }
            
        }
        else {
            document.querySelector('.turningX').classList.add('turn_non')
            document.querySelector('.turningO').classList.remove('turn_non')
        }
    }

    function marked(index){
        var elementCells=document.querySelectorAll('.game-cell')
        elementCells.forEach(function(e,i){
            if (i==index){
                
                e.classList.add('mark')
            }
        })
    }

    function un_mark(){
        var elementCells=document.querySelectorAll('.game-cell')
        elementCells.forEach(function(e,i){
            e.classList.remove('mark')
        })
    }
    
    const handle_mark_human=(index)=>{
        const boardCopy=[...board]
        
        if (winner || boardCopy[index] || Sympol!=mark) return
        boardCopy[index]=mark ? 'X':'O'
        
        

        socketRef.current.emit("sendDataClient", {
            board: boardCopy,
            turn:!mark
          });

        
        setCount(count+1)
        marked(index)
        const sound = new Audio(require('.././assest/sweep.mp3'))
        sound.play()

        
    }

    function sound_win(){
        const sound = new Audio(require('.././assest/win.wav'))
        sound.play()
    }

    function reset(){
        setBoard(Array(size).fill(null))
        setCount(0)
        un_mark()
        
    }

    function un_display_note(){
        const main=document.querySelector('.container_game')
        const child=document.querySelector('.note-symbol')
        main.removeChild(child)
    }
    return (
        <div style={{backgroundColor:colorBG}} class="container_game">
           <div class='note-symbol'>
                <div class='note-symbol--container'>
                    <h1>role</h1>
                    <p>{Sympol ? 'X':'O'}</p>
                    <button style={{color:'black'}} onClick={un_display_note} class='close'>x</button>
                </div>
            </div>
            {id && <h1 class='id_room'>id: {id}</h1>}
            <p style={{position:'absolute',color:'white',fontFamily:'buble-pixel',top:'50px'}}>you is {Sympol ? 'X' : 'O'}</p>
            
            <div class="turningX">X</div>
            <Board Cell={board} onClick={handle_mark_human} ce={colorCell}></Board>
            <div class="turningO turn_non">O</div>
            {winner ? <div class="container_result"><div class="result">
            {winner==='X' && Sympol && sound_win()}
            {winner==='O' && Sympol && sound_win()}
                {winner === 'X' && Sympol && <h3>you <br></br> win</h3>}
                {winner ==='X' && !Sympol && <h3>you <br></br> lose</h3>}
                {winner === 'O' && Sympol && <h3>you <br></br> lose</h3>}
                {winner ==='O' && !Sympol && <h3>you <br></br> win</h3>}
                <button className="bt_re" onClick={reset}>reset</button>
                {winner ===  (Sympol ? 'X':'O') && <div class="pyro">
                    <div class="before"></div>
                    <div class="after"></div>
                </div>}
            </div></div>:""}
            {!winner && board.every(cell => cell !=null) ? <div class="container_result"><div class="result">
            {!winner && board.every(cell => cell !=null) && sound_win()}
                <h3>X/O</h3>
                
                <button className="bt_re" onClick={reset}>reset</button>
            </div></div>:""}
        </div>
        
    )
}
export default Human;