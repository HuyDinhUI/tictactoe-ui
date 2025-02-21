import { createElement, useEffect, useState,useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import './ModeStyle.css'
import socketIOClient from "socket.io-client";
import Board from './Board';

const ModePage=()=>{

    const [mode_bot,setMode_bot]=useState(false)
    const [mode_human,setMode_huamn]=useState(false)
    const [mode_chal,setMode_chal]=useState(false)
    const [difficulty,setDifficulty]=useState('easy')
    const [size,setSize]=useState(null)
    const [time,setTime]=useState(null)
    const navigate = useNavigate()
    const [colorBG,setColorBG]=useState(null)
    const [colorCell,setColorCell]=useState(null)
    const [id,setId]=useState(null)
    const [note,setNote]=useState(true)
    const logo2=require('../assest/game (1).png')
    const board=['X','O',null,
                null,'X','O',
                'O',null,'X']
    

    const socketRef = useRef();
    // Lấy thông tin URL hiện tại

    const host ="http://localhost:4000"

    useEffect(() => {
        
        socketRef.current = socketIOClient.connect(host)

        socketRef.current.on('sendDataRoom',dataGot=>{

            setId(dataGot.id)
            setSize(dataGot.size)
            setColorBG(dataGot.colorBG)
            setColorCell(dataGot.colorCell)
            
        })
        
    
        return () => {
          socketRef.current.disconnect();
        };
      }, []);

    function display_bot(){
        setMode_bot(!mode_bot)
    }
      function display_human(){
        setMode_huamn(!mode_human)
    }
    
      function display_chal(){
        setMode_chal(!mode_chal)
    }

    function selected_level(level){
        setDifficulty(level)
        if (level==='easy'){
            document.querySelector('.easy').classList.remove('unselect')
            document.querySelector('.medium').classList.add('unselect')
            document.querySelector('.hard').classList.add('unselect')
            document.querySelector('.extreme').classList.add('unselect')
            // const sizeElement=document.querySelectorAll('.size')
            // sizeElement.forEach(element => {
            //     element.classList.add('available')
            // });
        } else if (level==='medium'){
            document.querySelector('.medium').classList.remove('unselect')
            document.querySelector('.easy').classList.add('unselect')
            document.querySelector('.hard').classList.add('unselect')
            document.querySelector('.extreme').classList.add('unselect')
            // const sizeElement=document.querySelectorAll('.size')
            // sizeElement.forEach(element => {
            //     element.classList.add('available')
            // });
        } else if(level==='hard'){
            document.querySelector('.hard').classList.remove('unselect')
            document.querySelector('.easy').classList.add('unselect')
            document.querySelector('.medium').classList.add('unselect')
            document.querySelector('.extreme').classList.add('unselect')
            // const sizeElement=document.querySelectorAll('.size')
            // sizeElement.forEach(element => {
            //     element.classList.add('available')
            // });
        } else{
            document.querySelector('.extreme').classList.remove('unselect')
            document.querySelector('.hard').classList.add('unselect')
            document.querySelector('.easy').classList.add('unselect')
            document.querySelector('.medium').classList.add('unselect')
        }

    }

    function selected_size(size_board){
        setSize(size_board)
        document.querySelector('.bt_start_game').classList.add('start_game')
        if (size_board===9){

            const sizeElement=document.querySelectorAll('.size')
            sizeElement[0].classList.add('available')
            sizeElement.forEach((e,i)=>{
                if (i>0){
                    e.classList.remove('available')
                    e.classList.add('unselect')
                }
            })
        } else if (size_board===16){
            const sizeElement=document.querySelectorAll('.size')
            sizeElement[1].classList.add('available')
            sizeElement.forEach((e,i)=>{
                if (i>1 || i<1){
                    e.classList.remove('available')
                    e.classList.add('unselect')
                }
            })
        } else if (size_board===25){
            const sizeElement=document.querySelectorAll('.size')
            sizeElement[2].classList.add('available')
            sizeElement.forEach((e,i)=>{
                if (i>2 || i<2){
                    e.classList.remove('available')
                    e.classList.add('unselect')
                } 
            })
        } else if (size_board===49){
            const sizeElement=document.querySelectorAll('.size')
            sizeElement[3].classList.add('available')
            sizeElement.forEach((e,i)=>{
                if (i>3 || i<3){
                    e.classList.remove('available')
                    e.classList.add('unselect')
                }
            })
        } else if (size_board===81) {
            const sizeElement=document.querySelectorAll('.size')
            sizeElement[4].classList.add('available')
            sizeElement.forEach((e,i)=>{
                if (i>4 || i<4){
                    e.classList.remove('available')
                    e.classList.add('unselect')
                }
            })
        } else{
            const sizeElement=document.querySelectorAll('.size')
            sizeElement[5].classList.add('available')
            sizeElement.forEach((e,i)=>{
                if (i>5 || i<5){
                    e.classList.remove('available')
                    e.classList.add('unselect')
                }
            })
        }
    }

    function PlayGame_Bot(){
        
        navigate(`/Game`, { state: { difficulty,size } }) 
    
    }
    function PlayGame_Human(){
        
        const code_room=document.querySelector('.code_room').value
        
        const id=code_room
        
        const Sympol=true
        
        
        if (code_room){
            socketRef.current.emit("getDataRoom",{
                id:code_room,
                size:size
                
                
            })
            navigate(`/Human?id=${code_room}`,{state:{size,id,Sympol}})
        } 
        else {
            
            navigate(`/Human`, { state: {size,Sympol } }) 
        }
    
    }

    function JoinRoom(){
        const code_room_join=document.querySelector('.code_room').value
        const Sympol=false
        if (code_room_join){
            navigate(`/Human?id=${code_room_join}`,{state:{size,id,Sympol}}) 
        }
    }

    function PlayGame_Chal(){
        const time=0.2
        
        navigate(`/Challenge`, { state: {time,size } }) 
    
    }

    function undisplay_note(){
        setNote(!note)
    }

    function display_note(){
        setNote(!note)
    }
    
    return(

            <div id='mode'>
                <div class="header">
                    <img className='logo' src={logo2}></img>
                        
                    <div class='navbar'>
                        <button class='tab_navbar' onClick={()=>navigate(`/`)}>
                                home
                        </button>
                        <button class='tab_navbar 'onClick={()=>navigate(`/About`)}>
                                about me
                        </button>
                        <button class='tab_navbar'>
                                report
                        </button>
                        </div>
                        <div class='user'>
                            <p class='user-name-short'>H</p>
                        </div>
                    </div>
                <div class='mode_container'>
            
            {/* <button onClick={display_bot} class='mode mode_playerbot'>
                <div class='background_mode'>
                    <img src={require('../assest/player.png')}></img>
                </div>
            </button>
            <button onClick={display_human} class='mode mode_playerd'>
                <div class='background_mode'>
                    <img src={require('../assest/player-versus-player.png')}></img>
                </div>
            </button>
            <button onClick={display_chal} class='mode mode_chanl'>
                <div class='background_mode'>
                    <img style={{marginTop:'10px'}} src={require('../assest/achievement.png')}></img>
                </div>
            </button> */}
            <video class='clip-intro' autoPlay loop muted >
                <source src={require('../assest/gamePlay2.mp4')}></source>
            </video>
            <div class='option_mode'>
                <h1>game </h1>
                <h1>mode</h1>
                <button onClick={display_bot} class='mode mode_playerbot'>1 player</button>
                <button onClick={display_chal} class='mode mode_chanl'>2 player</button>
                <button onClick={display_human} class='mode mode_playerd'>online</button>
            </div>
            {/* {note && <div class='note'>
            <div class='clip_intro'>
                <h1 style={{fontFamily:'buble-pixel',color:'#e9c46a'}}>note</h1>
                <video style={{display:'block',width:'500px',borderRadius:'20px'}}    autoPlay loop muted >
                    <source src={require('../assest/intro.mp4')}></source>
                </video>
                <h3 style={{fontFamily:'buble-pixel',color:'#F4A261'}}>!!!</h3>
                <p style={{width:'500px',margin:'0'}}>-Required size selection. If not selected, the Play button will not appear
                <br></br>-You must choose size and color then enter the room code
                <br></br>-Enter the room code provided by the room owner then then join
                <br></br>-If less than one minute, enter a value starting from 0.9 or less
                </p>
                <button style={{color:'black'}} onClick={undisplay_note} class='close'>x</button>
            </div>
            </div>} */}
            {mode_bot && (<div class='edit_mode'>
                <div class='container_edit--mode'>
                    <h1 style={{textAlign:'center'}}>1 player</h1>
                   

                    <div class='options_level'>
                        
                        <button onClick={()=>selected_level('easy')} class='easy difficulty'>easy</button>
                        <button onClick={()=>selected_level('medium')} class='medium difficulty unselect'>medium</button>
                        <button onClick={()=>selected_level('hard')} class='hard difficulty unselect'>hard</button>
                        <button onClick={()=>selected_level('extreme')} class='extreme difficulty unselect'>extreme</button>
                    </div>

                    <div class='size_board'>
                        
                        <button onClick={()=>selected_size(9)} class='size available'>3<br></br>x<br></br>3</button>
                        <button onClick={()=>selected_size(16)} class='size available'>4<br></br>x<br></br>4</button>
                        <button onClick={()=>selected_size(25)} class='size available'>5<br></br>x<br></br>5</button>
                        <button onClick={()=>selected_size(49)} class='size available'>7<br></br>x<br></br>7</button>
                        <button onClick={()=>selected_size(81)} class='size available'>9<br></br>x<br></br>9</button>
                        <button onClick={()=>selected_size(225)} disabled={difficulty==='hard' || difficulty==='medium' || difficulty==='easy'} class='size available'>15<br></br>x<br></br>15</button>
                        
                    </div>
                    <button onClick={PlayGame_Bot} disabled={size==null} class='bt_start_game'>start</button>
                    <button onClick={display_bot} class='close'>x</button>
                </div>
            </div>)}
            {mode_human && (<div class='edit_mode'>
                <div class='container_edit--mode'>
                    <h1 style={{textAlign:'center'}}>online</h1>
                    

                    <div class='size_board'>
                        
                        <button onClick={()=>selected_size(9)} class='size available'>3<br></br>x<br></br>3</button>
                        <button onClick={()=>selected_size(16)} class='size available'>4<br></br>x<br></br>4</button>
                        <button onClick={()=>selected_size(25)} class='size available'>5<br></br>x<br></br>5</button>
                        <button onClick={()=>selected_size(49)} class='size available'>7<br></br>x<br></br>7</button>
                        <button onClick={()=>selected_size(81)} class='size available'>9<br></br>x<br></br>9</button>
                        <button onClick={()=>selected_size(225)} class='size available'>15<br></br>x<br></br>15</button>
                    </div>

                    <div class='create_room'>
                        <input class="code_room" type='text'></input>
                        <button onClick={JoinRoom} >join</button>
                        
                    </div>
                    
                    <button onClick={PlayGame_Human} disabled={size==null} class='bt_start_game'>start</button>
                    <button onClick={display_human} class='close'>x</button>
                </div>
            </div>)}
            {mode_chal && (<div class='edit_mode'>
                <div class='container_edit--mode'>
                    <h1 style={{textAlign:'center'}}>2 player</h1>
                    

                    <div class='size_board'>
                        
                        <button onClick={()=>selected_size(9)} class='size available'>3<br></br>x<br></br>3</button>
                        <button onClick={()=>selected_size(16)} class='size available'>4<br></br>x<br></br>4</button>
                        <button onClick={()=>selected_size(25)} class='size available'>5<br></br>x<br></br>5</button>
                        <button onClick={()=>selected_size(49)} class='size available'>7<br></br>x<br></br>7</button>
                        <button onClick={()=>selected_size(81)} class='size available'>9<br></br>x<br></br>9</button>
                        <button onClick={()=>selected_size(225)} class='size available'>15<br></br>x<br></br>15</button>
                    </div>
                    
                   
                    <button onClick={PlayGame_Chal} disabled={size==null && time==null} class='bt_start_game'>start</button>
                    <button onClick={display_chal} class='close'>x</button>
                </div>
            </div>)}
        </div>
            </div>
           
        
    )
}

export default ModePage;