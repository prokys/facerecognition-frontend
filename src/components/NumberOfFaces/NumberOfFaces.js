import "./NumberOfFaces.css"
import React from "react";

const NumberOfFaces = ({ faces }) => {
        
    if(faces > 0){
        return(
            <div id="faces">
                <div className="white f3">
                    {'Number of faces on picture is: ' + faces}
                </div>
            </div>
        )        
    }
        
    }  

export default NumberOfFaces;