import React from 'react';
import Square from './Square.js'

class Column extends React.Component {

    render() {
        const nSquares = 30; 

        var squares = [];
        for (var i = 0; i < nSquares; i++) {
            squares.push(<Square key={i}/>);
        }
        return(
            <div className="column">
            {squares}
            </div>
        );
    }
}

export default Column