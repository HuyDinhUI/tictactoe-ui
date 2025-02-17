import React from "react";

const Cell = (props) =>{
    return (
        <div style={{backgroundColor:props.color_cell,animationName:'zoomIn',animationDuration:'0.5s'}} class="game-cell" onClick={props.onClick} >
            {props.value}
        </div>
    )
}

export default Cell;