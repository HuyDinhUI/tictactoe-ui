import React from "react";
import Cell from "./Cell";

const Board = (props) => {
    return (
    <div class='board' style={{
        display:'grid',
        margin:'10px',
        
        padding:'10px',
        borderRadius:"20px",
        
        gridTemplateColumns:`repeat(${Math.sqrt(props.Cell.length)},2fr)`,
        gridTemplateRows:`repeat(${Math.sqrt(props.Cell.length)},2fr)`
    }} >
        {props.Cell.map((item,index)=>(
            <Cell 
             key={index} 
             value={item} 
             onClick={()=>props.onClick(index)}
             color_bg={props.bg}
             color_cell={props.ce}
             ></Cell>
        ))}
           
    </div>
    )
}

export default Board;