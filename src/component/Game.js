import react, { useState,useEffect, useRef } from "react";
import "./GameStyle.css";   
import { useLocation } from 'react-router-dom';
import { findBestMove,MCTS, handle_winner, handle_winner_5x5 ,easy_AI, findBestMove_AI_hard, findBestMove_AI_medium, checkWinner, mcts, bot_extreme} from "../helpers";
import Board from "./Board";
import { Howl } from 'howler';
import createWorker from "./worker";
import socketIOClient from "socket.io-client";


const Game=()=>{
    const location = useLocation();
    const { difficulty,size,colorBG,colorCell } = location.state || { difficulty: 'easy',size:9,colorBG:'black',colorCell:'white'}
    const socketRef = useRef();

    const audioRef = useRef(null);
    // Lấy thông tin URL hiện tại

    const host ="http://localhost:4000"

    useEffect(() => {
        
        socketRef.current = socketIOClient.connect(host)

        return () => {
          socketRef.current.disconnect();
        };
      }, []);

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


    

  

    // if (difficulty==='easy'){
    //     var level_size=25
    // } else if (difficulty==='medium') {
    //     var level_size=25
    // } else var level_size=16
    const [board,setBoard]=useState(Array(size).fill(null))
    const [mark,setMark]=useState(true)
    const winner=handle_winner_5x5(board)
    const [count,setCount]=useState(0)

    
    
    


    function turning(status){
        if (status===false)
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
    
    

    function level_options(index){
        if (difficulty==='easy'){
            handle_mark_AI_easy(index)
        }
        else if (difficulty==='medium'){
            handle_mark_AI_Medium(index)
        }
        else if (difficulty==='hard'){
            handle_mark_AI_Hard(index)
        } else {
            handle_mark_AI_extreme(index)
        }
    }   

    useEffect(()=>{

        if (winner) return
        if (!mark){
            const boardCopy=[...board]
        if (difficulty==='easy'){
            const data={
                newboard:boardCopy,
                player:'O',
                iterations:200
            }
            setTimeout(() => {
                socketRef.current.emit("AImove",data)
                socketRef.current.on("Sendbestmove",function(bestmove){
                boardCopy[bestmove]='O'
                setBoard(boardCopy)
                setMark(!mark)
                turning(mark)
                marked(bestmove)
            })
            }, 500);
            
        } else if (difficulty==='medium'){
            const data={
                newboard:boardCopy,
                player:'O',
                iterations:1000
            }
            setTimeout(function(){
                socketRef.current.emit("AImove",data)
                socketRef.current.on("Sendbestmove",function(bestmove){
                boardCopy[bestmove]='O'
                setBoard(boardCopy)
                setMark(!mark)
                turning(mark)
                marked(bestmove)
            })
            },500)
            
            
        } else if (difficulty==='hard') {
                const data={
                newboard:boardCopy,
                player:'O',
                iterations:10000
            }
            socketRef.current.emit("AImove",data)
            socketRef.current.on("Sendbestmove",function(bestmove){
                boardCopy[bestmove]='O'
                setBoard(boardCopy)
                setMark(!mark)
                turning(mark)
                marked(bestmove)
            })
        } else {
            setTimeout(()=>{
                const bestmove=bot_extreme(boardCopy)
                boardCopy[bestmove]='O'
                setBoard(boardCopy)
                setMark(!mark)
                turning(mark)
                marked(bestmove)
            },500)
            
        }
    } 
        
    },[mark,board])

    const handle_mark_AI_Hard=(index)=>{
        const boardCopy=[...board]
        if (winner || boardCopy[index]) return
        boardCopy[index]='X'
        setBoard(boardCopy)
        const sound = new Audio(require('.././assest/sweep.mp3'))
        sound.play()
        setMark(!mark)
        turning(mark)
        marked(index)
        

    }

    

    const handle_mark_AI_Medium=(index)=>{
        const boardCopy=[...board]
        if (winner || boardCopy[index]) return
        boardCopy[index]='X'
        // const AI_move=findBestMove_AI_medium(boardCopy)
        // boardCopy[AI_move]='O'
        setBoard(boardCopy)
        const sound = new Audio(require('.././assest/sweep.mp3'))
        sound.play()
        setMark(!mark)
        turning(mark)
        // if(boardCopy.every(cell => cell !== null)){
        //     setCount(board.length)
        // }
        marked(index)
        

    }

    
    
    const handle_mark_AI_easy=(index)=>{
        const boardCopy=[...board]
        if (winner || boardCopy[index]) return
        boardCopy[index]='X'
        // const AI_move=easy_AI(boardCopy)
        // boardCopy[AI_move]='O'
        setBoard(boardCopy)
        const sound = new Audio(require('.././assest/sweep.mp3'))
        sound.play()
        
        setMark(!mark)
        turning(mark)
        
        
        
        
        // if(boardCopy.every(cell => cell !== null)){
        //     setCount(board.length)
        // }
        marked(index)
    }

    const handle_mark_AI_extreme=(index)=>{
        const boardCopy=[...board]
        if (winner || boardCopy[index]) return
        boardCopy[index]='X'
       
        setBoard(boardCopy)
        const sound = new Audio(require('.././assest/sweep.mp3'))
        sound.play()
        
        setMark(!mark)
        turning(mark)
        
        
        
        
        
        marked(index)
    }

    function reset(){
        setBoard(Array(size).fill(null))
        setCount(0)
        un_mark()
        setMark(true)
        turning(false)
        
    }

    function sound_lose(){
        
        const sound = new Audio(require('.././assest/lose.wav'))
        sound.play()
    }

    function sound_win(){
        const sound = new Audio(require('.././assest/win.wav'))
        sound.play()
    }
    
    

    return (
       
        <div style={{backgroundColor:colorBG}} class="container_game">
            <h1 style={{color:'#9d4edd',position:'absolute',top:'0',fontFamily:'buble-pixel'}}>level: {difficulty}</h1>
            
        
            <div class="turningX">X</div>
            <Board Cell={board} onClick={level_options} bg={colorBG} ce={colorCell}></Board>
            <div class="turningO turn_non">O</div>
            {difficulty==='hard'&& winner ? <div class="container_result"><div class="result">
                {winner==='O'?sound_lose():sound_win()}
                {winner==='X' ? <h3>you <br></br> win</h3>:<h3>you <br></br> lose</h3>}
                <button className="bt_re" onClick={reset}>reset</button>
                {winner==='X'?<div class="pyro">
                    <div class="before"></div>
                    <div class="after"></div>
                </div>:''}
            </div></div>:""}
            {difficulty==='easy'&& winner ? <div class="container_result"><div class="result">
                {winner==='O'?sound_lose():sound_win()}
                {winner==='X' ? <h3>you <br></br> win</h3>:<h3>you <br></br> lose</h3>}
                
                <button className="bt_re" onClick={reset}>reset</button>
                {winner==='X'?<div class="pyro">
                    <div class="before"></div>
                    <div class="after"></div>
                </div>:''}
            </div></div>:""}
            {difficulty==='medium'&& winner ? <div class="container_result"><div class="result">
                {winner==='O'?sound_lose():sound_win()}
                {winner==='X' ? <h3>you <br></br> win</h3>:<h3>you <br></br> lose</h3>}
                
                <button className="bt_re" onClick={reset}>reset</button>
                {winner==='X'?<div class="pyro">
                    <div class="before"></div>
                    <div class="after"></div>
                </div>:''}
            </div></div>:""}
            {difficulty==='extreme'&& winner ? <div class="container_result"><div class="result">
                {winner==='O'?sound_lose():sound_win()}
                {winner==='X' ? <h3>you <br></br> win</h3>:<h3>you <br></br> lose</h3>}
                
                <button className="bt_re" onClick={reset}>reset</button>
                {winner==='X'?<div class="pyro">
                    <div class="before"></div>
                    <div class="after"></div>
                </div>:''}
            </div></div>:""}
            {!winner && board.every(cell => cell !=null) ? <div class="container_result"><div class="result">
                {!winner && board.every(cell => cell !=null) && sound_win()}
                <h3>X/O</h3>
                
                <button className="bt_re" onClick={reset}>reset</button>
            </div></div>:""}
        </div>
    )
}
export default Game;


