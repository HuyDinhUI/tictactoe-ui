import react, { useState,useEffect,useRef } from "react";
import "./GameStyle.css";   
import { useLocation } from 'react-router-dom';
import { findBestMove, handle_winner, handle_winner_5x5 ,easy_AI} from "../helpers";
import Board from "./Board";

const Challenge=()=>{
    const location = useLocation();
    const { time,size,colorBG,colorCell } = location.state || { size: 25,time:2,colorBG:'black',colorCell:'white' }
    const [board,setBoard]=useState(Array(size).fill(null))
    const [mark,setMark]=useState(true)
    const winner=handle_winner_5x5(board)
    const [count,setCount]=useState(0)
    const [timeLeft,setTimeLeft]=useState(time*60)
    console.log(count)


    useEffect(() => {
        // Nếu trò chơi đã hoàn thành, dừng đếm ngược
        if (winner) return
        if (timeLeft===0){
            setMark(!mark)
            setTimeLeft(time*60)
            turning(mark)
        }

        
    
        // Tạo bộ đếm thời gian (interval) mỗi giây
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
    
        // Xóa bỏ interval khi component unmount hoặc trò chơi hoàn thành
        return () => clearInterval(timer);
      }, [timeLeft]);

    const audioRef = useRef(null);
    // Lấy thông tin URL hiện tại

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
    
    const handle_mark_human=(index)=>{
        const boardCopy=[...board]
        if (winner || boardCopy[index]) return
        boardCopy[index]=mark ? 'X':'O'
        setBoard(boardCopy)
        setMark(!mark)
        turning(mark)
        setCount(count+1)
        setTimeLeft(time*60)
        marked(index)
        const sound = new Audio(require('../assest/sweep.mp3'))
        sound.play()

        
    }

    function sound_win(){
        const sound = new Audio(require('../assest/win.wav'))
        sound.play()
    }

    function reset(){
        setBoard(Array(size).fill(null))
        setCount(0)
        un_mark()
        setTimeLeft(time*60)
        
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return (
        <div style={{backgroundColor:colorBG}} class="container_game">
            <h1 className="timeout">{formatTime(timeLeft)}</h1>
            
            <div class="turningX">X</div>
            <Board Cell={board} onClick={handle_mark_human} ce={colorCell}></Board>
            <div class="turningO turn_non">O</div>
            {winner ? <div class="container_result"><div class="result">
            {winner && sound_win()}
                <h3>{winner}</h3>
                <button className="bt_re" onClick={reset}>reset</button>
                <div class="pyro">
                    <div class="before"></div>
                    <div class="after"></div>
                </div>
            </div></div>:""}
            {!winner && board.every(cell => cell !=null) ? <div class="container_result"><div class="result">
            {!winner && board.every(cell => cell !=null) && sound_win()}
                <h3>X/O</h3>
                <button className="bt_re" onClick={reset}>reset</button>
            </div></div>:""}
        </div>
        
    )
}
export default Challenge;